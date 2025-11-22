const BookConsultationButton = ({setIsConsultationOpen}) => {
    return ( 

        <div className="text-center mt-16">
        <button
            onClick={() => setIsConsultationOpen(true)}
          className="inline-block border border-white/30 bg-white/10 text-white text-md md:text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:bg-white/30 hover:scale-105 transition duration-300 cursor-pointer"
        >
          Book A Consultation
        </button>
      </div>

     );
}
 
export default BookConsultationButton;