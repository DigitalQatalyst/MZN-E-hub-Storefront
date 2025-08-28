import Card from "@component/Card";
import { List, CheckboxLabel, ServiceTypeTitle, ShowingText } from "../styles";

type CategoryFilterKeys = 
  | "businessOperationsFinancing"
  | "projectSpecializedFinancing"
  | "growthExpansionFinancing"
  | "loanManagementAdjustments"
  | "businessAssetFinancing"
  | "investmentEquityFinancing";

interface CategoriesFilters {
  businessOperationsFinancing: boolean;
  projectSpecializedFinancing: boolean;
  growthExpansionFinancing: boolean;
  loanManagementAdjustments: boolean;
  businessAssetFinancing: boolean;
  investmentEquityFinancing: boolean;
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
              id="business-operations-financing"
              title="Business Operations Financing"
              checked={categoriesFilters.businessOperationsFinancing}
              onChange={() => handleCategoriesChange("businessOperationsFinancing")}
            />
            <label htmlFor="business-operations-financing">Business Operations Financing</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="project-specialized-financing"
              title="Project & Specialized Financing"
              checked={categoriesFilters.projectSpecializedFinancing}
              onChange={() => handleCategoriesChange("projectSpecializedFinancing")}
            />
            <label htmlFor="project-specialized-financing">Project & Specialized Financing</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="growth-expansion-financing"
              title="Growth & Expansion Financing"
              checked={categoriesFilters.growthExpansionFinancing}
              onChange={() => handleCategoriesChange("growthExpansionFinancing")}
            />
            <label htmlFor="growth-expansion-financing">Growth & Expansion Financing</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="loan-management-adjustments"
              title="Loan Management & Adjustments"
              checked={categoriesFilters.loanManagementAdjustments}
              onChange={() => handleCategoriesChange("loanManagementAdjustments")}
            />
            <label htmlFor="loan-management-adjustments">Loan Management & Adjustments</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="business-asset-financing"
              title="Business Asset Financing"
              checked={categoriesFilters.businessAssetFinancing}
              onChange={() => handleCategoriesChange("businessAssetFinancing")}
            />
            <label htmlFor="business-asset-financing">Business Asset Financing</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="investment-equity-financing"
              title="Investment & Equity Financing"
              checked={categoriesFilters.investmentEquityFinancing}
              onChange={() => handleCategoriesChange("investmentEquityFinancing")}
            />
            <label htmlFor="investment-equity-financing">Investment & Equity Financing</label>
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
            <label htmlFor="pay-per-service">Pay Per Service</label>
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
            <label htmlFor="government-subsidised">Government sponsored</label>
          </CheckboxLabel>
        </List>
        <div style={{ width: "236px", height: "1px", background: "#D8E0E9" }} />
        {/* Adding padding-bottom to create space at the bottom when no service is available */}
        <div style={{ paddingBottom: '5rem' }} />
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