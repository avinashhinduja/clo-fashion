import React from "react";
import { useProductStore } from "../../../store/productStore";

export default function PricingFilter() {
  const pricingFilter = useProductStore((s) => s.pricingFilter);
  const togglePricingFilter = useProductStore((s) => s.togglePricingFilter);
  const clearPricingFilters = useProductStore((s) => s.clearPricingFilters);
  const pricingOptions = [
    { label: "Paid", value: 0 },
    { label: "Free", value: 1 },
    { label: "View Only", value: 2 },
  ];

  return (
    <div
      className="flex col"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <div className="flex col" style={{ padding: "1rem" }}>
        <div
          className="flex pricing-filter"
          style={{ justifyContent: "space-between", flexWrap: "wrap" }}
        >
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
                      onChange={() => togglePricingFilter(option.value)}
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
                onClick={clearPricingFilters}
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
