import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandIdentity from '../components/onboarding/BrandIdentity';
import BusinessDetails from '../components/onboarding/BusinessDetails';
import ProductInformation from '../components/onboarding/ProductInformation';
import DeliveryOperations from '../components/onboarding/DeliveryOperations';
import ReviewSubmit from '../components/onboarding/ReviewSubmit';
import SubmissionSuccess from '../components/onboarding/SubmissionSuccess';
import { API_URL } from '../config/api';

const steps = [
  { id: 1, title: 'Brand Identity', component: BrandIdentity },
  { id: 2, title: 'Business Details', component: BusinessDetails },
  { id: 3, title: 'Product Showcase', component: ProductInformation },
  { id: 4, title: 'Delivery & Ops', component: DeliveryOperations },
  { id: 5, title: 'Review & Submit', component: ReviewSubmit },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('dhaaga_token');

  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProgress = async () => {
      try {
        const res = await fetch(`${API_URL}/onboarding/progress`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.onboardingData) {
            setFormData(prev => ({ ...prev, ...data.onboardingData }));
          }
          if (data.onboardingStep) setCurrentStep(data.onboardingStep);
          if (data.applicationStatus && data.applicationStatus !== 'Draft') setIsSubmitted(true);
        } else if (res.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('dhaaga_token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProgress();
  }, [token, navigate]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.brandName.trim()) newErrors.brandName = 'Brand Name is required';
      if (!formData.founderName.trim()) newErrors.founderName = 'Founder Name is required';
      if (!formData.brandCategory) newErrors.brandCategory = 'Please select a category';
    }
    if (step === 2) {
      if (!formData.gstNumber.trim()) newErrors.gstNumber = 'GST Number is required';
      else if (formData.gstNumber.length !== 15) newErrors.gstNumber = 'GST Number must be 15 characters';
      if (!formData.businessType) newErrors.businessType = 'Please select a business type';
    }
    if (step === 3) {
      if (!formData.pricePoint) newErrors.pricePoint = 'Please select an average price point';
    }
    if (step === 4) {
      if (!formData.deliveryZones) newErrors.deliveryZones = 'Please select delivery zones';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProgress = async (step, submit = false) => {
    try {
      const res = await fetch(`${API_URL}/onboarding/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          step: submit ? step : step + 1,
          data: formData,
          submit,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to save progress');
      }
      return true;
    } catch (error) {
      console.error('Failed to save progress:', error);
      setSaveError('Could not save your progress. Please check your connection and try again.');
      return false;
    }
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;
    setSaveError('');
    setIsSaving(true);

    if (currentStep < steps.length) {
      const saved = await saveProgress(currentStep);
      setIsSaving(false);
      if (!saved) return; // Halt on failure
      setCurrentStep(c => c + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === steps.length) {
      const saved = await saveProgress(currentStep, true);
      setIsSaving(false);
      if (!saved) return;
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setSaveError('');
      setCurrentStep(c => c - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-dhaaga-bg flex flex-col md:flex-row">
      {/* Sidebar */}
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
                {steps.map((step) => {
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
                      {step.id !== steps.length && (
                        <div className="absolute top-6 left-[4px] -bottom-4 w-px bg-dhaaga-border" />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          {/* Mobile progress indicator */}
          <div className="md:hidden">
            <p className="text-xs uppercase tracking-widest text-dhaaga-muted mb-2">Step {currentStep} of {steps.length}</p>
            <h2 className="font-heading text-2xl text-dhaaga-primary">{steps[currentStep - 1].title}</h2>
          </div>
        </div>

        <div className="hidden md:block mt-16 text-sm text-dhaaga-muted max-w-[200px] leading-relaxed">
          Need assistance? <br /> Contact our curation team at{' '}
          <a href="mailto:partners@dhaaga.com" className="text-dhaaga-primary hover:text-dhaaga-accent transition-colors">
            partners@dhaaga.com
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
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

        {/* Sticky Footer Navigation */}
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
              {isSaving ? 'Saving...' : currentStep === steps.length ? 'Submit Application' : 'Continue'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
