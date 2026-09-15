import Image from "next/image";

export default function BrandMark({ className = "h-9 w-auto", inverted = false, title }) {
    return (
        <Image
            src={inverted ? "/brand/csw/codestudioworks-logo-stacked-reverse.svg" : "/brand/csw/codestudioworks-logo-approved.png"}
            alt={title ?? ""}
            aria-hidden={title ? undefined : "true"}
            width={855}
            height={418}
            className={className}
            priority
        />
    );
}
