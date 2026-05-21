import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const STATUS_STYLE_MAP = {
  'Pending Review': 'text-amber-700 bg-amber-50 border-amber-200',
  Approved: 'text-emerald-800 bg-emerald-50 border-emerald-200',
  Rejected: 'text-rose-800 bg-rose-50 border-rose-200',
  'Needs More Information': 'text-orange-800 bg-orange-50 border-orange-200',
};

const Dashboard = () => {
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('dhaaga_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/onboarding/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('dhaaga_token');
            navigate('/login');
            return;
          }

          const payload = await response.json();
          throw new Error(payload.message || 'Unable to load dashboard data');
        }

        const data = await response.json();
        setBrandData(data);
      } catch (fetchError) {
        console.error('Error fetching dashboard:', fetchError);
        setError('We could not load your dashboard right now. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate, token]);

  const getStatusStyles = (status) => STATUS_STYLE_MAP[status] || 'text-dhaaga-muted bg-dhaaga-bg border-dhaaga-border';

  const getFirstName = (fullName = '') => {
    return fullName.trim().split(' ')[0] || 'Founder';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dhaaga-bg flex items-center justify-center">
        <div className="text-dhaaga-muted">Loading dashboard...</div>
      </div>
    );
  }

  if (error || !brandData) {
    return (
      <div className="min-h-screen bg-dhaaga-bg flex items-center justify-center px-6">
        <div className="max-w-lg bg-dhaaga-cards rounded-3xl border border-dhaaga-border p-10 text-center shadow-sm">
          <h2 className="font-heading text-3xl text-dhaaga-primary mb-4">Dashboard Unavailable</h2>
          <p className="text-dhaaga-muted mb-6">{error || 'Your application status could not be retrieved at this time.'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-full bg-dhaaga-accent text-dhaaga-cards font-medium hover:bg-dhaaga-accent/90 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dhaaga-bg">
      <nav className="border-b border-dhaaga-border sticky top-0 bg-dhaaga-bg/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-dhaaga-accent flex items-center justify-center">
              <span className="text-dhaaga-cards font-heading text-lg italic">D</span>
            </div>
            <span className="font-heading text-2xl font-semibold tracking-wide text-dhaaga-primary">Dhaaga</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-dhaaga-primary">{brandData.onboardingData.brandName || 'Brand'}</span>
            <div className="w-10 h-10 rounded-full bg-dhaaga-cards border border-dhaaga-border" />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="mb-12">
          <h1 className="font-heading text-5xl text-dhaaga-primary mb-4">Welcome back, {getFirstName(brandData.onboardingData.founderName)}</h1>
          <p className="text-xl text-dhaaga-muted font-heading italic">Here is the current status of your partnership application.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 bg-dhaaga-cards rounded-2xl border border-dhaaga-border p-8 md:p-10 shadow-sm relative overflow-hidden">
            <h2 className="text-sm font-medium uppercase tracking-widest text-dhaaga-muted mb-6">Application Status</h2>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border mb-4 ${getStatusStyles(brandData.applicationStatus)}`}>
                  <span className="w-2 h-2 rounded-full bg-current mr-2 opacity-70" />
                  {brandData.applicationStatus}
                </span>
                <p className="text-dhaaga-primary font-medium text-lg max-w-sm">
                  Our curation team is currently reviewing your brand story and product catalogue.
                </p>
              </div>
              <div className="shrink-0">
                <Link to="/onboarding" className="inline-flex px-6 py-3 bg-dhaaga-bg border border-dhaaga-border text-dhaaga-primary text-sm font-medium rounded-full hover:border-dhaaga-accent transition-all">
                  View Application
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-dhaaga-cards rounded-2xl border border-dhaaga-border p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-dhaaga-muted mb-2">Profile Completion</h2>
              <div className="flex items-end gap-2 mb-6">
                <span className="font-heading text-5xl text-dhaaga-accent">{brandData.profileCompletion}%</span>
              </div>
            </div>

            <div>
              <div className="h-1.5 w-full bg-dhaaga-bg rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-dhaaga-accent rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${brandData.profileCompletion}%` }}
                />
              </div>
              <p className="text-xs text-dhaaga-muted">
                {brandData.profileCompletion < 100
                  ? 'Complete your profile to increase visibility.'
                  : 'Your brand profile is complete.'}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-dhaaga-border pt-12">
          <h3 className="font-heading text-2xl text-dhaaga-primary mb-8">What happens next?</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">✓</div>
              <div>
                <h4 className="text-lg font-medium text-dhaaga-primary mb-1">Application Submitted</h4>
                <p className="text-dhaaga-muted text-sm">Your brand details and product imagery have been received.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-current" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-dhaaga-primary mb-1">Curation Review</h4>
                <p className="text-dhaaga-muted text-sm">Our team evaluates your brand against Dhaaga's luxury and authenticity standards.</p>
              </div>
            </div>
            <div className="flex gap-4 opacity-50">
              <div className="w-8 h-8 rounded-full bg-dhaaga-bg border border-dhaaga-border text-dhaaga-muted flex items-center justify-center shrink-0">3</div>
              <div>
                <h4 className="text-lg font-medium text-dhaaga-primary mb-1">Onboarding Call</h4>
                <p className="text-dhaaga-muted text-sm">If approved, we will schedule a kickoff call to finalize your logistics.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
