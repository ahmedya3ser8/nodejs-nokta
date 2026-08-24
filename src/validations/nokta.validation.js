import { body, param } from "express-validator";

import validationMiddleware from "../middlewares/validation.middleware.js";

export const createNoktaValidation = [
  body('personName')
    .notEmpty()
    .withMessage('Person Name is required'),

  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: 1 })
    .withMessage('Amount must be at least 1'),

  body('transactionType')
    .notEmpty()
    .withMessage('Transaction type is required')
    .isIn(['received', 'given'])
    .withMessage('Transaction type must be received or given'),

  body('occasionType')
    .notEmpty()
    .withMessage('Occasion type is required')
    .isIn(['wedding', 'engagement', 'birthday', 'other'])
    .withMessage('Occasion type must be wedding, engagement, birthday, or other'),

  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid date in YYYY-MM-DD format'),

  validationMiddleware
];

export const getNoktaByIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Nokta ID'),

  validationMiddleware,
];

export const updateNoktaValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Nokta ID'),

  body('personName')
    .optional()
    .trim(),

  body('amount')
    .optional()
    .isFloat({ min: 1 })
    .withMessage('Amount must be at least 1'),

  body('transactionType')
    .optional()
    .isIn(['received', 'given'])
    .withMessage('Transaction type must be received or given'),

  body('occasionType')
    .optional()
    .isIn(['wedding', 'engagement', 'birthday', 'other'])
    .withMessage('Invalid occasion type'),

  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be in YYYY-MM-DD format'),

  validationMiddleware,
];

export const deleteNoktaValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Nokta ID'),

  validationMiddleware,
];

export const getNoktaByPersonValidation = [
  param('personId')
    .isMongoId()
    .withMessage('Invalid Person ID'),

  validationMiddleware,
];
