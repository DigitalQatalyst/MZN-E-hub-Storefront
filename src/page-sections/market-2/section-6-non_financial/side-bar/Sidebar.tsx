import Card from "@component/Card";
import { List, CheckboxLabel, ServiceTypeTitle, ShowingText } from "../styles";

type CategoryFilterKeys =
  | "eventsAndNetworking"
  | "partnershipsAndOpportunities"
  | "academyAndTraining"
  | "operationalAdvisory"
  | "proximityIncubators"
  | "incentivesListing"
  | "digitalSolutions"
  | "exportAndTradeFacilitation"
  | "legalComplianceAndLicensing";

interface CategoriesFilters {
  eventsAndNetworking: boolean;
  partnershipsAndOpportunities: boolean;
  academyAndTraining: boolean;
  operationalAdvisory: boolean;
  proximityIncubators: boolean;
  incentivesListing: boolean;
  digitalSolutions: boolean;
  exportAndTradeFacilitation: boolean;
  legalComplianceAndLicensing: boolean;
}

interface BusinessStageFilters {
  conception: boolean;
  growth: boolean;
  maturity: boolean;
  restructuring: boolean;
  other: boolean;
}

interface ProvidedByFilters {
  adgm: boolean;
  khalifaFund: boolean;
  hub71: boolean;
  adSmeHub: boolean;
  other: boolean;
}

interface PricingModelFilters {
  free: boolean;
  subscriptionBased: boolean;
  payPerService: boolean;
  oneTimeFee: boolean;
  governmentSubsidised: boolean;
}

interface SidebarProps {
  categoriesFilters: CategoriesFilters;
  setCategoriesFilters: React.Dispatch<React.SetStateAction<CategoriesFilters>>;
  businessStageFilters: BusinessStageFilters;
  setBusinessStageFilters: React.Dispatch<React.SetStateAction<BusinessStageFilters>>;
  providedByFilters: ProvidedByFilters;
  setProvidedByFilters: React.Dispatch<React.SetStateAction<ProvidedByFilters>>;
  pricingModelFilters: PricingModelFilters;
  setPricingModelFilters: React.Dispatch<React.SetStateAction<PricingModelFilters>>;
  handleCategoriesChange: (category: CategoryFilterKeys) => void;
  handleBusinessStageChange: (stage: keyof BusinessStageFilters) => void;
  handleProvidedByChange: (provider: keyof ProvidedByFilters) => void;
  handlePricingModelChange: (model: keyof PricingModelFilters) => void;
  totalItems: number;
  totalFilteredItems: number;
  currentPage: number;
  productsPerPage: number;
  areFiltersApplied: () => boolean;
}

