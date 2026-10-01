import Image from "next/image";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";

export default function StudioHomeHero() {
    return <section className="studio-journey studio-journey-compact" aria-label="Meet CodeStudioWorks">
        <div className="studio-stage">
            <Image src="/images/architectural-hero.webp" fill preload alt="" sizes="100vw" className="studio-fallback" />
            <div className="studio-shade" />
            <div className="studio-topline"><span>CSW / DIGITAL ATELIER</span><span>WESTLAND, MI · SERVING METRO DETROIT</span></div>
            <div className="studio-story">
                <div className="studio-chapter is-current">
                    <p className="studio-kicker"><span>CSW</span> Your independent developer</p>
                    <h1>Website design &amp; development in Westland.</h1>
                    <p className="studio-copy"><span className="studio-desktop-copy">I’m Ryno. I build custom websites, apps and business software, and help with SEO and digital marketing. Work directly with me from planning through launch, across Metro Detroit or remotely worldwide.</span><span className="studio-mobile-copy">Custom websites, apps, software, SEO and digital marketing. Work directly with Ryno in Metro Detroit or remotely worldwide.</span></p>
                    <div className="studio-actions"><Link href="/contact" className="studio-primary">Request a quote <FiArrowUpRight aria-hidden="true" /></Link><Link href="#studio-walkthrough" className="studio-secondary">Explore the studio <FiArrowDown aria-hidden="true" /></Link></div>
                    <p className="studio-note">Business websites from $1,250 USD · Clear scope and ownership</p>
                </div>
            </div>
            <div className="studio-bottom"><Link href="/work" className="studio-scroll">See client projects <FiArrowUpRight aria-hidden="true" /></Link><Link href="#studio-walkthrough" className="studio-pause">An interactive look inside <FiArrowDown aria-hidden="true" /></Link></div>
        </div>
    </section>;
}
