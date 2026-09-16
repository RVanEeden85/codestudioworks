"use client";

import { useEffect, useRef } from "react";

// The scene is decorative: navigation, project links and copy stay in normal HTML.
export default function StudioScene({ progress, paused, station = 0, onReady }) {
    const host = useRef(null);
    const settings = useRef({ paused, station, onReady });
    useEffect(() => { settings.current = { paused, station, onReady }; }, [paused, station, onReady]);

    useEffect(() => {
        let disposed = false, cleanup = () => {};
        import("three").then((T) => {
            if (disposed || !host.current) return;
            const container = host.current;
            let renderer;
            try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); }
            catch { return; }
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 2));
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.outputColorSpace = T.SRGBColorSpace;
            renderer.toneMapping = T.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.35;
            renderer.shadowMap.enabled = window.innerWidth >= 768;
            renderer.shadowMap.type = T.PCFSoftShadowMap;
            container.appendChild(renderer.domElement);
            const scene = new T.Scene();
            scene.background = new T.Color("#141b1b");
            scene.fog = new T.Fog("#141b1b", 32, 85);
            const camera = new T.PerspectiveCamera(48, container.clientWidth / container.clientHeight, .1, 120);
            const textures = [];
            const texCanvas = document.createElement("canvas");
            texCanvas.width = texCanvas.height = 256;
            const ctx = texCanvas.getContext("2d");
            const pixels = ctx.createImageData(256, 256);
            let seed = 9231;
            for (let i = 0; i < pixels.data.length; i += 4) {
                seed = (seed * 16807) % 2147483647;
                const n = 145 + (seed % 16);
                pixels.data[i] = n; pixels.data[i + 1] = n; pixels.data[i + 2] = n - 3; pixels.data[i + 3] = 255;
            }
            ctx.putImageData(pixels, 0, 0);
            const concreteMap = new T.CanvasTexture(texCanvas);
            concreteMap.wrapS = concreteMap.wrapT = T.RepeatWrapping;
            concreteMap.repeat.set(3, 3); textures.push(concreteMap);
            const concrete = new T.MeshStandardMaterial({ color: "#777970", map: concreteMap, roughness: .91, bumpMap: concreteMap, bumpScale: .045 });
            const dark = new T.MeshStandardMaterial({ color: "#202927", roughness: .65, metalness: .25 });
            const floor = new T.MeshStandardMaterial({ color: "#555b54", roughness: .38, metalness: .2, map: concreteMap });
            const lime = new T.MeshBasicMaterial({ color: "#d6f367" });
            const warm = new T.MeshBasicMaterial({ color: "#ffe1ad" });
            const mesh = (w,h,d,x,y,z,mat=concrete) => { const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat); m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true; scene.add(m);return m; };
            scene.add(new T.HemisphereLight("#dce8e2", "#27281e", 2.6));
            const sun = new T.DirectionalLight("#ffe4b7", 4);
            sun.position.set(-8,15,8);
            sun.castShadow=true;
            // One stable, high-resolution map covers every walkthrough chapter.
            // Keep the full bounds so distant portals never lose their shadows.
            const shadowSize=Math.min(4096,renderer.capabilities.maxTextureSize);
            sun.shadow.mapSize.set(shadowSize,shadowSize);
            Object.assign(sun.shadow.camera,{left:-28,right:28,top:28,bottom:-28,far:90});
            sun.shadow.bias=-.0001;
            sun.shadow.normalBias=.015;
            sun.target.position.set(0,0,-15);
            scene.add(sun.target);scene.add(sun);
            const fill = new T.DirectionalLight("#acc7cd",1.7);fill.position.set(12,7,-22);scene.add(fill);
            mesh(32,.4,75,0,-.3,-12,floor);
            // Repeated portal frames create genuine perspective as the camera travels.
            for (const z of [5,-2,-9,-16,-23,-30,-37]) {
                mesh(1.1,9,1.3,-7,4.5,z);mesh(1.1,9,1.3,7,4.5,z);mesh(15.1,1.15,1.3,0,9,z);
                mesh(.035,7.8,.08,6.42,4.2,z+.69,lime);
                mesh(12.7,.035,.07,0,8.41,z+.69,warm);
            }
            // Facade wings and slim vertical fins around the entrance.
            mesh(8,10,1.5,-11.5,4.7,5);mesh(8,10,1.5,11.5,4.7,5);
            for(let x=8;x<15;x+=.48)mesh(.12,9.2,.65,x,4.4,6.1,dark);
            mesh(.065,.03,54,5.6,.0,-13,lime);
            mesh(.065,.03,54,-5.6,.0,-13,lime);
            for(let z=14;z>-42;z-=2.5)mesh(31,.005,.022,0,-.088,z,dark);
            // Gallery plinths with actual project screenshots.
            const loader = new T.TextureLoader();
            const screens=[['/images/work/rolleston-tinting-home.jpg',3.4,-8],['/images/work/state-champs-home.jpg',-3.3,-14],['/images/work/eventbookr-home.jpg',3.4,-19]];
            screens.forEach(([url,x,z])=>{
                mesh(5, .32,1.8,x,.35,z,dark);mesh(.18,1.5,.3,x,1.2,z-.3,dark);
                mesh(5,3.25,.22,x,3,z,dark);
                const texture=loader.load(url,()=>{ if(disposed){texture.dispose();return;} dirty=true; },undefined,()=>{});
                texture.colorSpace=T.SRGBColorSpace;textures.push(texture);
                const plane=new T.Mesh(new T.PlaneGeometry(4.7,2.95),new T.MeshBasicMaterial({map:texture}));plane.position.set(x,3,z+.13);scene.add(plane);
                mesh(1.1,.035,.03,x-1.8,1.25,z+.15,lime);
            });
            // Workshop: assembled architectural blocks floating above a stone table.
            mesh(6,.4,3,0,1,-26,dark);mesh(.4,1,2,-2, .4,-26);mesh(.4,1,2,2,.4,-26);
            const blocks=[];
            for(let i=0;i<5;i++) {const b=mesh(.75,1+i*.25,.85,-1.9+i*.95,2,-26,i===4?lime:concrete);blocks.push(b);}
            // A warm, open meeting area at the end of the studio.
            mesh(16,8,.5,0,4,-42);
            // A branded projection on a dark screen, using the existing approved logo.
            mesh(7.2,5.2,.12,2,4.4,-41.69,dark);
            const screenMaterial = new T.MeshBasicMaterial({ color: '#131f1c' });
            mesh(7,5,.04,2,4.4,-41.60,screenMaterial);
            let logoReady = false;
            const logoTexture = loader.load('/brand/csw/codestudioworks-logo-projection.png', () => {
                if (disposed) { logoTexture.dispose(); return; }
                logoReady = true; dirty = true;
            }, undefined, () => {});
            logoTexture.colorSpace = T.SRGBColorSpace; textures.push(logoTexture);
            const logoMaterial = new T.MeshBasicMaterial({ map: logoTexture, transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
            const logoProjection = new T.Mesh(new T.PlaneGeometry(5.3, 5.3 * 418 / 855), logoMaterial);
            logoProjection.position.set(2,4.5,-41.56);scene.add(logoProjection);
            const scanMaterial = new T.MeshBasicMaterial({ color: '#d6f367', transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
            const projectionScan = new T.Mesh(new T.PlaneGeometry(6.8,.025),scanMaterial);
            projectionScan.position.set(2,6.8,-41.53);scene.add(projectionScan);
            const glowCanvas = document.createElement('canvas');glowCanvas.width=glowCanvas.height=128;
            const glowContext=glowCanvas.getContext('2d');
            const glowGradient=glowContext.createRadialGradient(64,64,8,64,64,64);
            glowGradient.addColorStop(0,'rgba(214,243,103,.28)');glowGradient.addColorStop(.55,'rgba(214,243,103,.09)');glowGradient.addColorStop(1,'rgba(214,243,103,0)');
            glowContext.fillStyle=glowGradient;glowContext.fillRect(0,0,128,128);
            const glowTexture=new T.CanvasTexture(glowCanvas);textures.push(glowTexture);
            const projectionGlow = new T.Mesh(new T.PlaneGeometry(10,8),new T.MeshBasicMaterial({map:glowTexture,transparent:true,depthWrite:false,blending:T.AdditiveBlending}));
            projectionGlow.position.set(2,4.4,-41.73);scene.add(projectionGlow);
            mesh(2.2,.025,.02,2,2.3,-41.54,lime);
            mesh(4,.16,2.3,2,1.15,-35,floor);mesh(.3,1.1,.3,.5,.55,-35,dark);mesh(.3,1.1,.3,3.5,.55,-35,dark);
            [-1,5].forEach(x=>{
                mesh(1.3,.2,1.3,x,.65,-35,dark);
                mesh(1.3,1.2,.2,x,1.1,-35.6,dark);
                for (const dx of [-.49,.49]) for (const dz of [-.49,.49]) {
                    mesh(.11,.65,.11,x+dx,.225,-35+dz,dark);
                }
            });
            // Tabletop objects rest on the table's top surface at y = 1.23.
            const ceramic = new T.MeshStandardMaterial({color:'#c5baa4',roughness:.78});
            const pot = new T.Mesh(new T.CylinderGeometry(.28,.22,.48,24),ceramic);
            pot.position.set(1.1,1.47,-35.25);pot.castShadow=true;pot.receiveShadow=true;scene.add(pot);
            const soil = new T.Mesh(new T.CylinderGeometry(.245,.245,.018,24),new T.MeshStandardMaterial({color:'#28251d',roughness:1}));
            soil.position.set(1.1,1.715,-35.25);scene.add(soil);
            const stemMaterial = new T.MeshStandardMaterial({color:'#526540',roughness:.9});
            const leafMaterial = new T.MeshStandardMaterial({color:'#718d51',roughness:.72});
            for(let j=0;j<7;j++) {
                const angle=j*2.4, height=.35+(j%3)*.12;
                const stem=new T.Mesh(new T.CylinderGeometry(.013,.016,height,6),stemMaterial);
                stem.position.set(1.1+Math.cos(angle)*.07,1.72+height/2,-35.25+Math.sin(angle)*.07);scene.add(stem);
                const leaf=new T.Mesh(new T.SphereGeometry(1,12,8),leafMaterial);
                leaf.scale.set(.12,.24,.035);
                leaf.rotation.set(.35,angle,.5);
                leaf.position.set(1.1+Math.cos(angle)*.17,1.72+height,-35.25+Math.sin(angle)*.17);
                leaf.castShadow=true;scene.add(leaf);
            }
            // Thin, rounded aluminium iPad Pro with a dark bezel and lit display.
            const tablet = new T.Group();tablet.position.set(2.75,1.23,-34.65);tablet.rotation.y=-.22;scene.add(tablet);
            function roundedRect(width,height,radius) {
                const shape=new T.Shape(),x=-width/2,y=-height/2;
                shape.moveTo(x+radius,y);shape.lineTo(x+width-radius,y);shape.quadraticCurveTo(x+width,y,x+width,y+radius);
                shape.lineTo(x+width,y+height-radius);shape.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);
                shape.lineTo(x+radius,y+height);shape.quadraticCurveTo(x,y+height,x,y+height-radius);
                shape.lineTo(x,y+radius);shape.quadraticCurveTo(x,y,x+radius,y);return shape;
            }
            const tabletBody=new T.Mesh(new T.ExtrudeGeometry(roundedRect(1.05,.76,.06),{depth:.028,bevelEnabled:false,curveSegments:8}),new T.MeshStandardMaterial({color:'#7a8186',metalness:.8,roughness:.32}));
            tabletBody.rotation.x=-Math.PI/2;tabletBody.castShadow=true;tabletBody.receiveShadow=true;tablet.add(tabletBody);
            const bezel=new T.Mesh(new T.ShapeGeometry(roundedRect(1.025,.735,.05)),new T.MeshBasicMaterial({color:'#080b0e'}));
            bezel.rotation.x=-Math.PI/2;bezel.position.y=.029;tablet.add(bezel);
            const displayCanvas=document.createElement('canvas');displayCanvas.width=768;displayCanvas.height=536;
            const displayContext=displayCanvas.getContext('2d');
            const wallpaper=displayContext.createLinearGradient(0,0,768,536);wallpaper.addColorStop(0,'#17283c');wallpaper.addColorStop(.55,'#467c8d');wallpaper.addColorStop(1,'#b6d95c');displayContext.fillStyle=wallpaper;displayContext.fillRect(0,0,768,536);
            displayContext.strokeStyle='#d9f29b';displayContext.lineWidth=60;displayContext.globalAlpha=.35;
            displayContext.beginPath();displayContext.ellipse(460,320,300,175,-.5,0,Math.PI*2);displayContext.stroke();displayContext.globalAlpha=1;
            displayContext.fillStyle='#f7faef';displayContext.font='300 76px sans-serif';displayContext.textAlign='center';displayContext.fillText('09:41',384,135);
            displayContext.fillStyle='#ffffffaa';displayContext.fillRect(310,510,148,5);
            const displayTexture=new T.CanvasTexture(displayCanvas);displayTexture.colorSpace=T.SRGBColorSpace;textures.push(displayTexture);
            const display=new T.Mesh(new T.PlaneGeometry(.955,.665),new T.MeshBasicMaterial({map:displayTexture,toneMapped:false}));
            display.rotation.x=-Math.PI/2;display.position.y=.031;tablet.add(display);
            const tabletCamera=new T.Mesh(new T.SphereGeometry(.009,8,6),new T.MeshBasicMaterial({color:'#27333d'}));
            tabletCamera.position.set(0,.032,-.354);tablet.add(tabletCamera);
            // Geometric planting softens the concrete without external model downloads.
            for(const [x,z] of [[-5,-5],[5,-33],[-5,-39]]){
                mesh(.8,.8,.8,x,.35,z,dark);
                for(let j=0;j<5;j++) { const leaf=new T.Mesh(new T.ConeGeometry(.35,2.4,5),new T.MeshStandardMaterial({color:j%2?'#67735a':'#475d4b',roughness:1}));leaf.position.set(x+(j-2)*.12,1.8,z);leaf.rotation.z=(j-2)*.18;scene.add(leaf); }
            }
            const poses = [
                {p:[15,6.2,23],t:[1.5,3.7,1]},
                {p:[.2,3.6,2],t:[2.5,3,-10]},
                {p:[3,3.8,-21],t:[0,2,-27]},
                {p:[2,4,-28],t:[0,2.3,-38]},
            ];
            let frame=0,visible=true,dirty=true,last=-1,smoothed=0,ready=false;
            let projectionElapsed=0,previousTime=performance.now();
            const a=new T.Vector3(),b=new T.Vector3(),look=new T.Vector3();
            const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
            function draw(){
                frame=requestAnimationFrame(draw);
                const now=performance.now(),delta=Math.min(.05,(now-previousTime)/1000);previousTime=now;
                if(!visible || document.hidden)return;
                const target=settings.current.paused || reduce.matches ? settings.current.station : (progress?.current ?? settings.current.station);
                if (reduce.matches || settings.current.paused) smoothed=target;
                else smoothed += (target-smoothed)*.075;
                if(Math.abs(smoothed-target)<.0001)smoothed=target;
                const projectionActive=logoReady && smoothed>2.4;
                const animateProjection=projectionActive && !reduce.matches && !settings.current.paused && projectionElapsed<2.6;
                if(animateProjection)projectionElapsed=Math.min(2.6,projectionElapsed+delta);
                if(!dirty && !animateProjection && Math.abs(last-smoothed)<.00001)return;
                const reveal=reduce.matches || settings.current.paused ? 1 : Math.min(1,projectionElapsed/1.4);
                logoMaterial.opacity=logoReady ? reveal : 0;
                logoProjection.scale.setScalar(.97+.03*reveal);
                scanMaterial.opacity=animateProjection ? Math.sin(Math.PI*projectionElapsed/2.6)*.55 : 0;
                projectionScan.position.y=6.8-4.8*Math.min(1,projectionElapsed/2.6);
                last=smoothed;dirty=false;
                poses[0].p = container.clientWidth < 768 ? [1,4.5,24] : [15,6.2,23];
                const n=Math.max(0,Math.min(3,smoothed)),i=Math.min(2,Math.floor(n)),f=n-i,e=f*f*(3-2*f);
                a.fromArray(poses[i].p);b.fromArray(poses[i+1].p);camera.position.lerpVectors(a,b,e);
                a.fromArray(poses[i].t);b.fromArray(poses[i+1].t);look.lerpVectors(a,b,e);camera.lookAt(look);
                blocks.forEach((block,j)=>{block.position.y=2+Math.max(0,1-Math.abs(n-2))*j*.28;});
                renderer.render(scene,camera);
                if(!ready){ready=true;settings.current.onReady?.();}
            }
            const resize=new ResizeObserver(()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);dirty=true;});resize.observe(container);
            const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;dirty=true;});observer.observe(container);
            const lost=(event)=>{event.preventDefault();renderer.domElement.style.opacity='0';};renderer.domElement.addEventListener('webglcontextlost',lost);
            draw();
            cleanup=()=>{cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();renderer.domElement.removeEventListener('webglcontextlost',lost);scene.traverse(obj=>{obj.geometry?.dispose();if(obj.material){for(const material of [obj.material].flat())material.dispose();}});textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove();};
        }).catch(()=>{});
        return()=>{disposed=true;cleanup();};
    }, [progress]);
    return <div ref={host} className="studio-canvas" aria-hidden="true" />;
}
