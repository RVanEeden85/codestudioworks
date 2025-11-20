'use client'

import { motion } from "framer-motion";
import { FaHandshake, FaFileInvoiceDollar, FaRocket, FaCode, FaSyncAlt, FaCheckCircle, FaComments } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../../../public/lottie/leaf-dev.json"
import { useRef, useEffect } from "react";
import BookConsultationButton from "./BookConsultationButton";

const steps = [
  { icon: <FaHandshake />, title: "Book a Free Consultation", text: "Schedule a personal session to discuss your ideas and goals." },
  { icon: <FaFileInvoiceDollar />, title: "Receive a Project Scope & Quote", text: "Get a clear proposal outlining deliverables, timelines, and pricing." },
  { icon: <FaComments />, title: "Kickoff Meeting", text: "Once you approve, we’ll hold a quick meeting to confirm everything." },
  { icon: <FaCode />, title: "Development Begins", text: "Your project comes to life — with regular updates from me." },
  { icon: <FaSyncAlt />, title: "Review & Feedback Cycles", text: "You’ll get two rounds to review and request changes." },
  { icon: <FaCheckCircle />, title: "Final Touches & Optimisation", text: "I refine visuals, optimise performance, and prepare for launch." },
  { icon: <FaRocket />, title: "Launch & Go Live", text: "Once approved, your project is published and ready for the world!" },
];

export default function Process({setIsConsultationOpen}) {

  const lottieRef = useRef();

  useEffect(() => {
    lottieRef.current.setSpeed(0.4); 
  }, []);

  return (
    <section id="process" className="min-h-screen bg-[#314f4e] text-white py-20 px-8 relative space-y-5 flex flex-col items-center justify-center ">
      <div className="xl:max-w-5xl 2xl:max-w-6xl mx-auto text-center xl:mb-10 2xl:mb-16">
        <h2 className="text-white/30 font-bold text-3xl xl:text-5xl 2xl:text-7xl xl:mb-6 2xl:mb-12">Simple and Transparent Process</h2>
        <p className="text-lg text-gray-200">
          From idea to launch — here’s exactly how we’ll bring your project to life.
        </p>
      </div>

      <Lottie 
      lottieRef={lottieRef}
  animationData={animationData} 
  loop={true} 
  className="absolute top-0 right-0 opacity-10 rotate-20"
/>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 xl:gap-5 2xl:gap-8 xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md p-3 xl:p-4 2xl:p-6 rounded-xl border border-white/20 hover:bg-white/20 transition space-y-2 relative"
          >
            <div className="absolute top-2 right-2 text-white/20 text-3xl xl:text-3xl 2xl:text-7xl xl:mb-2 2xl:mb-4 flex justify-center">{step.icon}</div>
            <h3 className="font-semibold xl:text-lg 2xl:text-xl mb-0 2xl:mb-2">{step.title}</h3>
            <p className="text-gray-200 text-sm leading-relaxed">{step.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Consultation Button */}
      <BookConsultationButton setIsConsultationOpen={setIsConsultationOpen} />

      
    </section>
  );
}
