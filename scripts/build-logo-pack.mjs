import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const workspace = process.cwd();
const sourcePath = path.join(
    workspace,
    "assets/brand/codestudioworks-csw-selected-source.png"
);
const packRoot = path.join(workspace, "outputs/codestudioworks-logo-pack-v2");
const publicRoot = path.join(workspace, "public/brand/csw");
const svgRoot = path.join(packRoot, "svg");
const pngRoot = path.join(packRoot, "png");
const sourceRoot = path.join(packRoot, "source");

const FOREST = "#0c1f1d";
const LIME = "#d7f45d";
const WARM_WHITE = "#fffdf7";

await Promise.all([
    fs.mkdir(svgRoot, { recursive: true }),
    fs.mkdir(pngRoot, { recursive: true }),
    fs.mkdir(sourceRoot, { recursive: true }),
    fs.mkdir(publicRoot, { recursive: true }),
]);

const sourceBuffer = await fs.readFile(sourcePath);
const sourceHash = crypto.createHash("sha256").update(sourceBuffer).digest("hex");
const { data, info } = await sharp(sourceBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

function pixelAt(x, y) {
    const index = (y * info.width + x) * 4;
    return {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3],
    };
}

function isVisible(pixel) {
    return pixel.a > 72;
}

function isLime(pixel) {
    return isVisible(pixel) && (pixel.r + pixel.g + pixel.b) / 3 > 105;
}

function findBounds(predicate, region = {}) {
    const left = region.left ?? 0;
    const top = region.top ?? 0;
    const right = region.right ?? info.width - 1;
    const bottom = region.bottom ?? info.height - 1;
    let minX = right;
    let minY = bottom;
    let maxX = left;
    let maxY = top;

    for (let y = top; y <= bottom; y += 1) {
        for (let x = left; x <= right; x += 1) {
            if (!predicate(pixelAt(x, y))) continue;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }
    }

    return { minX, minY, maxX, maxY };
}

function expandBounds(bounds, padding) {
    return {
        left: Math.max(0, bounds.minX - padding),
        top: Math.max(0, bounds.minY - padding),
        right: Math.min(info.width - 1, bounds.maxX + padding),
        bottom: Math.min(info.height - 1, bounds.maxY + padding),
    };
}

function dimensions(bounds) {
    return {
        width: bounds.right - bounds.left + 1,
        height: bounds.bottom - bounds.top + 1,
    };
}

function traceMask(bounds, predicate) {
    const { width, height } = dimensions(bounds);
    const mask = new Uint8Array(width * height);

    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            if (predicate(pixelAt(bounds.left + x, bounds.top + y))) {
                mask[y * width + x] = 1;
            }
        }
    }

    const filled = (x, y) =>
        x >= 0 && y >= 0 && x < width && y < height && mask[y * width + x] === 1;
    const edgeMap = new Map();

    function addEdge(x1, y1, x2, y2) {
        const key = `${x1},${y1}`;
        const edges = edgeMap.get(key) ?? [];
        edges.push([x2, y2]);
        edgeMap.set(key, edges);
    }

    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            if (!filled(x, y)) continue;
            if (!filled(x, y - 1)) addEdge(x, y, x + 1, y);
            if (!filled(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1);
            if (!filled(x, y + 1)) addEdge(x + 1, y + 1, x, y + 1);
            if (!filled(x - 1, y)) addEdge(x, y + 1, x, y);
        }
    }

    const loops = [];

    for (const [startKey, available] of edgeMap) {
        while (available.length) {
            const [startX, startY] = startKey.split(",").map(Number);
            const points = [[startX, startY]];
            let currentKey = startKey;
            let guard = 0;

            do {
                const candidates = edgeMap.get(currentKey);
                if (!candidates?.length) break;
                const next = candidates.pop();
                points.push(next);
                currentKey = `${next[0]},${next[1]}`;
                guard += 1;
            } while (currentKey !== startKey && guard < width * height * 4);

            if (currentKey === startKey && points.length > 3) loops.push(points);
        }
    }

    return loops
        .map((points) => {
            const simplified = points.filter((point, index) => {
                if (index === 0 || index === points.length - 1) return true;
                const previous = points[index - 1];
                const next = points[index + 1];
                return !(
                    (previous[0] === point[0] && point[0] === next[0]) ||
                    (previous[1] === point[1] && point[1] === next[1])
                );
            });
            return `M${simplified.map(([x, y]) => `${x} ${y}`).join("L")}Z`;
        })
        .join("");
}

