import Image from "next/image";
export default function PageIntro({ label, title, children, image }) {
 return <section className="page-intro relative overflow-hidden border-b border-white/10">
  {image && <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />}
  <div className="section-shell relative py-10 md:py-14">
   <p className="eyebrow">{label}</p>
   <h1 className="mt-3 max-w-4xl text-white">{title}</h1>
   <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{children}</div>
  </div>
 </section>;
}
