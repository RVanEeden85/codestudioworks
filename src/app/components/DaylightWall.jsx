"use client";

import { useEffect, useRef } from "react";

export default function DaylightWall({ mood = "day" }) {
    const host = useRef(null);
    useEffect(() => {
        const element = host.current, section = element.closest("section");
        let disposed=false,started=false,cleanup=()=>{};
        const observer=new IntersectionObserver(async ([entry])=>{
            if(!entry.isIntersecting || started)return;
            started=true;
            const T=await import('three');
            if(disposed)return;
            let renderer;
            try {renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch{return;}
            renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
            renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
            renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;
            element.appendChild(renderer.domElement);
            const evening=mood==='evening',scene=new T.Scene();
            scene.background=new T.Color(evening?'#17201b':'#c5c1b6');
            const camera=new T.OrthographicCamera(-8,8,4,-4,.1,50);camera.position.set(0,0,18);camera.lookAt(0,0,0);
            const textureCanvas=document.createElement('canvas');textureCanvas.width=textureCanvas.height=256;
            const context=textureCanvas.getContext('2d'),data=context.createImageData(256,256);let seed=3817;
            for(let i=0;i<data.data.length;i+=4){seed=seed*16807%2147483647;const value=160+seed%22;data.data.set([value,value,value-4,255],i);}
            context.putImageData(data,0,0);const texture=new T.CanvasTexture(textureCanvas);texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.set(2,3);
            const stone=new T.MeshStandardMaterial({color:evening?'#576052':'#b4b1a5',map:texture,bumpMap:texture,bumpScale:.025,roughness:.94});
            function box(w,h,d,x,y,z,material=stone){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=mesh.receiveShadow=true;scene.add(mesh);return mesh;}
            box(40,24,.25,0,0,-.4);
            for(let i=-6;i<=6;i++){
                const x=i*2.6,depth=.22+(i%3+3)%3*.16;
                box(2.53,16,depth,x,0,depth/2);
                if(mood==='morning'||evening)box(.15,16,.65,x+1.04,0,.45);
                // Small recessed formwork marks in the cast concrete.
                const pinMaterial=new T.MeshStandardMaterial({color:evening?'#323c33':'#8a897f',roughness:1});
                for(const y of [-3,0,3]){const pin=new T.Mesh(new T.CircleGeometry(.035,10),pinMaterial);pin.position.set(x-1,y,depth+.002);scene.add(pin);}
            }
            const accent=new T.MeshBasicMaterial({color:'#d6f367',transparent:true,opacity:evening?.75:.14});
            if(evening)for(const x of [-5.15,5.25])box(.025,16,.025,x,0,.83,accent);
            const ambient=new T.HemisphereLight('#eee9db','#555b52',evening?.6:1.5);scene.add(ambient);
            const sun=new T.DirectionalLight('#ffe4b5',evening?1:3.2);sun.castShadow=true;
            sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-18;sun.shadow.camera.right=18;sun.shadow.camera.top=12;sun.shadow.camera.bottom=-12;sun.shadow.camera.far=50;sun.shadow.bias=-.0002;sun.shadow.normalBias=.02;
            scene.add(sun);scene.add(sun.target);
            const reduce=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
            function render(){
                frame=0;if(disposed||document.hidden)return;
                const rect=section.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;
                const progress=reduce.matches?.45:Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));
                const phase=mood==='morning'?progress*.5:evening?.65+progress*.35:progress;
                sun.position.set(-11+phase*22,7-Math.abs(phase-.5)*7,2+Math.sin(phase*Math.PI)*6);
                sun.color.setRGB(1,.92-phase*.2,.77-phase*.3);sun.intensity=evening?1.1-phase*.5:3.2;
                accent.opacity=.35+phase*.6;
                renderer.render(scene,camera);
            }
            function requestRender(){if(!frame)frame=requestAnimationFrame(render);}
            function resize(){const w=element.clientWidth,h=element.clientHeight;renderer.setSize(w,h);camera.left=-8;camera.right=8;camera.top=8*h/w;camera.bottom=-camera.top;camera.updateProjectionMatrix();requestRender();}
            const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(element);
            window.addEventListener('scroll',requestRender,{passive:true});window.addEventListener('resize',resize);document.addEventListener('visibilitychange',requestRender);reduce.addEventListener('change',requestRender);
            const lost=event=>{event.preventDefault();renderer.domElement.style.opacity='0';};renderer.domElement.addEventListener('webglcontextlost',lost);
            resize();
            cleanup=()=>{cancelAnimationFrame(frame);sizeObserver.disconnect();window.removeEventListener('scroll',requestRender);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',requestRender);reduce.removeEventListener('change',requestRender);renderer.domElement.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});texture.dispose();renderer.dispose();renderer.domElement.remove();};
        },{rootMargin:'200px'});
        observer.observe(section);return()=>{disposed=true;observer.disconnect();cleanup();};
    },[mood]);
    return <div ref={host} className="daylight-wall" aria-hidden="true"/>;
}
