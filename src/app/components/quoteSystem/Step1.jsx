const Step1 = ({parentServices, selectedParents, setSelectedParents}) => {

    const toggleParent = (id) => {
  setSelectedParents((prev) =>
    prev.includes(id)
      ? prev.filter((p) => p !== id)
      : [...prev, id]
  );
};

    return ( 

        <div className="space-y-5">
            <h3 className="font-bold text-xl text-white/70">What service categories do you need for your project?</h3>
            <p className="text-white/80 italic">Select all that apply – Select at least one</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parentServices.map((service) => {
          const isActive = selectedParents.includes(service.id);

          return (
            <button
              key={service.id}
              onClick={() => toggleParent(service.id)}
              className={`p-6 rounded-2xl text-left transition-all border 
              ${isActive 
                ? "bg-white text-[#314f4e] border-white shadow-lg scale-[1.02]" 
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <span className="text-xl font-semibold">{service.label}</span>
            </button>
          );
        })}
      </div>

      {selectedParents.length === 0 && (
        <p className="text-white/40 text-sm mt-4">
          *Select at least one option to proceed.
        </p>
      )}
    </div>





     );
}
 
export default Step1;