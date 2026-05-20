import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SubmissionSuccess = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center justify-center text-center py-12">
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8 border border-emerald-100">
        <CheckCircle className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />
      </div>
      
      <h2 className="font-heading text-4xl text-dhaaga-primary mb-4">Application Submitted</h2>
      <p className="text-dhaaga-muted text-lg max-w-lg mb-8">
        Thank you for choosing to partner with Dhaaga. Your brand story and products have been sent to our curation team.
      </p>

      <div className="bg-dhaaga-cards border border-dhaaga-border rounded-xl p-6 mb-10 w-full max-w-sm inline-flex flex-col items-center">
        <span className="text-xs font-medium uppercase tracking-widest text-dhaaga-muted mb-3">Current Status</span>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border text-amber-700 bg-amber-50 border-amber-200">
          <span className="w-2 h-2 rounded-full bg-current mr-2 opacity-70"></span>
          Pending Review
        </span>
        <p className="text-xs text-dhaaga-muted mt-4 text-center">
          Our team will review your application and respond within 48 hours.
        </p>
      </div>

      <Link 
        to="/dashboard" 
        className="px-8 py-3.5 bg-dhaaga-accent text-dhaaga-cards text-sm font-medium rounded-full hover:bg-dhaaga-accent/90 transition-all shadow-md hover:shadow-lg"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default SubmissionSuccess;