function makeLogoSvg({ bounds, title, reverse = false, monochrome = false }) {
    const { width, height } = dimensions(bounds);
    const darkPath = traceMask(bounds, (pixel) => isVisible(pixel) && !isLime(pixel));
    const limePath = traceMask(bounds, isLime);
    const primaryFill = reverse ? WARM_WHITE : FOREST;
    const limeFill = monochrome ? primaryFill : LIME;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">The selected CodeStudioWorks CSW monogram and wordmark.</desc>
  <path fill="${primaryFill}" fill-rule="evenodd" d="${darkPath}"/>
  <path fill="${limeFill}" fill-rule="evenodd" d="${limePath}"/>
</svg>\n`;
}

function makeIconSvg({ bounds, background = FOREST }) {
    const { width, height } = dimensions(bounds);
    const darkPath = traceMask(bounds, (pixel) => isVisible(pixel) && !isLime(pixel));
    const limePath = traceMask(bounds, isLime);
    const targetSize = 820;
    const scale = Math.min(targetSize / width, targetSize / height);
    const offsetX = (1024 - width * scale) / 2;
    const offsetY = (1024 - height * scale) / 2;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-labelledby="title desc">
  <title id="title">CodeStudioWorks CSW icon</title>
  <desc id="desc">The selected CSW monogram with a lime terminal.</desc>
  <rect width="1024" height="1024" rx="208" fill="${background}"/>
  <g transform="translate(${offsetX.toFixed(3)} ${offsetY.toFixed(3)}) scale(${scale.toFixed(6)})">
    <path fill="${WARM_WHITE}" fill-rule="evenodd" d="${darkPath}"/>
    <path fill="${LIME}" fill-rule="evenodd" d="${limePath}"/>
  </g>
</svg>\n`;
}

const logoBounds = expandBounds(findBounds(isVisible), 24);
const markBounds = expandBounds(
    findBounds(isVisible, { bottom: 742 }),
    24
);

const svgAssets = {
    "codestudioworks-logo-stacked.svg": makeLogoSvg({
        bounds: logoBounds,
        title: "CodeStudioWorks stacked logo",
    }),
    "codestudioworks-logo-stacked-reverse.svg": makeLogoSvg({
        bounds: logoBounds,
        title: "CodeStudioWorks reverse stacked logo",
        reverse: true,
    }),
    "codestudioworks-logo-stacked-monochrome.svg": makeLogoSvg({
        bounds: logoBounds,
        title: "CodeStudioWorks monochrome stacked logo",
        monochrome: true,
    }),
    "codestudioworks-csw-mark.svg": makeLogoSvg({
        bounds: markBounds,
        title: "CodeStudioWorks CSW mark",
    }),
    "codestudioworks-csw-mark-reverse.svg": makeLogoSvg({
        bounds: markBounds,
        title: "CodeStudioWorks reverse CSW mark",
        reverse: true,
    }),
    "codestudioworks-csw-icon.svg": makeIconSvg({ bounds: markBounds }),
};

await Promise.all(
    Object.entries(svgAssets).flatMap(([filename, contents]) => [
        fs.writeFile(path.join(svgRoot, filename), contents),
        fs.writeFile(path.join(publicRoot, filename), contents),
    ])
);

async function renderSvg(filename, outputFilename, resize) {
    const input = Buffer.from(svgAssets[filename]);
    let pipeline = sharp(input, { density: 300 });
    if (resize.width && resize.height) {
        pipeline = pipeline.resize(resize.width, resize.height, { fit: "contain" });
    } else {
        pipeline = pipeline.resize(resize);
    }
    await pipeline.png().toFile(path.join(pngRoot, outputFilename));
}

async function renderApprovedSource(bounds, outputFilename, resize) {
    const { width, height } = dimensions(bounds);
    let pipeline = sharp(sourceBuffer).extract({
        left: bounds.left,
        top: bounds.top,
        width,
        height,
    });

    if (resize?.width && resize?.height) {
        pipeline = pipeline.resize(resize.width, resize.height, { fit: "contain" });
    } else if (resize?.width) {
        pipeline = pipeline.resize({ width: resize.width });
    }

    await pipeline.png().toFile(path.join(pngRoot, outputFilename));
}

await Promise.all([
    renderApprovedSource(logoBounds, "codestudioworks-logo-approved.png"),
    renderApprovedSource(logoBounds, "codestudioworks-logo-stacked-2400.png", { width: 2400 }),
    renderApprovedSource(logoBounds, "codestudioworks-logo-stacked-1200.png", { width: 1200 }),
    renderApprovedSource(logoBounds, "codestudioworks-logo-email-600.png", { width: 600 }),
    renderSvg("codestudioworks-logo-stacked-reverse.svg", "codestudioworks-logo-stacked-reverse-1200.png", { width: 1200 }),
    renderSvg("codestudioworks-logo-stacked-monochrome.svg", "codestudioworks-logo-stacked-monochrome-1200.png", { width: 1200 }),
    renderApprovedSource(markBounds, "codestudioworks-csw-mark-1024.png", { width: 1024 }),
    renderApprovedSource(markBounds, "codestudioworks-csw-mark-512.png", { width: 512 }),
    renderSvg("codestudioworks-csw-icon.svg", "codestudioworks-csw-icon-1024.png", { width: 1024, height: 1024 }),
    renderSvg("codestudioworks-csw-icon.svg", "codestudioworks-csw-icon-512.png", { width: 512, height: 512 }),
    renderSvg("codestudioworks-csw-icon.svg", "codestudioworks-csw-icon-192.png", { width: 192, height: 192 }),
    renderSvg("codestudioworks-csw-icon.svg", "codestudioworks-csw-icon-180.png", { width: 180, height: 180 }),
    renderSvg("codestudioworks-csw-icon.svg", "codestudioworks-csw-icon-32.png", { width: 32, height: 32 }),
]);

