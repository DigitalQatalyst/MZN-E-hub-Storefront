"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { FaBuilding, FaLightbulb, FaRocket, FaChartLine, FaGlobe, FaSyncAlt, FaShoppingBag, FaUsers, FaDollarSign, FaBalanceScale } from 'react-icons/fa';
import { InteractionStatus, } from "@azure/msal-browser";
import { useMsal } from '@azure/msal-react';

interface FormData {
  businessStatus: 'already' | 'idea' | '';
  businessStage: 'startup' | 'scaleup' | 'expansion' | 'transformation' | '';
  businessType: 'technology' | 'retail' | 'services' | 'other' | '';
  industryOther: string;
  keyChallenges: string[];
  goals: string[];
  goalsOther: string;
  teamSize: string;
  revenueModel: string;
  revenueStatus: 'pre' | 'early' | 'growing' | 'established' | '';
  marketFocus: 'local' | 'national' | 'international' | 'global' | '';
}

type OnboardingFormsProps = {
  onSaveAndContinueLater: () => void;
};

const SelectableCard: React.FC<{
  selected: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ selected, icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    style={{
      border: selected ? '2px solid #0047FF' : '1px solid #ccc',
      borderRadius: 12,
      backgroundColor: selected ? '#E6F0FF' : '#fff',
      padding: 20,
      cursor: 'pointer',
      boxShadow: selected ? '0px 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 24, marginBottom: 8, color: "black" }}>{icon}</div>
    <strong style={{color: "black"}}>{title}</strong>
    <p style={{ color: '#777', marginTop: 4 }}>{description}</p>
  </div>
);

const STORAGE_KEY = "onboarding_form_data";

const OnboardingForms: React.FC<OnboardingFormsProps> = ({ onSaveAndContinueLater }) => {
  const { instance, inProgress } = useMsal();
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [formData, setFormData] = useState<FormData>({
    businessStatus: '',
    businessStage: '',
    businessType: '',
    industryOther: '',
    keyChallenges: [],
    goals: [],
    goalsOther: '',
    teamSize: '',
    revenueModel: '',
    revenueStatus: '',
    marketFocus: '',
  });
  const [isMsalInitialized, setIsMsalInitialized] = useState(false);

  const handleDashboardRedirect = () => {
    window.location.href = '/dashboard'; // Adjust the URL as needed
  }

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Save data to localStorage on formData change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Clear saved data on final step submission
  const handleFinish = () => {
    // your submission logic here
    localStorage.removeItem(STORAGE_KEY);
    alert("Onboarding complete!");
  };

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      setIsMsalInitialized(true);
    }
  }, [inProgress]);

  // Safely get account info only when initialized
  const activeAccount = useMemo(() => {
    if (!isMsalInitialized) return null;
    try {
      return instance.getActiveAccount();
    } catch (error) {
      console.warn("Error getting active account:", error);
      return null;
    }
  }, [instance, isMsalInitialized]);

  const userEmail = activeAccount?.username || activeAccount?.idTokenClaims?.email || "";
  const userName = activeAccount?.name || activeAccount?.idTokenClaims?.name || "";

  // Show loading while MSAL initializes
  if (!isMsalInitialized) {
    return <div>Loading...</div>;
  }

  const toggleArrayValue = (key: keyof FormData, value: string) => {
    const current = formData[key] as string[];
    setFormData({
      ...formData,
      [key]: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
    });
  };

  const progressPercent = Math.round((step / totalSteps) * 100);
  const steps = [
    'Business Status',
    'Business Stage',
    'Business Type',
    'Key Challenges',
    'Goals',
    'Business Model',
    'Complete',
  ];

  const handleNext = () => step < totalSteps && setStep(step + 1);
  const handlePrevious = () => step > 1 && setStep(step - 1);
  const handleSave = () => alert('Progress saved!');

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ backgroundColor: '#0047FF', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px 8px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Step {step} of {totalSteps}</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div style={{ height: 6, background: '#3366FF', marginTop: 8, borderRadius: 4 }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#fff' }} />
        </div>
        <div style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>{steps[step - 1]}</div>
      </div>

      <div style={{ padding: 24, background: '#fff', border: '1px solid #eee', borderTop: 0 }}>
        {step === 1 && (
          <>
            <h2>Select Your Current Business Status</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SelectableCard selected={formData.businessStatus === 'already'} icon={<FaBuilding />} title="Already Have A Business" description="If you already have a business, onboard your company and start leveraging the platform’s ecosystem today." onClick={() => setFormData({ ...formData, businessStatus: 'already' })} />
              <SelectableCard selected={formData.businessStatus === 'idea'} icon={<FaLightbulb />} title="I have an Idea" description="If you’re in the ideation phase, join now and incorporate your startup to benefit from our global ecosystem." onClick={() => setFormData({ ...formData, businessStatus: 'idea' })} />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>What’s your Business Stage?</h2>
            <p style={{ color: '#777' }}>Help us understand where you are in your journey</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { key: 'startup', icon: <FaRocket />, title: 'Start-up', description: 'Early-stage business with initial traction' },
                { key: 'scaleup', icon: <FaChartLine />, title: 'Scale up', description: 'Growing business with proven model' },
                { key: 'expansion', icon: <FaGlobe />, title: 'Expansion', description: 'Established business seeking new markets' },
                { key: 'transformation', icon: <FaSyncAlt />, title: 'Transformation', description: 'Mature business undergoing strategic change' },
              ].map(({ key, icon, title, description }) => (
                <SelectableCard key={key} selected={formData.businessStage === key} icon={icon} title={title} description={description} onClick={() => setFormData({ ...formData, businessStage: key as FormData['businessStage'] })} />
              ))}
            </div>
            <div style={{ marginTop: 20, backgroundColor: '#EEF4FF', padding: 12, borderRadius: 6, color: '#0047FF' }}>
              <strong>AI-Driven Business Insights</strong>
              <p style={{ margin: 0 }}>Get tailored recommendations and resources based on your business type.</p>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>What type of Business?</h2>
            <p style={{ color: '#777' }}>Select the category that best describes your business</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { key: 'technology', icon: <FaLightbulb />, title: 'Technology', description: 'Software, hardware, digital services' },
                { key: 'retail', icon: <FaShoppingBag />, title: 'Retail', description: 'E-commerce, physical stores, consumer goods' },
                { key: 'services', icon: <FaUsers />, title: 'Services', description: 'Consulting, professional services, B2B' },
                { key: 'other', icon: <strong>+</strong>, title: 'Other', description: 'Specify your industry' },
              ].map(({ key, icon, title, description }) => (
                <SelectableCard key={key} selected={formData.businessType === key} icon={icon} title={title} description={description} onClick={() => setFormData({ ...formData, businessType: key as FormData['businessType'] })} />
              ))}
            </div>
            {formData.businessType === 'other' && (
              <div style={{ marginTop: 16 }}>
                <label htmlFor="industryOther">Specify your Industry</label>
                <input id="industryOther" type="text" value={formData.industryOther} onChange={(e) => setFormData({ ...formData, industryOther: e.target.value })} placeholder="e.g., Healthcare, Manufacturing, Education..." style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }} />
              </div>
            )}
            <div style={{ marginTop: 20, backgroundColor: '#EEF4FF', padding: 12, borderRadius: 6, color: '#0047FF' }}>
              <strong>Industry-specific Support</strong>
              <p style={{ margin: 0 }}>Receive tools and funding options suited to your industry.</p>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2>Key Challenges</h2>
            <p style={{ color: '#777' }}>What obstacles are you trying to overcome? (Select all that apply)</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { key: 'funding', icon: <FaDollarSign />, title: 'Funding', description: 'Access to capital and investment opportunities' },
                { key: 'legal', icon: <FaBalanceScale />, title: 'Legal Support', description: 'Compliance, contracts, and legal guidance' },
                { key: 'market', icon: <FaGlobe />, title: 'Market Access', description: 'Customer acquisition and market penetration' },
                { key: 'businessDev', icon: <FaUsers />, title: 'Business Development', description: 'Strategy, operations, and growth planning' },
              ].map(({ key, icon, title, description }) => (
                <SelectableCard key={key} selected={formData.keyChallenges.includes(key)} icon={icon} title={title} description={description} onClick={() => toggleArrayValue('keyChallenges', key)} />
              ))}
            </div>
            <div style={{ marginTop: 20, backgroundColor: '#FFF4F4', padding: 12, borderRadius: 6, color: '#D32F2F' }}>
              <strong>Targeted Resources for your Challenges</strong>
              <p style={{ margin: 0 }}>Access solutions for your key challenges like funding or legal issues.</p>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2>Your Goals (Next 6-12 months)</h2>
            <p style={{ color: '#777' }}>What are you looking to achieve? (Select all that apply)</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { key: 'secureFunding', icon: <FaDollarSign />, title: 'Secure Funding', description: 'Raise capital for growth and operations' },
                { key: 'expandingMarket', icon: <FaChartLine />, title: 'Expanding Market Research', description: 'Enter new markets and acquire customers' },
                { key: 'productDevelopment', icon: <FaRocket />, title: 'Product Development', description: 'Enhance existing or develop new products' },
                { key: 'teamBuilding', icon: <FaUsers />, title: 'Team Building', description: 'Hire talent and build organizational capacity' },
              ].map(({ key, icon, title, description }) => (
                <SelectableCard key={key} selected={formData.goals.includes(key)} icon={icon} title={title} description={description} onClick={() => toggleArrayValue('goals', key)} />
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <label htmlFor="goalsOther" style={{ display: 'block', marginBottom: 8 }}>Additional Goals or Specific Targets</label>
              <input
                id="goalsOther"
                type="text"
                value={formData.goalsOther}
                onChange={(e) => setFormData({ ...formData, goalsOther: e.target.value })}
                placeholder="Describe any other specific goals or targets you want to achieve.."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
              />
            </div>
            <div style={{ marginTop: 24, backgroundColor: '#E6F0FF', padding: 12, borderRadius: 6, color: '#0047FF', fontSize: 14 }}>
              <strong>Goal-oriented Guidance</strong>
              <p style={{ margin: 0 }}>Get personalized strategies and tools to achieve your goals.</p>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h2>Business Model Details</h2>
            <p style={{ color: '#777' }}>Help us understand your business structure</p>

            <div style={{ marginBottom: 24 }}>
              <h3>Team &amp; Organization</h3>
              <label htmlFor="teamSize">Team Size</label>
              <select
                id="teamSize"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
              >
                <option value="">Select your Team Size</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h3>Revenue Model</h3>
              <label htmlFor="revenueModel">Primary Revenue Model</label>
              <select
                id="revenueModel"
                value={formData.revenueModel}
                onChange={(e) => setFormData({ ...formData, revenueModel: e.target.value })}
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 14 }}
              >
                <option value="">Select your revenue model</option>
                <option value="subscription">Subscription</option>
                <option value="freemium">Freemium</option>
                <option value="advertising">Advertising</option>
                <option value="directSales">Direct Sales</option>
                <option value="other">Other</option>
              </select>
              <div style={{ marginTop: 12 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>Current Revenue Status</label>
                {[{ value: 'pre', label: 'Pre-revenue' }, { value: 'early', label: 'Early revenue (0-100K)' }, { value: 'growing', label: 'Growing revenue (100K-1M)' }, { value: 'established', label: 'Established revenue (1M+)' }].map(({ value, label }) => (
                  <label key={value} style={{ display: 'block', marginBottom: 4, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="revenueStatus"
                      value={value}
                      checked={formData.revenueStatus === value}
                      onChange={() => setFormData({ ...formData, revenueStatus: value as FormData['revenueStatus'] })}
                      style={{ marginRight: 8 }}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h3>Market Focus</h3>
              {[{ value: 'local', label: 'Local/Regional' }, { value: 'national', label: 'National' }, { value: 'international', label: 'International' }, { value: 'global', label: 'Global' }].map(({ value, label }) => (
                <label key={value} style={{ display: 'block', marginBottom: 4, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="marketFocus"
                    value={value}
                    checked={formData.marketFocus === value}
                    onChange={() => setFormData({ ...formData, marketFocus: value as FormData['marketFocus'] })}
                    style={{ marginRight: 8 }}
                  />
                  {label}
                </label>
              ))}
            </div>

            <div style={{ marginTop: 24, backgroundColor: '#E6F0FF', padding: 12, borderRadius: 6, color: '#0047FF', fontSize: 14 }}>
              <strong>Tailored Operational Support</strong>
              <p style={{ margin: 0 }}>Receive resources and strategies based on your business model.</p>
            </div>
          </>
        )}

        {step === 7 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: 48, color: '#0047FF', marginBottom: 24 }}>✔️</div>
            <h2>Welcome to Enterprise Journey!</h2>
            <p>Your business registration has been completed. <strong>Check your email</strong> for verification.</p>
            <button
              onClick={handleFinish}
              style={{
                backgroundColor: '#0047FF',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '12px 24px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 24,
                width: '100%',
              }}
            >
              Start Your Journey
            </button>
            <button
              onClick={handleDashboardRedirect}
              style={{
                backgroundColor: 'white',
                color: '#0047FF',
                border: '2px solid #0047FF',
                borderRadius: 6,
                padding: '12px 24px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 12,
                width: '100%',
              }}
            >
              Visit Dashboard
            </button>
          </div>
        )}


        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handlePrevious} disabled={step === 1} style={{ backgroundColor: '#fff', color: '#0047FF', border: '2px solid #0047FF', borderRadius: 6, padding: '10px 20px', fontWeight: 'bold', fontSize: 14, cursor: step === 1 ? 'not-allowed' : 'pointer' }}>Previous</button>
          <div>
            <button onClick={onSaveAndContinueLater} style={{ backgroundColor: '#E6F0FF', color: '#0047FF', border: 'none', borderRadius: 6, padding: '10px 20px', fontWeight: 'bold', fontSize: 14, marginRight: 12, cursor: 'pointer' }}>Save and continue later</button>
            <button onClick={handleNext} style={{ backgroundColor: '#0047FF', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', fontWeight: 'bold', fontSize: 14, cursor: 'pointer' }}>{step === totalSteps ? 'Finish' : 'Next →'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForms;
