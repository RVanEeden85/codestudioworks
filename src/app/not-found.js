import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
    return (
        <main className="architectural-page flex min-h-[78vh] items-center bg-secondary px-5 pt-[72px] text-white">
            <section className="mx-auto w-full max-w-3xl py-20 text-center">
                <p className="text-sm font-black uppercase text-accent">404 — Page not found</p>
                <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">That page isn&apos;t part of the current studio site.</h1>
                <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-8 text-white/68">The link may be old or the page may have moved. Use the current services and work pages to continue.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link href="/" className="rounded-md bg-accent px-6 py-4 font-black text-secondary">Go to Home</Link>
                    <Link href="/services" className="rounded-md border border-white/25 px-6 py-4 font-black text-white">View Services</Link>
                </div>
            </section>
        </main>
    );
}