export default function Sidebar({
  categoriesFilters,
  setCategoriesFilters,
  businessStageFilters,
  setBusinessStageFilters,
  providedByFilters,
  setProvidedByFilters,
  pricingModelFilters,
  setPricingModelFilters,
  handleCategoriesChange,
  handleBusinessStageChange,
  handleProvidedByChange,
  handlePricingModelChange,
  totalItems,
  totalFilteredItems,
  currentPage,
  productsPerPage,
  areFiltersApplied,
}: SidebarProps) {
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
        <List>
          <ServiceTypeTitle>Categories :</ServiceTypeTitle>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="events-and-networking"
              title="Events & Networking"
              checked={categoriesFilters.eventsAndNetworking}
              onChange={() => handleCategoriesChange("eventsAndNetworking")}
            />
            <label htmlFor="events-and-networking">Events & Networking</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="partnerships-and-opportunities"
              title="Partnerships & Opportunities"
              checked={categoriesFilters.partnershipsAndOpportunities}
              onChange={() => handleCategoriesChange("partnershipsAndOpportunities")}
            />
            <label htmlFor="partnerships-and-opportunities">Partnerships & Opportunities</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="academy-and-training"
              title="Academy & Training"
              checked={categoriesFilters.academyAndTraining}
              onChange={() => handleCategoriesChange("academyAndTraining")}
            />
            <label htmlFor="academy-and-training">Academy & Training</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="operational-advisory"
              title="Operational Advisory"
              checked={categoriesFilters.operationalAdvisory}
              onChange={() => handleCategoriesChange("operationalAdvisory")}
            />
            <label htmlFor="operational-advisory">Operational Advisory</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="proximity-incubators"
              title="Proximity Incubators"
              checked={categoriesFilters.proximityIncubators}
              onChange={() => handleCategoriesChange("proximityIncubators")}
            />
            <label htmlFor="proximity-incubators">Proximity Incubators</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="incentives-listing"
              title="Incentives Listing"
              checked={categoriesFilters.incentivesListing}
              onChange={() => handleCategoriesChange("incentivesListing")}
            />
            <label htmlFor="incentives-listing">Incentives Listing</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="digital-solutions"
              title="Digital Solutions"
              checked={categoriesFilters.digitalSolutions}
              onChange={() => handleCategoriesChange("digitalSolutions")}
            />
            <label htmlFor="digital-solutions">Digital Solutions</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="export-and-trade-facilitation"
              title="Export & Trade Facilitation"
              checked={categoriesFilters.exportAndTradeFacilitation}
              onChange={() => handleCategoriesChange("exportAndTradeFacilitation")}
            />
            <label htmlFor="export-and-trade-facilitation">Export & Trade Facilitation</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="legal-compliance-and-licensing"
              title="Legal, Compliance & Licensing"
              checked={categoriesFilters.legalComplianceAndLicensing}
              onChange={() => handleCategoriesChange("legalComplianceAndLicensing")}
            />
            <label htmlFor="legal-compliance-and-licensing">Legal, Compliance & Licensing</label>
          </CheckboxLabel>
        </List>
        <div style={{ width: "236px", height: "1px", background: "#D8E0E9" }} />

        <List>
          <ServiceTypeTitle>Business Stage:</ServiceTypeTitle>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="conception"
              checked={businessStageFilters.conception}
              onChange={() => handleBusinessStageChange("conception")}
            />
            <label htmlFor="conception">Inception</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="growth"
              title="Growth"
              checked={businessStageFilters.growth}
              onChange={() => handleBusinessStageChange("growth")}
            />
            <label htmlFor="growth">Growth</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="maturity"
              checked={businessStageFilters.maturity}
              onChange={() => handleBusinessStageChange("maturity")}
            />
            <label htmlFor="maturity">Maturity</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="restructuring"
              title="Restructuring"
              checked={businessStageFilters.restructuring}
              onChange={() => handleBusinessStageChange("restructuring")}
            />
            <label htmlFor="restructuring">Restructuring</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="other"
              checked={businessStageFilters.other}
              onChange={() => handleBusinessStageChange("other")}
            />
            <label htmlFor="other">Other</label>
          </CheckboxLabel>
        </List>
        <div style={{ width: "236px", height: "1px", background: "#D8E0E9" }} />

        <List>
          <ServiceTypeTitle>Provided By:</ServiceTypeTitle>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="adgm"
              title="ADGM"
              checked={providedByFilters.adgm}
              onChange={() => handleProvidedByChange("adgm")}
            />
            <label htmlFor="adgm">ADGM</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="khalifa-fund"
              title="Khalifa Fund"
              checked={providedByFilters.khalifaFund}
              onChange={() => handleProvidedByChange("khalifaFund")}
            />
            <label htmlFor="khalifa-fund">Khalifa Fund</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="hub71"
              checked={providedByFilters.hub71}
              onChange={() => handleProvidedByChange("hub71")}
            />
            <label htmlFor="hub71">Hub 71</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="ad-sme-hub"
              title="AD SME Hub"
              checked={providedByFilters.adSmeHub}
              onChange={() => handleProvidedByChange("adSmeHub")}
            />
            <label htmlFor="ad-sme-hub">AD SME Hub</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="other-checkbox"
              title="Other"
              checked={providedByFilters.other}
              onChange={() => handleProvidedByChange("other")}
            />
            <label htmlFor="other-checkbox">Other</label>
          </CheckboxLabel>
        </List>
        <div style={{ width: "236px", height: "1px", background: "#D8E0E9" }} />

        <List>
          <ServiceTypeTitle>Pricing Model:</ServiceTypeTitle>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="free"
              title="Free"
              checked={pricingModelFilters.free}
              onChange={() => handlePricingModelChange("free")}
            />
            <label htmlFor="free">Free</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="subscription-based"
              title="Subscription-Based"
              checked={pricingModelFilters.subscriptionBased}
              onChange={() => handlePricingModelChange("subscriptionBased")}
            />
            <label htmlFor="subscription-based">Subscription-based</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="pay-per-service"
              title="Pay Per Service"
              checked={pricingModelFilters.payPerService}
              onChange={() => handlePricingModelChange("payPerService")}
            />
            <label htmlFor="pay-per-service">Pay per service</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="one-time-fee"
              title="One-Time Fee"
              checked={pricingModelFilters.oneTimeFee}
              onChange={() => handlePricingModelChange("oneTimeFee")}
            />
            <label htmlFor="one-time-fee">One time fee</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="government-subsidised"
              title="Government Subsidised"
              checked={pricingModelFilters.governmentSubsidised}
              onChange={() => handlePricingModelChange("governmentSubsidised")}
            />
            <label htmlFor="government-subsidised">Government sponsered </label>
          </CheckboxLabel>
        </List>
        <div style={{ width: "236px", height: "1px", background: "#D8E0E9" }} />
        <div style={{ paddingBottom: "2rem" }} />
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