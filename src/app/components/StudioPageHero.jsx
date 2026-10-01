import Link from "next/link";
import Image from "next/image";
import { FiArrowDownRight } from "react-icons/fi";
export default function StudioPageHero({label,title,children,station=0,href,action}){
 return <section className="studio-page-hero"><Image src="/images/architectural-hero.webp" fill priority alt="" sizes="100vw" className="studio-fallback"/><div className="studio-shade"/><div className="studio-page-content"><p className="studio-kicker"><span>CSW</span>{label}</p><h1>{title}</h1><p className="studio-copy">{children}</p><Link className="studio-primary" href={href}>{action}<FiArrowDownRight/></Link></div><span className="studio-room-label">INSIDE THE STUDIO / 0{station+1}</span></section>;
}
