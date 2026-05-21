const Brand = require('../models/Brand');

const requiredFields = [
  'brandName',
  'founderName',
  'brandCategory',
  'brandStory',
  'gstNumber',
  'businessType',
  'mfgScale',
  'city',
  'state',
  'address',
  'subCategories',
  'pricePoint',
  'inventorySize',
  'sampleProducts',
  'deliveryZones',
  'sameday',
  'packaging',
  'returnPolicy',
];

const calculateCompletion = (data = {}) => {
  const completedFields = requiredFields.reduce((count, field) => {
    const value = data[field];
    return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
  }, 0);

  return Math.round((completedFields / requiredFields.length) * 100);
};

const buildSavedData = (brand) => ({
  applicationStatus: brand.applicationStatus,
  profileCompletion: brand.profileCompletion,
  onboardingStep: brand.onboardingStep,
  onboardingData: brand.onboardingData || {},
});

// @desc    Get onboarding progress
// @route   GET /api/onboarding/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    const brand = await Brand.findById(req.brandId).select('-password');
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    return res.json(buildSavedData(brand));
  } catch (error) {
    console.error('Error fetching progress:', error);
    return res.status(500).json({ message: 'Unable to retrieve onboarding progress' });
  }
};

const normalizeOnboardingData = (existingData, incomingData) => {
  const currentData = existingData && existingData.toObject ? existingData.toObject() : existingData || {};
  return {
    ...currentData,
    ...incomingData,
  };
};

const validateSavePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return 'Payload must be a valid object';
  }

  if (!payload.data || typeof payload.data !== 'object') {
    return 'Onboarding data is required';
  }

  return null;
};

// @desc    Save onboarding progress
// @route   PUT /api/onboarding/progress
// @access  Private
const saveProgress = async (req, res) => {
  try {
    const { step, data, submit } = req.body;
    const validationError = validateSavePayload(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const brand = await Brand.findById(req.brandId);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    if (typeof step === 'number' && step > 0) {
      brand.onboardingStep = Math.min(step, requiredFields.length + 1);
    }

    brand.onboardingData = normalizeOnboardingData(brand.onboardingData, data);
    brand.profileCompletion = calculateCompletion(brand.onboardingData);

    if (submit === true) {
      brand.applicationStatus = 'Pending Review';
    }

    const updatedBrand = await brand.save();

    return res.json({
      message: submit ? 'Application submitted successfully' : 'Progress saved successfully',
      ...buildSavedData(updatedBrand),
    });
  } catch (error) {
    console.error('Error saving progress:', error);
    return res.status(500).json({ message: 'Unable to save onboarding progress' });
  }
};

module.exports = {
  getProgress,
  saveProgress,
};
