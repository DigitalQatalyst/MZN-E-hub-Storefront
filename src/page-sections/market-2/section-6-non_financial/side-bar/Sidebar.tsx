import Card from "@component/Card";
import { List, CheckboxLabel, ServiceTypeTitle, ShowingText } from "../styles";

interface CategoriesFilters {
  legalCompliance: {
    regulatoryCompliance: boolean;
    legalAdvisory: boolean;
    businessLicensing: boolean;
  };
  incentivesListing: boolean;
  proximityIncubators: boolean;
}

interface BusinessStageFilters {
  inception: boolean;
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
  handleCategoriesChange: (category: string, subcategory?: string) => void;
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
          height: "95%",
          borderRadius: "3px",
          padding: "1rem 2rem",
          backgroundColor: "#FFFFFF"
        }}
      >
        <List>
          <ServiceTypeTitle>Categories :</ServiceTypeTitle>
          <CheckboxLabel style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="legal-compliance"
              title="Legal, Compliance & Lic..."
              checked={
                categoriesFilters.legalCompliance.regulatoryCompliance ||
                categoriesFilters.legalCompliance.legalAdvisory ||
                categoriesFilters.legalCompliance.businessLicensing
              }
              onChange={() => {
                const allChecked = !(
                  categoriesFilters.legalCompliance.regulatoryCompliance ||
                  categoriesFilters.legalCompliance.legalAdvisory ||
                  categoriesFilters.legalCompliance.businessLicensing
                );
                setCategoriesFilters((prev) => ({
                  ...prev,
                  legalCompliance: {
                    regulatoryCompliance: allChecked,
                    legalAdvisory: allChecked,
                    businessLicensing: allChecked,
                  },
                }));
              }}
            />
            <label htmlFor="legal-compliance" style={{ marginRight: '0.5rem' }}>Legal, Compliance & Lic...</label>
            <img 
              src="/assets/images/non_financial_marketplace/chevron-down.svg" 
              alt="dropdown" 
              style={{ verticalAlign: 'middle' }} 
            />
          </CheckboxLabel>
          <CheckboxLabel style={{ marginLeft: '1rem' }}>
            <input
              type="checkbox"
              id="regulatory-compliance"
              title="Regulatory Compliance"
              checked={categoriesFilters.legalCompliance.regulatoryCompliance}
              onChange={() => handleCategoriesChange("legalCompliance", "regulatoryCompliance")}
            />
            <label htmlFor="regulatory-compliance">Regulatory Compliance</label>
          </CheckboxLabel>
          <CheckboxLabel style={{ marginLeft: '1rem' }}>
            <input
              type="checkbox"
              id="legal-advisory"
              title="Legal Advisory"
              checked={categoriesFilters.legalCompliance.legalAdvisory}
              onChange={() => handleCategoriesChange("legalCompliance", "legalAdvisory")}
            />
            <label htmlFor="legal-advisory">Legal Advisory</label>
          </CheckboxLabel>
          <CheckboxLabel style={{ marginLeft: '1rem' }}>
            <input
              type="checkbox"
              id="business-licensing"
              title="Business Licensing & Per..."
              checked={categoriesFilters.legalCompliance.businessLicensing}
              onChange={() => handleCategoriesChange("legalCompliance", "businessLicensing")}
            />
            <label htmlFor="business-licensing">Business Licensing & Per...</label>
          </CheckboxLabel>

          <CheckboxLabel style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="incentives-listing"
              title="Incentives Listing"
              checked={categoriesFilters.incentivesListing}
              onChange={() => handleCategoriesChange("incentivesListing")}
            />
            <label htmlFor="incentives-listing" style={{ marginRight: '0.5rem' }}>Incentives Listing</label>
            <img 
              src="/assets/images/non_financial_marketplace/chevron-down.svg" 
              alt="dropdown" 
              style={{ verticalAlign: 'middle' }} 
            />
          </CheckboxLabel>

          <CheckboxLabel style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="proximity-incubators"
              title="Proximity Incubators"
              checked={categoriesFilters.proximityIncubators}
              onChange={() => handleCategoriesChange("proximityIncubators")}
            />
            <label htmlFor="proximity-incubators" style={{ marginRight: '0.5rem' }}>Proximity Incubators</label>
            <img 
              src="/assets/images/non_financial_marketplace/chevron-down.svg" 
              alt="dropdown" 
              style={{ verticalAlign: 'middle' }} 
            />
          </CheckboxLabel>
        </List>

        <List>
          <ServiceTypeTitle>Business Stage :</ServiceTypeTitle>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="inception"
              checked={businessStageFilters.inception}
              onChange={() => handleBusinessStageChange("inception")}
            />
            <label htmlFor="inception">Inception</label>
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

        <List>
          <ServiceTypeTitle>Provided By :</ServiceTypeTitle>
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

        <List>
          <ServiceTypeTitle>Pricing Model :</ServiceTypeTitle>
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
            <label htmlFor="subscription-based">Subscription-Based</label>
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
            <label htmlFor="one-time-fee">One-Time Fee</label>
          </CheckboxLabel>
          <CheckboxLabel>
            <input
              type="checkbox"
              id="government-subsidised"
              title="Government Subsidised"
              checked={pricingModelFilters.governmentSubsidised}
              onChange={() => handlePricingModelChange("governmentSubsidised")}
            />
            <label htmlFor="government-subsidised">Government Subsidised</label>
          </CheckboxLabel>
        </List>
        {/* Adding padding-bottom to create space at the bottom when no service is available */}
        <div style={{ paddingBottom: '2rem' }} />
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