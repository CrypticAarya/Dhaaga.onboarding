import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandIdentity from '../components/onboarding/BrandIdentity';
import BusinessDetails from '../components/onboarding/BusinessDetails';
import ProductInformation from '../components/onboarding/ProductInformation';
import DeliveryOperations from '../components/onboarding/DeliveryOperations';
import ReviewSubmit from '../components/onboarding/ReviewSubmit';
import SubmissionSuccess from '../components/onboarding/SubmissionSuccess';

const ONBOARDING_STEPS = [
  { id: 1, title: 'Brand Identity', component: BrandIdentity },
  { id: 2, title: 'Business Details', component: BusinessDetails },
  { id: 3, title: 'Product Showcase', component: ProductInformation },
  { id: 4, title: 'Delivery & Ops', component: DeliveryOperations },
  { id: 5, title: 'Review & Submit', component: ReviewSubmit },
];

const INITIAL_FORM_DATA = {
  brandName: '',
  founderName: '',
  brandCategory: '',
  brandStory: '',
  brandLogo: null,
  gstNumber: '',
  businessType: '',
  mfgScale: '',
  city: '',
  state: '',
  address: '',
  subCategories: '',
  pricePoint: '',
  inventorySize: '',
  sampleProducts: '',
  productImages: null,
  deliveryZones: '',
  sameday: 'no',
  packaging: '',
  returnPolicy: '',
};

const VALIDATION_RULES = {
  1: [
    { field: 'brandName', message: 'Brand name is required' },
    { field: 'founderName', message: 'Founder name is required' },
    { field: 'brandCategory', message: 'Please select a brand category' },
  ],
  2: [
    { field: 'gstNumber', message: 'GST number is required', exactLength: 15 },
    { field: 'businessType', message: 'Please select a business type' },
  ],
  3: [
    { field: 'pricePoint', message: 'Please select an average price point' },
  ],
  4: [
    { field: 'deliveryZones', message: 'Please select delivery zones' },
  ],
};

const hasValue = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

const buildRequestHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

