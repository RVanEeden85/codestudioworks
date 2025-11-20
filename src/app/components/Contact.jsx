"use client";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../../../public/lottie/falling-leaf.json"
import { useRef, useEffect } from "react";

const Contact = () => {

  const lottieRef = useRef();

  useEffect(() => {
    lottieRef.current.setSpeed(0.4); 
  }, []);

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-[#496a5b] px-6 py-20 space-y-16 relative overflow-hidden relative">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-white/30 font-bold text-3xl md:text-6xl text-center"
      >
        Let’s Connect — I’m always up for a chat.
      </motion.h2>

      <Lottie 
      lottieRef={lottieRef}
  animationData={animationData} 
  loop={true} 
  className="absolute top-0 left-0 h-full"
/>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/13132135404"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
        className="rounded-full shadow-md border border-white/20 bg-white/10 px-8 py-5 text-white font-bold text-2xl flex items-center gap-3"
      >
        <FaWhatsapp className="text-green-400" /> WhatsApp Me
      </motion.a>

      {/* Subheading */}
      <motion.h3
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-white/30 font-bold text-3xl md:text-4xl mb-4"
      >
        Or Send a Message
      </motion.h3>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="w-full max-w-2xl flex flex-col space-y-8 rounded-3xl p-10 "
      >
        <input
          className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none text-white placeholder-white/40 text-xl py-3 transition-all duration-300"
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />

        <input
          className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none text-white placeholder-white/40 text-xl py-3 transition-all duration-300"
          type="email"
          name="email"
          placeholder="Your Email Address"
          required
        />

        <input
          className="bg-transparent border-b border-white/20 focus:border-white/50 outline-none text-white placeholder-white/40 text-xl py-3 transition-all duration-300"
          type="tel"
          name="tel"
          placeholder="Your Phone Number"
        />

        <textarea
          className="bg-transparent border border-white/20 rounded-2xl focus:border-white/50 outline-none text-white placeholder-white/40 text-xl py-4 px-6 transition-all duration-300 min-h-[150px]"
          name="message"
          placeholder="Your Message..."
          required
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
          className="bg-white/10 rounded-full px-8 py-5 border border-white/20 text-white font-bold text-xl shadow-lg transition-all"
          type="submit"
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Contact;
