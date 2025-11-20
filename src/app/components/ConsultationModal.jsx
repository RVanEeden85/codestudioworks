"use client";

const ConsultationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-3">
      <div className="bg-[#314f4e] rounded-3xl w-full max-w-lg p-8 shadow-xl relative animate-fadeIn text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-white mb-6">
          Book a Project Consultation
        </h2>

        <form className="space-y-5">
          <input type="text" placeholder="Your Name" className="w-full p-3 rounded-xl bg-white/10" />
          <input type="email" placeholder="Your Email" className="w-full p-3 rounded-xl bg-white/10" />
          <input type="tel" placeholder="Your Phone Number" className="w-full p-3 rounded-xl bg-white/10" />

          <select className="w-full p-3 rounded-xl bg-white/10">
            <option>Project Type</option>
            <option>Website Development</option>
            <option>Branding & Identity</option>
            <option>Digital Marketing</option>
            <option>Maintenance & Support</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <select className="p-3 rounded-xl bg-white/10">
              <option>Preferred Day</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>

            <select className="p-3 rounded-xl bg-white/10">
              <option>Preferred Time</option>
              <option>10:00 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
              <option>4:00 PM</option>
            </select>
          </div>

          <textarea placeholder="Tell me more about your project..." className="w-full p-3 rounded-xl bg-white/10 h-28"></textarea>

          <button className="w-full cursor-pointer bg-white/20 text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#2a4343] transition-all duration-500">
            Send Request
          </button>
        </form>

      </div>
    </div>
  );
};

export default ConsultationModal;