const validateStepFields = (step, data) => {
  const rules = VALIDATION_RULES[step] || [];
  const result = {};

  rules.forEach((rule) => {
    const value = data[rule.field];

    if (!hasValue(value)) {
      result[rule.field] = rule.message;
      return;
    }

    if (rule.exactLength && String(value).trim().length !== rule.exactLength) {
      result[rule.field] = `This field must be exactly ${rule.exactLength} characters long.`;
    }
  });

  return result;
};

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [saveError, setSaveError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('dhaaga_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProgress = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/onboarding/progress`, {
          headers: buildRequestHeaders(token),
        });

        if (response.status === 401) {
          localStorage.removeItem('dhaaga_token');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          const payload = await response.json();
          throw new Error(payload.message || 'Unable to load saved application');
        }

        const savedProgress = await response.json();
        setFormData((current) => ({ ...current, ...savedProgress.onboardingData }));
        setCurrentStep(savedProgress.onboardingStep || 1);
        setIsSubmitted(savedProgress.applicationStatus && savedProgress.applicationStatus !== 'Draft');
      } catch (error) {
        console.error('Error loading onboarding data:', error);
        setSaveError('Unable to load your application at the moment. Please try again in a minute.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [navigate, token]);

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: null }));
    }
  };

  const saveProgress = async (step, submit = false) => {
    const payload = {
      step: submit ? step : step + 1,
      data: formData,
      submit,
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/onboarding/progress`, {
      method: 'PUT',
      headers: buildRequestHeaders(token),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const payload = await response.json();
      throw new Error(payload.message || 'Failed to save progress');
    }

    return response.json();
  };

  const handleNext = async () => {
    const validationErrors = validateStepFields(currentStep, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaveError('');
    setIsSaving(true);

    try {
      const shouldSubmit = currentStep === ONBOARDING_STEPS.length;
      const savedData = await saveProgress(currentStep, shouldSubmit);

      if (shouldSubmit) {
        setIsSubmitted(true);
        return;
      }

      setFormData((current) => ({ ...current, ...savedData.onboardingData }));
      setCurrentStep((current) => Math.min(current + 1, ONBOARDING_STEPS.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error saving progress:', error);
      setSaveError('Unable to save your step right now. Please try again shortly.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrev = () => {
    setSaveError('');
    setCurrentStep((current) => Math.max(current - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dhaaga-bg flex items-center justify-center">
        <p className="text-dhaaga-muted font-heading text-lg italic">Resuming your application...</p>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-dhaaga-bg flex flex-col">
        <nav className="border-b border-dhaaga-border sticky top-0 bg-dhaaga-bg/80 backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-dhaaga-accent flex items-center justify-center">
                <span className="text-dhaaga-cards font-heading text-lg italic">D</span>
              </div>
              <span className="font-heading text-2xl font-semibold tracking-wide text-dhaaga-primary">Dhaaga</span>
            </Link>
          </div>
        </nav>
        <main className="flex-1 flex items-center justify-center p-6">
          <SubmissionSuccess />
        </main>
      </div>
    );
  }

  const CurrentStepComponent = ONBOARDING_STEPS[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-dhaaga-bg flex flex-col md:flex-row">
      <aside className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-dhaaga-border p-8 md:p-12 flex flex-col justify-between shrink-0 bg-dhaaga-bg z-10 sticky top-0 md:h-screen overflow-y-auto">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 mb-16 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-dhaaga-accent flex items-center justify-center shrink-0">
              <span className="text-dhaaga-cards font-heading text-lg italic">D</span>
            </div>
            <span className="font-heading text-2xl font-semibold tracking-wide text-dhaaga-primary">Dhaaga</span>
          </Link>

          <div className="hidden md:block">
            <p className="text-xs font-medium uppercase tracking-widest text-dhaaga-muted mb-8">Application Progress</p>
            <nav aria-label="Progress">
              <ol className="space-y-6">
                {ONBOARDING_STEPS.map((step) => {
                  const isActive = step.id === currentStep;
                  const isCompleted = step.id < currentStep;

                  return (
                    <li key={step.id} className="relative">
                      <div className="flex items-start">
                        <span className="h-6 flex items-center" aria-hidden="true">
                          <span
                            className={`w-2.5 h-2.5 rounded-full z-10 transition-colors duration-300 ${
                              isActive
                                ? 'bg-dhaaga-accent ring-4 ring-dhaaga-accent/10'
                                : isCompleted
                                ? 'bg-dhaaga-primary'
                                : 'bg-dhaaga-border'
                            }`}
                          />
                        </span>
                        <div className="ml-4 flex flex-col">
                          <span className={`text-sm font-medium transition-colors duration-300 ${isActive || isCompleted ? 'text-dhaaga-primary' : 'text-dhaaga-muted'}`}>
                            Step {step.id}
                          </span>
                          <span className={`text-base font-heading mt-1 transition-colors duration-300 ${isActive ? 'text-dhaaga-accent' : isCompleted ? 'text-dhaaga-primary' : 'text-dhaaga-muted'}`}>
                            {step.title}
                          </span>
                        </div>
                      </div>
                      {step.id !== ONBOARDING_STEPS.length && (
                        <div className="absolute top-6 left-[4px] -bottom-4 w-px bg-dhaaga-border" />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          <div className="md:hidden">
            <p className="text-xs uppercase tracking-widest text-dhaaga-muted mb-2">Step {currentStep} of {ONBOARDING_STEPS.length}</p>
            <h2 className="font-heading text-2xl text-dhaaga-primary">{ONBOARDING_STEPS[currentStep - 1].title}</h2>
          </div>
        </div>

        <div className="hidden md:block mt-16 text-sm text-dhaaga-muted max-w-[200px] leading-relaxed">
          Need assistance? <br /> Contact our curation team at{' '}
          <a href="mailto:partners@dhaaga.com" className="text-dhaaga-primary hover:text-dhaaga-accent transition-colors">
            partners@dhaaga.com
          </a>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full md:h-screen overflow-hidden relative">
        <div className="flex-1 overflow-y-auto px-6 py-12 md:p-20 lg:px-32 xl:px-48 relative">
          <div className="max-w-3xl mx-auto w-full pb-32">
            <CurrentStepComponent
              data={formData}
              errors={errors}
              onChange={handleChange}
              onEditStep={(stepId) => setCurrentStep(stepId)}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:px-20 lg:px-32 xl:px-48 bg-gradient-to-t from-dhaaga-bg via-dhaaga-bg to-transparent">
          {saveError && (
            <p className="text-rose-700 text-sm text-center mb-3 font-medium">{saveError}</p>
          )}
          <div className="max-w-3xl mx-auto w-full flex items-center justify-between pt-4 pb-4">
            {currentStep > 1 ? (
              <button
                onClick={handlePrev}
                disabled={isSaving}
                className="px-6 py-3 text-dhaaga-muted hover:text-dhaaga-primary text-sm font-medium transition-colors disabled:opacity-40"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={isSaving}
              className="px-8 py-3.5 bg-dhaaga-primary text-dhaaga-cards text-sm font-medium rounded-full hover:bg-dhaaga-primary/90 transition-all shadow-md hover:shadow-lg ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : currentStep === ONBOARDING_STEPS.length ? 'Submit Application' : 'Continue'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
