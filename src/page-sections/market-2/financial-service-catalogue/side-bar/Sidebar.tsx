import React, { useMemo } from "react";
import Card from "@component/Card";
import { List, CheckboxLabel, ServiceTypeTitle, ShowingText } from "../styles";
import LoadingSpinner from "@component/LoadingSpinner/LoadingSpinner";

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
  loading: boolean;
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
  loading,
}: SidebarProps) {
  // Sort facets to prioritize those with "category" in the name
  const sortedFacets = useMemo(() => {
    const categoryFacets = facets.filter(facet => facet.name.toLowerCase().includes("category"));
    const otherFacets = facets.filter(facet => !facet.name.toLowerCase().includes("category"));
    return [...categoryFacets, ...otherFacets];
  }, [facets]);

  return (
    <>
      <Card
        elevation={0}
        style={{
          border: 0,
          height: "94%",
          borderRadius: "3px",
          padding: "1rem 2rem",
          backgroundColor: "#FFFFFF",
        }}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          sortedFacets.map((facet) => (
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
          {Math.min(currentPage * productsPerPage, areFiltersApplied() ? totalFilteredItems : totalItems)} of {areFiltersApplied() ? totalFilteredItems : totalItems} Services
        </ShowingText>
      )}
    </>
  );
}