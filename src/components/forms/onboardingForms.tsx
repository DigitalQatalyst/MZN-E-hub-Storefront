import React, { useState } from 'react';

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

const OnboardingForms: React.FC = () => {
  const [step, setStep] = useState(1);
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

  const totalSteps = 7;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSaveAndContinueLater = () => {
    // Placeholder for save logic
    alert('Progress saved! You can continue later.');
  };

  const toggleArrayValue = (key: keyof FormData, value: string) => {
    const currentArray = formData[key] as string[];
    if (currentArray.includes(value)) {
      setFormData({
        ...formData,
        [key]: currentArray.filter((v) => v !== value),
      });
    } else {
      setFormData({
        ...formData,
        [key]: [...currentArray, value],
      });
    }
  };

  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Header with progress */}
      <div style={{ backgroundColor: '#0047FF', color: 'white', padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <div>Step {step} of {totalSteps}</div>
          <div>{progressPercent}% Complete</div>
        </div>
        <div style={{ height: 6, backgroundColor: '#3366FF', borderRadius: 3, marginTop: 8 }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#0026B3', borderRadius: 3 }} />
        </div>
        <div style={{ marginTop: 8, textAlign: 'center', fontWeight: 'bold' }}>
          {step === 1 && 'Business Status'}
          {step === 2 && 'Business Stage'}
          {step === 3 && 'Business Type'}
          {step === 4 && 'Key Challenges'}
          {step === 5 && 'Goals'}
          {step === 6 && 'Business Model'}
          {step === 7 && 'Complete'}
        </div>
      </div>

      {/* Form content */}
      {step === 1 && (
        <div>
          <h2>Select Your Current Business Status</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: 'block',
              border: formData.businessStatus === 'already' ? '2px solid #0047FF' : '1px solid #ccc',
              borderRadius: 8,
              padding: 16,
              marginBottom: 12,
              cursor: 'pointer',
              backgroundColor: formData.businessStatus === 'already' ? '#E6F0FF' : 'white',
            }}>
              <input
                type="radio"
                name="businessStatus"
                value="already"
                checked={formData.businessStatus === 'already'}
                onChange={() => setFormData({ ...formData, businessStatus: 'already' })}
                style={{ marginRight: 8 }}
              />
              <span role="img" aria-label="business" style={{ marginRight: 8 }}>🏢</span>
              <strong>Already Have A Business</strong>
              <p style={{ margin: '4px 0 0 24px', color: '#555' }}>
                If you already have a business, onboard your company and start leveraging the platform’s ecosystem today.
              </p>
            </label>

            <label style={{
              display: 'block',
              border: formData.businessStatus === 'idea' ? '2px solid #0047FF' : '1px solid #ccc',
              borderRadius: 8,
              padding: 16,
              cursor: 'pointer',
              backgroundColor: formData.businessStatus === 'idea' ? '#E6F0FF' : 'white',
            }}>
              <input
                type="radio"
                name="businessStatus"
                value="idea"
                checked={formData.businessStatus === 'idea'}
                onChange={() => setFormData({ ...formData, businessStatus: 'idea' })}
                style={{ marginRight: 8 }}
              />
              <span role="img" aria-label="idea" style={{ marginRight: 8 }}>💡</span>
              <strong>I have an Idea</strong>
              <p style={{ margin: '4px 0 0 24px', color: '#555' }}>
                If you’re in the ideation phase, join now and incorporate your startup to benefit from our global ecosystem.
              </p>
            </label>
          </div>
          <button
            onClick={handleNext}
            disabled={!formData.businessStatus}
            style={{
              backgroundColor: '#0047FF',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '12px 24px',
              cursor: formData.businessStatus ? 'pointer' : 'not-allowed',
              width: '100%',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>What’s your Business Stage?</h2>
          <p style={{ color: '#777', marginBottom: 24 }}>Help us understand where you are in your journey</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              {
                key: 'startup',
                icon: '✈️',
                title: 'Start-up',
                description: 'Early-stage business with initial traction',
              },
              {
                key: 'scaleup',
                icon: '📈',
                title: 'Scale up',
                description: 'Growing business with proven model',
              },
              {
                key: 'expansion',
                icon: '🌐',
                title: 'Expansion',
                description: 'Established business seeking new markets',
              },
              {
                key: 'transformation',
                icon: '🔄',
                title: 'Transformation',
                description: 'Mature business undergoing strategic change',
              },
            ].map(({ key, icon, title, description }) => (
              <div
                key={key}
                onClick={() => setFormData({ ...formData, businessStage: key as FormData['businessStage'] })}
                style={{
                  border: formData.businessStage === key ? '2px solid #0047FF' : '1px solid #ccc',
                  borderRadius: 8,
                  padding: 16,
                  cursor: 'pointer',
                  backgroundColor: formData.businessStage === key ? '#E6F0FF' : 'white',
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <strong>{title}</strong>
                <p style={{ margin: '4px 0 0', color: '#999' }}>{description}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handlePrevious}
              style={{
                backgroundColor: 'white',
                color: '#0047FF',
                border: '2px solid #0047FF',
                borderRadius: 6,
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              Previous
            </button>
            <div>
              <button
                onClick={handleSaveAndContinueLater}
                style={{
                  backgroundColor: '#E6F0FF',
                  color: '#0047FF',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginRight: 12,
                }}
              >
                Save and continue later
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.businessStage}
                style={{
                  backgroundColor: '#0047FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor: formData.businessStage ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>What type of Business?</h2>
          <p style={{ color: '#777', marginBottom: 24 }}>Select the category that best describes your business</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              {
                key: 'technology',
                icon: '💡',
                title: 'Technology',
                description: 'Software, hardware, digital services',
              },
              {
                key: 'retail',
                icon: '🛍️',
                title: 'Retail',
                description: 'E-commerce, physical stores, consumer goods',
              },
              {
                key: 'services',
                icon: '👥',
                title: 'Services',
                description: 'Consulting, professional services, B2B',
              },
              {
                key: 'other',
                icon: '+',
                title: 'Other',
                description: 'Specify your industry',
              },
            ].map(({ key, icon, title, description }) => (
              <div
                key={key}
                onClick={() => setFormData({ ...formData, businessType: key as FormData['businessType'] })}
                style={{
                  border: formData.businessType === key ? '2px solid #0047FF' : '1px solid #ccc',
                  borderRadius: 8,
                  padding: 16,
                  cursor: 'pointer',
                  backgroundColor: formData.businessType === key ? '#E6F0FF' : 'white',
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <strong>{title}</strong>
                <p style={{ margin: '4px 0 0', color: '#999' }}>{description}</p>
              </div>
            ))}
          </div>
          {formData.businessType === 'other' && (
            <div style={{ marginTop: 16 }}>
              <label htmlFor="industryOther" style={{ display: 'block', marginBottom: 8 }}>
                Specify your Industry
              </label>
              <input
                id="industryOther"
                type="text"
                value={formData.industryOther}
                onChange={(e) => setFormData({ ...formData, industryOther: e.target.value })}
                placeholder="e.g., Healthcare, Manufacturing, Education..."
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  fontSize: 14,
                }}
              />
            </div>
          )}
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handlePrevious}
              style={{
                backgroundColor: 'white',
                color: '#0047FF',
                border: '2px solid #0047FF',
                borderRadius: 6,
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              Previous
            </button>
            <div>
              <button
                onClick={handleSaveAndContinueLater}
                style={{
                  backgroundColor: '#E6F0FF',
                  color: '#0047FF',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginRight: 12,
                }}
              >
                Save and continue later
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.businessType || (formData.businessType === 'other' && !formData.industryOther)}
                style={{
                  backgroundColor: '#0047FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor:
                    !formData.businessType || (formData.businessType === 'other' && !formData.industryOther)
                      ? 'not-allowed'
                      : 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
          <div
            style={{
              marginTop: 24,
              backgroundColor: '#E6F0FF',
              padding: 12,
              borderRadius: 6,
              color: '#0047FF',
              fontSize: 14,
            }}
          >
            <strong>Industry-specific Support</strong>
            <p style={{ margin: 0 }}>Receive tools and funding options suited to your industry.</p>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Key Challenges</h2>
          <p style={{ color: '#777', marginBottom: 24 }}>
            What obstacles are you trying to overcome? (Select all that apply)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              {
                key: 'funding',
                icon: '💲',
                title: 'Funding',
                description: 'Access to capital and investment opportunities',
              },
              {
                key: 'legal',
                icon: '⚖️',
                title: 'Legal Support',
                description: 'Compliance, contracts, and legal guidance',
              },
              {
                key: 'market',
                icon: '🌐',
                title: 'Market Access',
                description: 'Customer acquisition and market penetration',
              },
              {
                key: 'businessDev',
                icon: '👥',
                title: 'Business Development',
                description: 'Strategy, operations, and growth planning',
              },
            ].map(({ key, icon, title, description }) => (
              <div
                key={key}
                onClick={() => toggleArrayValue('keyChallenges', key)}
                style={{
                  border: formData.keyChallenges.includes(key) ? '2px solid #0047FF' : '1px solid #ccc',
                  borderRadius: 8,
                  padding: 16,
                  cursor: 'pointer',
                  backgroundColor: formData.keyChallenges.includes(key) ? '#E6F0FF' : 'white',
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <strong>{title}</strong>
                <p style={{ margin: '4px 0 0', color: '#999' }}>{description}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handlePrevious}
              style={{
                backgroundColor: 'white',
                color: '#0047FF',
                border: '2px solid #0047FF',
                borderRadius: 6,
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              Previous
            </button>
            <div>
              <button
                onClick={handleSaveAndContinueLater}
                style={{
                  backgroundColor: '#E6F0FF',
                  color: '#0047FF',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginRight: 12,
                }}
              >
                Save and continue later
              </button>
              <button
                onClick={handleNext}
                disabled={formData.keyChallenges.length === 0}
                style={{
                  backgroundColor: '#0047FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor: formData.keyChallenges.length === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
          <div
            style={{
              marginTop: 24,
              backgroundColor: '#E6F0FF',
              padding: 12,
              borderRadius: 6,
              color: '#0047FF',
              fontSize: 14,
            }}
          >
            <strong>Targetted Resources for your Challenges</strong>
            <p style={{ margin: 0 }}>
              Access solutions for your key challenges like funding or legal issues.
            </p>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2>Your Goals (Next 6-12 months)</h2>
          <p style={{ color: '#777', marginBottom: 24 }}>
            What are you looking to achieve? (Select all that apply)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              {
                key: 'secureFunding',
                icon: '💲',
                title: 'Secure Funding',
                description: 'Raise capital for growth and operations',
              },
              {
                key: 'expandingMarket',
                icon: '📈',
                title: 'Expanding Market Research',
                description: 'Enter new markets and acquire customers',
              },
              {
                key: 'productDevelopment',
                icon: '🔧',
                title: 'Product Development',
                description: 'Enhance existing or develop new products',
              },
              {
                key: 'teamBuilding',
                icon: '🌀',
                title: 'Team Building',
                description: 'Hire talent and build organizational capacity',
              },
            ].map(({ key, icon, title, description }) => (
              <div
                key={key}
                onClick={() => toggleArrayValue('goals', key)}
                style={{
                  border: formData.goals.includes(key) ? '2px solid #0047FF' : '1px solid #ccc',
                  borderRadius: 8,
                  padding: 16,
                  cursor: 'pointer',
                  backgroundColor: formData.goals.includes(key) ? '#E6F0FF' : 'white',
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <strong>{title}</strong>
                <p style={{ margin: '4px 0 0', color: '#999' }}>{description}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <label htmlFor="goalsOther" style={{ display: 'block', marginBottom: 8 }}>
              Additional Goals or Specific Targets
            </label>
            <input
              id="goalsOther"
              type="text"
              value={formData.goalsOther}
              onChange={(e) => setFormData({ ...formData, goalsOther: e.target.value })}
              placeholder="Describe any other specific goals or targets you want to achieve.."
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 4,
                border: '1px solid #ccc',
                fontSize: 14,
              }}
            />
          </div>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handlePrevious}
              style={{
                backgroundColor: 'white',
                color: '#0047FF',
                border: '2px solid #0047FF',
                borderRadius: 6,
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              Previous
            </button>
            <div>
              <button
                onClick={handleSaveAndContinueLater}
                style={{
                  backgroundColor: '#E6F0FF',
                  color: '#0047FF',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginRight: 12,
                }}
              >
                Save and continue later
              </button>
              <button
                onClick={handleNext}
                disabled={formData.goals.length === 0}
                style={{
                  backgroundColor: '#0047FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor: formData.goals.length === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
          <div
            style={{
              marginTop: 24,
              backgroundColor: '#E6F0FF',
              padding: 12,
              borderRadius: 6,
              color: '#0047FF',
              fontSize: 14,
            }}
          >
            <strong>Goal-oriented Guidance</strong>
            <p style={{ margin: 0 }}>Get personalized strategies and tools to achieve your goals.</p>
          </div>
        </div>
      )}

      {step === 6 && (
        <div>
          <h2>Business Model Details</h2>
          <p style={{ color: '#777', marginBottom: 24 }}>Help us understand your business structure</p>

          <div style={{ marginBottom: 24 }}>
            <h3>Team &amp; Organization</h3>
            <label htmlFor="teamSize" style={{ display: 'block', marginBottom: 8 }}>
              Team Size
            </label>
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
            <label htmlFor="revenueModel" style={{ display: 'block', marginBottom: 8 }}>
              Primary Revenue Model
            </label>
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
              {[
                { value: 'pre', label: 'Pre-revenue' },
                { value: 'early', label: 'Early revenue (0-100K)' },
                { value: 'growing', label: 'Growing revenue (100K-1M)' },
                { value: 'established', label: 'Established revenue (1M+)' },
              ].map(({ value, label }) => (
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
            {[
              { value: 'local', label: 'Local/Regional' },
              { value: 'national', label: 'National' },
              { value: 'international', label: 'International' },
              { value: 'global', label: 'Global' },
            ].map(({ value, label }) => (
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

          <div
            style={{
              marginTop: 24,
              backgroundColor: '#E6F0FF',
              padding: 12,
              borderRadius: 6,
              color: '#0047FF',
              fontSize: 14,
            }}
          >
            <strong>Tailored Operational Support</strong>
            <p style={{ margin: 0 }}>Receive resources and strategies based on your business model.</p>
          </div>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handlePrevious}
              style={{
                backgroundColor: 'white',
                color: '#0047FF',
                border: '2px solid #0047FF',
                borderRadius: 6,
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              Previous
            </button>
            <div>
              <button
                onClick={handleSaveAndContinueLater}
                style={{
                  backgroundColor: '#E6F0FF',
                  color: '#0047FF',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginRight: 12,
                }}
              >
                Save and continue later
              </button>
              <button
                onClick={handleNext}
                disabled={
                  !formData.teamSize ||
                  !formData.revenueModel ||
                  !formData.revenueStatus ||
                  !formData.marketFocus
                }
                style={{
                  backgroundColor:
                    !formData.teamSize ||
                    !formData.revenueModel ||
                    !formData.revenueStatus ||
                    !formData.marketFocus
                      ? '#999'
                      : '#0047FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 20px',
                  cursor:
                    !formData.teamSize ||
                    !formData.revenueModel ||
                    !formData.revenueStatus ||
                    !formData.marketFocus
                      ? 'not-allowed'
                      : 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 7 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: 48, color: '#0047FF', marginBottom: 24 }}>✔️</div>
          <h2>Welcome to ED Journey!</h2>
          <p>Your business registration has been completed. <strong>Check your email</strong> for verification</p>
          <button
            onClick={() => alert('Start Your Journey clicked')}
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
            onClick={() => alert('Visit Dashboard clicked')}
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
    </div>
  );
};

export default OnboardingForms;
