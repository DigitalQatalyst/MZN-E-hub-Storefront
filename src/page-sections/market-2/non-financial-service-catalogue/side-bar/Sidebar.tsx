import Card from "@component/Card";
import { List, CheckboxLabel, ServiceTypeTitle, ShowingText } from "../styles";
import { useState, useEffect } from "react";

interface FacetValue {
  id: string;
  name: string;
  code: string;
}

interface Facet {
  id: string;
  name: string;
  code: string;
  values: FacetValue[];
}

interface FilterState {
  [facetCode: string]: { [valueCode: string]: boolean };
}

interface SidebarProps {
  facets: Facet[];
  filterStates: FilterState;
  setFilterStates: React.Dispatch<React.SetStateAction<FilterState>>;
  handleFilterChange: (facetCode: string, valueCode: string) => void;
  totalItems: number;
  totalFilteredItems: number;
  currentPage: number;
  productsPerPage: number;
  areFiltersApplied: () => boolean;
}

export default function Sidebar({
  facets,
  filterStates,
  setFilterStates,
  handleFilterChange,
  totalItems,
  totalFilteredItems,
  currentPage,
  productsPerPage,
  areFiltersApplied,
}: SidebarProps) {
  const [loading, setLoading] = useState(true);

  // Simulate loading state (facets are fetched in parent component)
  useEffect(() => {
    if (facets.length > 0) {
      setLoading(false);
    }
  }, [facets]);

  return (
    <>
      <Card
        elevation={0}
        style={{
          border: 0,
          height: "auto",
          borderRadius: "3px",
          padding: "1rem 2rem",
          backgroundColor: "#FFFFFF",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              fontSize: "1rem",
              color: "#555",
            }}
          >
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #002180",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        ) : (
          facets.map((facet) => (
            <div key={facet.id}>
              <List>
                <ServiceTypeTitle>{facet.name}</ServiceTypeTitle>
                {facet.values.map((value) => (
                  <CheckboxLabel key={value.id}>
                    <input
                      type="checkbox"
                      id={value.code}
                      title={value.name}
                      checked={filterStates[facet.code]?.[value.code] || false}
                      onChange={() => handleFilterChange(facet.code, value.code)}
                    />
                    <label htmlFor={value.code}>{value.name}</label>
                  </CheckboxLabel>
                ))}
              </List>
              <div style={{ width: "236px", height: "1px", background: "#D8E0E9" }} />
            </div>
          ))
        )}
        <div style={{ paddingBottom: "5rem" }} />
      </Card>
      {(areFiltersApplied() ? totalFilteredItems : totalItems) > 0 && (
        <ShowingText>
          Showing {(currentPage - 1) * productsPerPage + 1}-
          {Math.min(currentPage * productsPerPage, areFiltersApplied() ? totalFilteredItems : totalItems)} of{" "}
          {areFiltersApplied() ? totalFilteredItems : totalItems} Services
        </ShowingText>
      )}
    </>
  );
}