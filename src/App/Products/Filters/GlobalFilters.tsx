import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductStore } from "../../../store/productStore";

const pricingOptions = [
  { label: "Free", value: 0 },
  { label: "View Only", value: 1 },
  { label: "Paid", value: 2 },
];

export default function GlobalFilters() {
  const [params, setParams] = useSearchParams();

  const searchQuery = useProductStore((s) => s.searchQuery);
  const setSearchQuery = useProductStore((s) => s.setSearchQuery);
  const pricingFilter = useProductStore((s) => s.pricingFilter);
  const setPricingFilter = useProductStore((s) => s.setPricingFilter);
  const togglePricingFilter = useProductStore((s) => s.togglePricingFilter);
  const clearPricingFilters = useProductStore((s) => s.clearPricingFilters);

  // Hydrate from URL
  useEffect(() => {
    const q = params.get("q") || "";
    const pricing =
      params
        .get("pricing")
        ?.split(",")
        .map(Number)
        .filter((v) => !isNaN(v)) || [];
    setSearchQuery(q);
    setPricingFilter(pricing);
  }, []);

  const updateURL = (query: string, pricing: number[]) => {
    const newParams = new URLSearchParams();
    if (query) newParams.set("q", query);
    if (pricing.length > 0) newParams.set("pricing", pricing.join(","));
    setParams(newParams, { replace: true });
  };

  return (
    <div style={{ padding: "1rem", paddingBottom: "0px" }}>
      <div style={{ position: "relative" }}>
        <div
          className="flex col"
          style={{ padding: "0.75rem", paddingBottom: "0px" }}
        >
          <input
            type="text"
            placeholder="Find the items you're looking for"
            value={searchQuery}
            onChange={(e) => {
              const q = e.target.value;
              setSearchQuery(q);
              updateURL(q, pricingFilter);
            }}
            className="search"
            style={{
              padding: "0.5rem",
              marginBottom: "1rem",
              width: "99%",
              fontSize: "1rem",
              border: "1px solid grey",
              borderRadius: "6px",
              background: "#000000",
              color: "grey",
            }}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>

      <div
        className="flex col"
        style={{ padding: "0.75rem", paddingBottom: "0px" }}
      >
        <div
          className="flex pricing-filter"
          style={{ justifyContent: "space-between", flexWrap: "wrap" }}
        >
          {/* Filter Options */}
          <div
            className="flex-container"
            style={{
              color: "grey",
              marginBottom: "0.5rem",
              flexDirection: "row",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Pricing Option
            </div>
            <div className="flex-container">
              {pricingOptions.map((option) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <label
                    key={option.value}
                    style={{ display: "block", marginBottom: "0.25rem" }}
                  >
                    <input
                      type="checkbox"
                      checked={pricingFilter.includes(option.value)}
                      onChange={() => {
                        const updated = togglePricingFilter(option.value); // gets new state
                        updateURL(searchQuery, updated); // updates URL
                      }}
                      style={{ marginRight: "0.5rem" }}
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            {pricingFilter.length > 0 && (
              <button
                onClick={() => {
                  clearPricingFilters();
                  updateURL(searchQuery, []);
                }}
                aria-label="Reset"
                style={{
                  marginTop: "0.5rem",
                  background: "none",
                  border: "1px solid grey",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  color: "grey",
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
