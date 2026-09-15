"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { FiArrowDownRight } from "react-icons/fi";
const StudioScene=dynamic(()=>import('./StudioScene'),{ssr:false});
export default function StudioPageHero({label,title,children,station=0,href,action}){
 return <section className="studio-page-hero"><Image src="/images/architectural-hero.webp" fill priority alt="" sizes="100vw" className="studio-fallback"/><StudioScene paused station={station}/><div className="studio-shade"/><div className="studio-page-content"><p className="studio-kicker"><span>CSW</span>{label}</p><h1>{title}</h1><p className="studio-copy">{children}</p><Link className="studio-primary" href={href}>{action}<FiArrowDownRight/></Link></div><span className="studio-room-label">INSIDE THE STUDIO / 0{station+1}</span></section>;
}
