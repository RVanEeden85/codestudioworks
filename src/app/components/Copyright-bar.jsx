import Link from "next/link";
import BrandMark from "./BrandMark";

const CopyrightBar = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 bg-[#080909] px-5 py-10 text-sm text-white/58">
            <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-end">
                <div>
                    <BrandMark inverted className="h-14 w-auto" />
                    <p className="mt-5 max-w-sm leading-6">
                        © {year} CodeStudioWorks. Independent web, app, and software development.
                    </p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/12 pt-5 font-semibold md:justify-end">
                    <Link href="/services" className="hover:text-accent">
                        Services
                    </Link>
                    <Link href="/work" className="hover:text-accent">Work</Link>
                    <Link href="/pricing" className="hover:text-accent">
                        Pricing
                    </Link>
                    <Link href="/contact" className="hover:text-accent">
                        Contact
                    </Link>
                    <Link href="/privacy" className="hover:text-accent">Privacy</Link>
                    <Link href="/terms" className="hover:text-accent">Terms</Link>
                </div>
            </div>
        </footer>
    );
};

export default CopyrightBar;
