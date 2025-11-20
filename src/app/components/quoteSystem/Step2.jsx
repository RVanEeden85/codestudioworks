import pricing from "../../../../pricing";

const Step2 = ({selectedParents, selectedFeatures, setSelectedFeatures}) => {

      const toggleFeature = (parentId, itemId) => {
    setSelectedFeatures((prev) => {
      const parentGroup = prev[parentId] || {};
      const alreadySelected = parentGroup[itemId];

      // toggle item
      return {
        ...prev,
        [parentId]: {
          ...parentGroup,
          [itemId]: !alreadySelected
        }
      };
    });
  };


    return ( 

        <div className="">
            <h3 className="font-bold text-xl text-white/70">Select the services required for each category</h3>

            {selectedParents.length === 0 && (
        <p className="text-white/40">
          Please select at least one service category in Step 1.
        </p>
      )}

      {selectedParents.map((parentId) => {
        const group = pricing[parentId];

        if (!group) return null;

        return (
          <div key={parentId} className="space-y-4">
            <h4 className="text-white text-2xl font-semibold mt-8">
              {group.title}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {group.items.map((item) => {
                const isActive =
                  selectedFeatures[parentId]?.[item.id] === true;

                return (
                  <button
                    key={item.id}
                    onClick={() => toggleFeature(parentId, item.id)}
                    className={`p-5 rounded-xl border text-left transition-all
                      ${
                        isActive
                          ? "bg-white text-[#314f4e] border-white shadow-lg"
                          : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }
                    `}
                  >
                    <div className="text-xl font-semibold">{item.name}</div>
                      
                      <div className="text-sm">
                        {item.description && item.description.map(item => (
                          
                          <ul key={item}>
                            <li >{item}</li>
                          </ul>

                        ))}
                      </div>

                    <div className="text-white font-bold">{item.prefix} ${item.price} {item.period}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
 
export default Step2;