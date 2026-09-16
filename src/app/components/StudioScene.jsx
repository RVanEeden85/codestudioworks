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
            const paleStone=new T.MeshStandardMaterial({color:'#eeeae0',map:concreteMap,roughness:.38,bumpMap:concreteMap,bumpScale:.008});
            mesh(4,.16,2.3,2,1.15,-35,paleStone);mesh(.3,1.1,.3,.5,.55,-35,dark);mesh(.3,1.1,.3,3.5,.55,-35,dark);
            [-1,5].forEach(x=>{
                const chair=new T.Group();chair.position.set(x,0,-35);
                chair.rotation.y=x<2?Math.PI/2:-Math.PI/2;scene.add(chair);
                const part=(w,h,d,px,py,pz)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),dark);m.position.set(px,py,pz);m.castShadow=true;m.receiveShadow=true;chair.add(m);};
                part(1.3,.2,1.3,0,.65,0);
                part(1.3,1.2,.2,0,1.1,-.6);
                for (const dx of [-.49,.49]) for (const dz of [-.49,.49]) {
                    part(.11,.65,.11,dx,.225,dz);
                }
            });
            // Quiet charcoal textile, with fine weave and a restrained inset seam.
            const rugCanvas=document.createElement('canvas');rugCanvas.width=1024;rugCanvas.height=640;
            const rc=rugCanvas.getContext('2d');rc.fillStyle='#455456';rc.fillRect(0,0,1024,640);rc.lineWidth=1;
            for(let y=0;y<640;y+=3){rc.strokeStyle=y%2?'#ffffff09':'#00000012';rc.beginPath();rc.moveTo(0,y);rc.lineTo(1024,y);rc.stroke();}
            for(let x=0;x<1024;x+=4){rc.strokeStyle='#e6e5da08';rc.beginPath();rc.moveTo(x,0);rc.lineTo(x,640);rc.stroke();}
            rc.strokeStyle='#64716e';rc.lineWidth=2;rc.strokeRect(25,25,974,590);
            const rugTexture=new T.CanvasTexture(rugCanvas);rugTexture.colorSpace=T.SRGBColorSpace;rugTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());textures.push(rugTexture);
            const rug=new T.Mesh(new T.BoxGeometry(9.2,.026,5.4),new T.MeshStandardMaterial({map:rugTexture,roughness:1}));rug.position.set(2,-.074,-35);rug.receiveShadow=true;scene.add(rug);
            // Tabletop objects rest on the table's top surface at y = 1.23.
            const ceramic = new T.MeshStandardMaterial({color:'#c5baa4',roughness:.78});
            const pot = new T.Mesh(new T.CylinderGeometry(.28,.22,.48,24),ceramic);
            pot.position.set(1.1,1.47,-35.25);pot.castShadow=true;pot.receiveShadow=true;scene.add(pot);
            const soil = new T.Mesh(new T.CylinderGeometry(.245,.245,.018,24),new T.MeshStandardMaterial({color:'#28251d',roughness:1}));
            soil.position.set(1.1,1.715,-35.25);scene.add(soil);
            const stemMaterial = new T.MeshStandardMaterial({color:'#526540',roughness:.9});
            const leafMaterial = new T.MeshStandardMaterial({color:'#568044',roughness:.88,side:T.DoubleSide});
            // Arching fern fronds; all 288 paired leaflets share one draw call.
            const leafletShape=new T.Shape();leafletShape.moveTo(0,0);leafletShape.quadraticCurveTo(.055,.06,0,.23);leafletShape.quadraticCurveTo(-.045,.07,0,0);
            const fernLeaves=new T.InstancedMesh(new T.ShapeGeometry(leafletShape,4),leafMaterial,288);
            const leafPose=new T.Object3D();let leafIndex=0;
            for(let j=0;j<12;j++) {
                const angle=j*Math.PI*2/12,reach=.46+(j%3)*.13,rise=.42+(j%4)*.065;
                const radial=new T.Vector3(Math.cos(angle),0,Math.sin(angle)),side=new T.Vector3(-Math.sin(angle),0,Math.cos(angle));
                const point=t=>new T.Vector3(1.1+radial.x*reach*t,1.72+rise*Math.sin(t*Math.PI*.82),-35.25+radial.z*reach*t);
                const curve=new T.CatmullRomCurve3(Array.from({length:9},(_,k)=>point(k/8)));
                scene.add(new T.Mesh(new T.TubeGeometry(curve,16,.007,4,false),stemMaterial));
                for(let k=0;k<12;k++)for(const direction of [-1,1]){
                    const t=.13+k*.069;leafPose.position.copy(point(t));
                    const tip=side.clone().multiplyScalar(direction).addScaledVector(radial,.35).add(new T.Vector3(0,.23,0)).normalize();
                    leafPose.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),tip);leafPose.scale.setScalar((1-t)*1.2+.12);leafPose.updateMatrix();fernLeaves.setMatrixAt(leafIndex++,leafPose.matrix);
                }
            }
            fernLeaves.instanceMatrix.needsUpdate=true;fernLeaves.castShadow=true;scene.add(fernLeaves);
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
            // Arc lamps illuminate nearby surfaces without extra shadow maps.
            const lampMetal=new T.MeshStandardMaterial({color:'#343b38',metalness:.75,roughness:.3});
            const lampInner=new T.MeshStandardMaterial({color:'#f1dfb8',emissive:'#ffda91',emissiveIntensity:1.4,roughness:.6,side:T.DoubleSide});
            for(const [x,z] of [[-5,-5],[5,-33],[-5,-39]]){
                const inward=x<0?1:-1;
                const base=new T.Mesh(new T.CylinderGeometry(.48,.52,.12,32),lampMetal);base.position.set(x,-.035,z);base.castShadow=true;scene.add(base);
                const arc=new T.CatmullRomCurve3([new T.Vector3(x,.02,z),new T.Vector3(x,2.4,z),new T.Vector3(x+inward*.35,3.65,z),new T.Vector3(x+inward*1.25,4.05,z),new T.Vector3(x+inward*2.05,3.7,z)]);
                const stem=new T.Mesh(new T.TubeGeometry(arc,40,.035,8,false),lampMetal);stem.castShadow=true;scene.add(stem);
                const lx=x+inward*2.05;
                const shade=new T.Mesh(new T.SphereGeometry(.4,24,12,0,Math.PI*2,0,Math.PI/2),lampMetal);shade.position.set(lx,3.48,z);shade.castShadow=true;scene.add(shade);
                const diffuser=new T.Mesh(new T.CircleGeometry(.35,24),lampInner);diffuser.rotation.x=-Math.PI/2;diffuser.position.set(lx,3.48,z);scene.add(diffuser);
                const bulb=new T.SpotLight('#ffe0a3',28,8,Math.PI/3,.8,2);bulb.position.set(lx,3.43,z);bulb.target.position.set(lx,0,z);scene.add(bulb,bulb.target);
            }
            // Broad banana leaves frame the entrance and meeting area.
            const bananaLeaf=new T.Shape();
            bananaLeaf.moveTo(0,0);
            bananaLeaf.bezierCurveTo(-.38,.25,-.59,1.14,-.18,1.72);
            bananaLeaf.quadraticCurveTo(-.05,1.91,0,2.05);
            bananaLeaf.bezierCurveTo(.5,1.63,.55,.48,0,0);
            const bananaGeometry=new T.ShapeGeometry(bananaLeaf,12);
            // Curve the blade out of its plane for a soft, drooping silhouette.
            const bladePositions=bananaGeometry.attributes.position;
            for(let i=0;i<bladePositions.count;i++){
                const y=bladePositions.getY(i),x=bladePositions.getX(i);
                bladePositions.setZ(i,-.23*y*y+.22*Math.abs(x));
            }
            bananaGeometry.computeVertexNormals();
            const bananaMaterials=['#355c37','#467447','#587f43'].map(color=>new T.MeshStandardMaterial({color,roughness:.76,side:T.DoubleSide}));
            const bananaStem=new T.MeshStandardMaterial({color:'#66804b',roughness:.9});
            const treePot=new T.MeshStandardMaterial({color:'#b8afa0',roughness:.9});
            for(const [x,z] of [[6,7],[-4.3,-36.7]]){
                const planter=new T.Mesh(new T.CylinderGeometry(.62,.46,.92,32),treePot);
                planter.position.set(x,.36,z);planter.castShadow=true;planter.receiveShadow=true;scene.add(planter);
                const dirt=new T.Mesh(new T.CylinderGeometry(.56,.56,.025,24),soil.material);
                dirt.position.set(x,.825,z);scene.add(dirt);
                for(let j=0;j<9;j++){
                    const angle=j*2.4,height=1.25+(j%4)*.35,spread=.32+(j%3)*.17;
                    const tip=new T.Vector3(x+Math.cos(angle)*spread,.82+height,z+Math.sin(angle)*spread);
                    const stalkCurve=new T.CatmullRomCurve3([new T.Vector3(x,.8,z),new T.Vector3(x+Math.cos(angle)*.1,1.4,z+Math.sin(angle)*.1),tip]);
                    const stalk=new T.Mesh(new T.TubeGeometry(stalkCurve,12,.025,5,false),bananaStem);stalk.castShadow=true;scene.add(stalk);
                    const leaf=new T.Mesh(bananaGeometry,bananaMaterials[j%3]);
                    leaf.position.copy(tip);leaf.rotation.set(-.3-(j%3)*.19,angle,(j%2?1:-1)*.25);
                    leaf.scale.setScalar(.7+(j%3)*.12);leaf.castShadow=true;leaf.receiveShadow=true;scene.add(leaf);
                }
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
                const mobile = container.clientWidth < 768;
                const activePoses = mobile ? [
                    {p:[0,4.5,25],t:[0,4,-3]},
                    {p:[3.4,4,2],t:[3.4,3,-8]},
                    {p:[5,5,-17],t:[0,2,-26]},
                    {p:[2,5,-25],t:[1,3.3,-38]},
                ] : poses;
                const n=Math.max(0,Math.min(3,smoothed)),i=Math.min(2,Math.floor(n)),f=n-i,e=f*f*(3-2*f);
                a.fromArray(activePoses[i].p);b.fromArray(activePoses[i+1].p);camera.position.lerpVectors(a,b,e);
                a.fromArray(activePoses[i].t);b.fromArray(activePoses[i+1].t);look.lerpVectors(a,b,e);camera.lookAt(look);
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
