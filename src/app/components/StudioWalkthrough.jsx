"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight, FiPause, FiPlay } from "react-icons/fi";
const StudioScene = dynamic(() => import("./StudioScene"), { ssr: false });
const chapters = [
    {label:"The entrance", title:"Websites, apps and software for your business.", copy:"I’m Ryno. I help businesses launch websites, build custom apps and improve existing software. You work directly with me from the first conversation through launch and ongoing support.",link:"Discuss your project",href:"/contact",note:"Independent full-stack developer · Detroit, Michigan"},
    {label:"The gallery",title:"Explore my recent work.",copy:"Explore client projects, my professional contributions and an independent product. Each case study explains my role and the work involved.",link:"View case studies",href:"/work",note:"Client websites · Professional contributions · Independent products"},
    {label:"The workshop",title:"How your project works.",copy:"We’ll agree on priorities, review progress together and keep your code and accounts organised for the future.",link:"Explore services",href:"/services",note:"Plan · Design · Build · Launch"},
    {label:"A place to start",title:"Let’s discuss your project.",copy:"Tell me what you want to build or improve. I’ll review your message and reply personally.",link:"Discuss your project",href:"/contact",note:"Work directly with me"},
];
export default function StudioWalkthrough(){
    const section=useRef(null),progress=useRef(0);
    const [chapter,setChapter]=useState(0),[paused,setPaused]=useState(false),[ready,setReady]=useState(false),[frozen,setFrozen]=useState(0);
    useEffect(()=>{
        function update(){const el=section.current;if(!el)return;const rect=el.getBoundingClientRect();const p=Math.max(0,Math.min(3,-rect.top/(el.offsetHeight-window.innerHeight)*3));progress.current=p;setChapter(Math.min(3,Math.floor(p+.45)));}
        update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
        return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};
    },[]);
    function go(index){const el=section.current;const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top+index/3*(el.offsetHeight-window.innerHeight),behavior:reduce?'instant':'smooth'});}
    return <section ref={section} className="studio-journey" aria-label="Inside the studio">
        <div className={`studio-stage ${ready?'studio-ready':''}`}>
            <Image src="/images/architectural-hero.webp" fill priority alt="" sizes="100vw" className="studio-fallback" />
            <StudioScene progress={progress} paused={paused} station={frozen} onReady={()=>setReady(true)} />
            <div className="studio-shade" />
            <div className="studio-topline"><span>CSW / DIGITAL ATELIER</span><span>DETROIT · AVAILABLE WORLDWIDE</span></div>
            <div className="studio-story">
                {chapters.map((item,index)=><div key={item.label} className={`studio-chapter ${chapter===index?'is-current':''}`} aria-hidden={chapter!==index} inert={chapter!==index}>
                    <p className="studio-kicker"><span>0{index+1}</span> {item.label}</p>
                    {index===0?<h1>{item.title}</h1>:<h2>{item.title}</h2>}
                    <p className="studio-copy">{item.copy}</p>
                    <div className="studio-actions"><Link href={item.href} className="studio-primary">{item.link}<FiArrowUpRight /></Link>{index===0&&<Link href="/work" className="studio-secondary">View my work <FiArrowUpRight /></Link>}</div>
                    <p className="studio-note">{item.note}</p>
                </div>)}
            </div>
            <div className="studio-bottom"><button className="studio-scroll" onClick={()=>go(Math.min(3,chapter+1))}><FiArrowDown/> Scroll to explore</button><nav aria-label="Studio chapters">{chapters.map((c,i)=><button key={c.label} aria-label={`Go to ${c.label}`} aria-current={chapter===i?'step':undefined} onClick={()=>go(i)}><span>0{i+1}</span><span className="studio-nav-label">{c.label}</span></button>)}</nav><button className="studio-pause" aria-pressed={paused} onClick={()=>{setFrozen(progress.current);setPaused(!paused);}}>{paused?<FiPlay/>:<FiPause/>}<span>{paused?'Resume motion':'Pause motion'}</span></button></div>
        </div>
    </section>;
}