await Promise.all([
    fs.copyFile(sourcePath, path.join(sourceRoot, "codestudioworks-selected-concept.png")),
    fs.copyFile(path.join(pngRoot, "codestudioworks-csw-icon-512.png"), path.join(publicRoot, "codestudioworks-csw-icon-512.png")),
    fs.copyFile(path.join(pngRoot, "codestudioworks-csw-icon-192.png"), path.join(publicRoot, "codestudioworks-csw-icon-192.png")),
    fs.copyFile(path.join(pngRoot, "codestudioworks-csw-icon-180.png"), path.join(publicRoot, "codestudioworks-csw-icon-180.png")),
    fs.copyFile(path.join(pngRoot, "codestudioworks-csw-icon-32.png"), path.join(publicRoot, "codestudioworks-csw-icon-32.png")),
    fs.copyFile(path.join(pngRoot, "codestudioworks-logo-approved.png"), path.join(publicRoot, "codestudioworks-logo-approved.png")),
    fs.copyFile(path.join(pngRoot, "codestudioworks-logo-email-600.png"), path.join(publicRoot, "codestudioworks-logo-email-600.png")),
]);

const manifest = {
    brand: "CodeStudioWorks",
    concept: "Selected CSW monogram",
    version: "2.1",
    source: "assets/brand/codestudioworks-csw-selected-source.png",
    sourceSha256: sourceHash,
    colors: { forest: FOREST, lime: LIME, warmWhite: WARM_WHITE },
    formats: {
        svg: Object.keys(svgAssets).map((filename) => `svg/${filename}`),
        png: (await fs.readdir(pngRoot)).sort().map((filename) => `png/${filename}`),
    },
};

await fs.writeFile(
    path.join(packRoot, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`
);

await fs.writeFile(
    path.join(packRoot, "README.md"),
    `# CodeStudioWorks logo pack\n\nThis pack is based on the approved CSW monogram concept. The primary transparent PNG exports are exact crops of the selected artwork and retain its original shading. Deterministic vector versions are included for one-color, reverse, and large-format applications.\n\n## Recommended files\n\n- Exact approved logo on a light background: \`png/codestudioworks-logo-approved.png\`\n- Scalable flat-color vector: \`svg/codestudioworks-logo-stacked.svg\`\n- Dark background: \`svg/codestudioworks-logo-stacked-reverse.svg\`\n- Email signature: \`png/codestudioworks-logo-email-600.png\` at 300 CSS pixels wide\n- Avatar or social profile: \`png/codestudioworks-csw-icon-1024.png\`\n- Favicon: \`png/codestudioworks-csw-icon-32.png\`\n- One-color production: \`svg/codestudioworks-logo-stacked-monochrome.svg\`\n\n## Usage\n\nKeep clear space around the logo equal to roughly the height of the small CodeStudioWorks wordmark. Do not stretch, rotate, add effects, or change the relationship between the CSW monogram and the lime terminal.\n\n## Colors\n\n- Forest: \`${FOREST}\`\n- Lime: \`${LIME}\`\n- Warm white: \`${WARM_WHITE}\`\n`
);

await fs.writeFile(
    path.join(packRoot, "PROVENANCE.md"),
    `# Provenance\n\n- Approved source: \`assets/brand/codestudioworks-csw-selected-source.png\`\n- Source SHA-256: \`${sourceHash}\`\n- Source role: user-selected logo concept\n- Primary PNG export method: exact alpha-preserving crop and deterministic resizing with Sharp\n- Vector export method: alpha and color-region tracing, deterministic SVG construction, and PNG rasterization with Sharp\n- Approved exact wording: \`CodeStudioWorks\` and \`CSW\`\n- Selected concept prompt: create a simple letter-based identity using a custom interlocking \`CSW\` monogram with three clearly readable letters sharing one baseline; pair it with a smaller exact \`CodeStudioWorks\` wordmark below; keep the construction typographic rather than symbolic; minimalist custom lettering, deep forest green with one very small lime terminal.\n`
);

console.log(JSON.stringify({ packRoot, publicRoot, logoBounds, markBounds }, null, 2));
