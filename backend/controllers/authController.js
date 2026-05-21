const Brand = require('../models/Brand');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (brandId) => {
  return jwt.sign({ id: brandId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

const validateRegistration = (email, password) => {
  if (!email || !password) {
    return 'Email and password are required';
  }

  if (!email.includes('@')) {
    return 'Please provide a valid email address';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  return '';
};

// @desc    Register a new brand
// @route   POST /api/auth/register
// @access  Public
const registerBrand = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const validationMessage = validateRegistration(email, password);

    if (validationMessage) {
      return sendError(res, 400, validationMessage);
    }

    const existingBrand = await Brand.findOne({ email });
    if (existingBrand) {
      return sendError(res, 409, 'A brand already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const brand = await Brand.create({
      email,
      password: hashedPassword,
      onboardingData: {},
    });

    if (!brand) {
      return sendError(res, 400, 'Unable to create brand account');
    }

    res.status(201).json({
      _id: brand._id,
      email: brand.email,
      token: createToken(brand._id),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error while creating account' });
  }
};

// @desc    Authenticate a brand
// @route   POST /api/auth/login
// @access  Public
const loginBrand = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required');
    }

    const brand = await Brand.findOne({ email });
    const passwordMatches = brand ? await bcrypt.compare(password, brand.password) : false;

    if (!brand || !passwordMatches) {
      return sendError(res, 401, 'Invalid email or password');
    }

    res.json({
      _id: brand._id,
      email: brand.email,
      onboardingStep: brand.onboardingStep,
      token: createToken(brand._id),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error while signing in' });
  }
};

module.exports = {
  registerBrand,
  loginBrand,
};
