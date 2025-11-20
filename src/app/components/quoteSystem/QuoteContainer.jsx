"use client"

import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const TOTAL_STEPS = 6;

const QuoteContainer = () => {

    const parentServices = [
  { id: "branding", label: "Branding & Visual Identity" },
  { id: "development", label: "Website & App Development" },
  { id: "marketing", label: "Digital Marketing" },
  { id: "maintenance", label: "Web Maintenance" },
  { id: "itsupport", label: "IT Support"},
];

    const [step, setStep] = useState(1);
    const [selectedParents, setSelectedParents] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState({});
    const [selectedAddons, setSelectedAddons] = useState([])


    const goNext = () => {
        setStep((prev) => (prev < TOTAL_STEPS ? prev + 1 : prev))
    }

    const goBack = () => {
        setStep((prev) => (prev > 1 ? prev -1 : prev))
    }

    

    const renderStepContent = () => {
        switch (step) {
            case 1 :
                return <Step1 parentServices={parentServices} selectedParents={selectedParents} setSelectedParents={setSelectedParents} />;
            case 2: 
                return <Step2 selectedParents={selectedParents} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} />;
            case 3 :
                return <Step3 selectedParents={selectedParents} selectedFeatures={selectedFeatures} selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons} />;
            case 4 : 
                return <Step4 />;
            default:
                return null;
        }   
    }


    return ( 

        <div className="border border-white/30 rounded-3xl shadow-md bg-white/10 p-10 min-h-[600px] min-w-[900px] relative">

            {/* Indicate Steps */}
            <div className="absolute top-5 right-5 text-white/60 text-sm border border-white/20 px-2 rounded-full">
                Step {step} of {TOTAL_STEPS}
            </div>


            {/* Step Content */}
            <div className="">
                {renderStepContent()}
            </div>


            {/* Buttons Bar */}
            <div className="absolute bottom-2 right-2 flex gap-3">

            {/* Back Button */}
            <button onClick={goBack} disabled={step === 1} type="button"className={`px-4 py-2 rounded-full border text-sm font-semibold ${
              step === 1
                ? "border-white/10 text-white/30 cursor-not-allowed"
                : "border-white/40 text-white hover:bg-white/10"
            }`}
          >
            Back
          </button>

          {/* Next Button */}
          <button type="button" onClick={goNext} disabled={step === TOTAL_STEPS}
            className={`px-6 py-2 rounded-full text-sm font-semibold ${
              step === TOTAL_STEPS
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-white text-[#314f4e] hover:bg-slate-100"
            }`}
          >
            {step === TOTAL_STEPS - 1 ? "Review" : step === TOTAL_STEPS ? "Done" : "Next"}
          </button>
            </div>



        </div>

     );
}
 
export default QuoteContainer;