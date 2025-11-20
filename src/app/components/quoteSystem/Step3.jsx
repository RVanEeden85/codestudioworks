import addonsByCategory from "../../../../addons";
import pricing from "../../../../pricing";

const Step3 = ({selectedParents, selectedFeatures, selectedAddons, setSelectedAddons}) => {
     // 1. Start with global addons
  const globalAddons = addonsByCategory.global || [];

  // 2. Collect all addons for selected parent categories
  const parentSpecificAddons = selectedParents.flatMap(
    (parentId) => addonsByCategory[parentId] || []
  );

  // 3. Merge and avoid duplicates by id
  const allAddonsMap = new Map();

  [...globalAddons, ...parentSpecificAddons].forEach((addon) => {
    allAddonsMap.set(addon.id, addon);
  });

  const availableAddons = Array.from(allAddonsMap.values());

  // Same toggle function as before…
  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // UI stays almost the same, just use availableAddons instead of addons:
  return (
    <div className="w-full space-y-8">
      <h3 className="text-white text-3xl font-bold">Optional Add-ons</h3>

      <p className="text-white/70">
        These extras are based on the services you selected earlier.
      </p>

      {availableAddons.length === 0 && (
        <p className="text-white/40 text-sm">
          No extra add-ons available for your current selection.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableAddons.map((addon) => {
          const active = selectedAddons.includes(addon.id);

          return (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`p-5 rounded-xl border text-left transition-all ${
                active
                  ? "bg-white text-[#314f4e] border-white shadow-lg"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <div className="text-xl font-semibold">{addon.label}</div>
              <div className="text-white/50">${addon.price}</div>
            </button>
          );
        })}
      </div>

      {selectedAddons.length === 0 && availableAddons.length > 0 && (
        <p className="text-white/40 text-sm mt-4">
          *You can continue without selecting any add-ons.
        </p>
      )}
    </div>
  );
};

 
export default Step3
;