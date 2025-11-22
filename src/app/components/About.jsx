import {motion, useScroll, useTransform} from 'framer-motion';


const About = () => {
    return ( 

            <section id='about' className="p-3 flex flex-col items-center justify-center min-h-screen bg-[#1B3A34] relative">

          <div className="xl:max-w-3xl 2xl:max-w-5xl mx-auto space-y-8">

            <h2 className="text-white/30 font-bold text-4xl xl:text-5xl 2xl:text-7xl">Where your ideas become digital reality</h2>

            <div className="text-white/60">
              <h3 className="xl:text-xl 2xl:text-4xl text-white/80 font-bold">Hi, I’m Ryno van Eeden — the full-stack developer and founder behind Code Studio Works</h3>

              <div className="text-sm xl:text-lg 2xl:text-xl space-y-5">
                <p>I run a small virtual studio that helps new, small, and medium-sized businesses build and grow their online presence. From developing your first digital footprint strategy to web design, SEO, branding, and digital marketing, I provide an all-in-one suite of online services designed to make your business stand out in the digital space.</p>

              <p>I’m based in Michigan, USA, and work with clients around the world through virtual meetings and secure online payments.</p>

              <p>As a professional freelancer, I’m passionate about helping businesses grow and achieve lasting success. If you’re looking for a personal, one-on-one approach to your online marketing, let’s connect — and if you already have a project in mind, let’s make it happen!</p>
              </div>

              

            </div>

            <motion.div className="flex items-center justify-center md:absolute md:bottom-2 md:right-2">
              <img className="rounded-full w-30 h-30 mt-10 xl:w-80 xl:h-80 border xl:border-10 2xl:border-20 border-white/10" src="/images/ryno.png" alt="Full stack web app and website development studio in Westland, Michigan, USA - CodeStudioWorks" />
            </motion.div>

        


          </div>

                  

        </section>

     );
}
 
export default About;