"use client";
import { useEffect, useRef } from "react";

export default function CourtyardWall() {
    const host=useRef(null);
    useEffect(()=>{
        const element=host.current,section=element.closest('section');
        let disposed=false,started=false,cleanup=()=>{};
        const observer=new IntersectionObserver(async([entry])=>{
            if(started||!entry.isIntersecting)return;started=true;
            let T;try{T=await import('three');}catch{return;}if(disposed)return;
            let renderer;try{renderer=new T.WebGLRenderer({antialias:true,powerPreference:'low-power'});}catch{return;}
            renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
            renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;element.appendChild(renderer.domElement);
            const scene=new T.Scene();scene.background=new T.Color('#aeb3ae');
            const camera=new T.OrthographicCamera(-10,10,6,-6,.1,70);camera.position.set(2,1.5,22);camera.lookAt(0,0,0);
            const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d');ctx.fillStyle='#b7bab5';ctx.fillRect(0,0,512,512);
            let seed=837;const random=()=>{seed=seed*16807%2147483647;return seed/2147483647;};
            // Broad mineral mottling under fine pores, without a repeating striped texture.
            for(let i=0;i<220;i++){const x=random()*512,y=random()*512,r=20+random()*90,g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,i%2?'#ffffff08':'#17251a08');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}
            for(let i=0;i<24000;i++){ctx.fillStyle=i%3?'#17211b0a':'#ffffff12';const size=random()<.03?1.6:.6;ctx.fillRect(random()*512,random()*512,size,size);}
            const texture=new T.CanvasTexture(canvas);texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.set(1,2);
            const stone=new T.MeshStandardMaterial({color:'#c1c5c0',map:texture,bumpMap:texture,bumpScale:.018,roughness:.88});
            const edge=new T.MeshStandardMaterial({color:'#8d9690',roughness:.9});
            const metal=new T.MeshStandardMaterial({color:'#404d46',roughness:.65,metalness:.25});
            function box(w,h,d,x,y,z,material=stone){const m=new T.Mesh(new T.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;scene.add(m);return m;}
            box(45,26,.3,0,0,-.35,edge);
            const shape=new T.Shape();shape.moveTo(-2,-12);shape.lineTo(2,-12);shape.lineTo(2,12);shape.lineTo(-2,12);shape.closePath();
            const panelGeometry=new T.ExtrudeGeometry(shape,{depth:.18,bevelEnabled:true,bevelThickness:.035,bevelSize:.025,bevelSegments:2,steps:1});
            for(let i=-5;i<=5;i++){const material=stone.clone();material.color.offsetHSL(0,0,(i%3)*.012);const panel=new T.Mesh(panelGeometry,material);panel.position.set(i*4.07,0,0);panel.castShadow=panel.receiveShadow=true;scene.add(panel);}
            // A return wall, canopy and floor establish an actual courtyard volume.
            box(.4,24,9,10.3,0,4.2);box(42,.3,13,0,-5.1,6);
            box(40,.34,.35,0,5.1,5.8,metal);
            for(let x=-20;x<=20;x+=1.65)box(.22,.28,6.8,x,5.3,3.2,metal);
            // Concentrate shadow texels on the courtyard instead of the unused outer wall.
            // Keep the lighter map on small screens and respect the GPU's texture limit.
            const shadowSize=Math.min(innerWidth<768?2048:4096,renderer.capabilities.maxTextureSize);
            const sun=new T.DirectionalLight('#fff3dc',3.3);sun.castShadow=true;sun.shadow.mapSize.set(shadowSize,shadowSize);Object.assign(sun.shadow.camera,{left:-18,right:18,top:14,bottom:-14,far:65});sun.shadow.bias=-.0001;sun.shadow.normalBias=.015;scene.add(sun);scene.add(sun.target);
            scene.add(new T.HemisphereLight('#edf3f5','#7b817b',1.8));
            const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0,current=.35;
            function render(){frame=0;if(disposed||document.hidden)return;const rect=section.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;
                const target=reduced.matches?.45:Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));
                current=reduced.matches?target:current+(target-current)*.12;
                sun.position.set(-10+current*20,8+Math.sin(current*Math.PI)*3,8);sun.color.setRGB(1,.97-Math.abs(current-.5)*.08,.9-Math.abs(current-.5)*.12);
                renderer.render(scene,camera);if(Math.abs(target-current)>.0005)requestRender();}
            function requestRender(){if(!frame)frame=requestAnimationFrame(render);}
            function resize(){const w=element.clientWidth,h=element.clientHeight,halfH=Math.max(5.5,Math.min(9,10*h/w));renderer.setSize(w,h);camera.top=halfH;camera.bottom=-halfH;camera.left=-halfH*w/h;camera.right=halfH*w/h;camera.updateProjectionMatrix();requestRender();}
            const sizes=new ResizeObserver(resize);sizes.observe(element);window.addEventListener('scroll',requestRender,{passive:true});document.addEventListener('visibilitychange',requestRender);reduced.addEventListener('change',requestRender);
            const lost=e=>{e.preventDefault();renderer.domElement.style.opacity='0';};renderer.domElement.addEventListener('webglcontextlost',lost);resize();
            cleanup=()=>{cancelAnimationFrame(frame);sizes.disconnect();window.removeEventListener('scroll',requestRender);document.removeEventListener('visibilitychange',requestRender);reduced.removeEventListener('change',requestRender);renderer.domElement.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});stone.dispose();texture.dispose();renderer.dispose();renderer.domElement.remove();};
        },{rootMargin:'200px'});observer.observe(section);return()=>{disposed=true;observer.disconnect();cleanup();};
    },[]);
    return <div ref={host} className="daylight-wall courtyard-wall" aria-hidden="true"/>;
}
