const Technologies = () => {

    const technologies = [
        "HTML",
        "CSS",
        "Javascript",
        "React",
        "Next.JS",
        "Node.JS",
        "Tailwind CSS",
        "API's",
        "MongoDB",
        "UX/UI",
        "SEO",
        "Express.JS",
        "Axios",
        "Framer Motion",
        "GitHub",
        "Mongoose",
        "Vercel",
        "Heroku",
        "PayFast",
        "PayPal",
        "Stripe",
        "Secure Checkouts",
        "Google Ads",
        "Facebook Ads",
        "Meta Business Suite",
        "Tik Tok Ads",
        "Google Analytics",
        "Google Search Console",
        "Responsive Design",
        "Graphic Design",
        "ImageKit",
        "Drupal",
        "Wordpress",
        "Wix",
        "Online Payment Integration",

    ];

    // Additional Services
    const additionalServices = [
        "Consultations",
        "Debugging",
        "Troubleshooting",
        "General IT Support",
        "Software Support",
        "Technical Support",
        "Website Audits",
        "Website Optimizations",
    ]




    return ( 

        <section className="min-h-screen bg-[#3A6050] flex flex-col items-center justify-center space-y-16 p-3 py-16">

            <h2 className="text-white/30 font-bold text-3xl xl:text-5xl 2xl:text-7xl xl:mb-6 2xl:mb-12 z-10">Supported Technologies, Languages and Tools</h2>

            {/* Technologies and Tools Bubbles */}
            <div className="grid gap-2 md:gap-5 grid-cols-3 xl:grid-cols-8 max-w-[1600px]">

                {technologies.map(item => (
                    <div key={item} className="bg-white/20 shadow-md h-12 md:h-22 text-white text-sm md:text-lg font-bold p-1 md:px-5 md:py-3 rounded-md md:rounded-3xl text-center flex items-center justify-center">
                        <span className="flex justify-center">{item}</span>
                    </div>
                    
                ))}




            </div>

            <h2 className="text-white/30 font-bold text-3xl xl:text-5xl 2xl:text-7xl xl:mb-6 2xl:mb-12 z-10">Additional Services</h2>

            {/* Additional Services Bubbles */}
            <div className="grid gap-2 md:gap-5 grid-cols-3 md:grid-cols-8 max-w-[1600px]">

                {additionalServices.map(item => (
                    <div key={item} className="bg-white/20 shadow-md h-12 md:h-22 text-white text-sm md:text-lg font-bold p-1 md:px-5 md:py-3 rounded-md md:rounded-3xl text-center flex items-center justify-center">
                        <span className="flex justify-center">{item}</span>
                    </div>
                ))}

            </div>

        </section>

     );
}
 
export default Technologies;