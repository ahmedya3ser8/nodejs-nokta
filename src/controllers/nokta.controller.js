import { 
  createNoktaService, 
  getAllNoktaService, 
  deleteNoktaService, 
  getNoktaByIdService, 
  updateNoktaService,
  getAllNoktaByPersonService
} from '../services/nokta.service.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create Nokta
// @route   POST /api/nokta
// @access  Private
export const createNokta = asyncHandler(async (req, res, next) => {
  const nokta = await createNoktaService(req.user._id, req.body);

  res.status(201).json({
    success: true,
    message: 'Nokta created successfully',
    data: nokta,
  });
})

// @desc    Get All Noktas
// @route   GET /api/nokta
// @access  Private
export const getAllNokta = asyncHandler(async (req, res, next) => {
  const noktas = await getAllNoktaService(req.user._id, req.query.search);

  res.status(200).json({
    success: true,
    message: 'Noktas retrieved successfully',
    data: noktas,
  });
})

// @desc    Get Nokta By ID
// @route   GET /api/nokta/:id
// @access  Private
export const getNoktaById = asyncHandler(async (req, res, next) => {
  const nokta = await getNoktaByIdService(
    req.user._id,
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: 'Nokta retrieved successfully',
    data: nokta,
  });
});

// @desc    Update Nokta
// @route   PATCH /api/nokta/:id
// @access  Private
export const updateNokta = asyncHandler(async (req, res, next) => {
  const nokta = await updateNoktaService(
    req.user._id,
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: 'Nokta updated successfully',
    data: nokta,
  });
});

// @desc    Delete Nokta
// @route   DELETE /api/nokta/:id
// @access  Private
export const deleteNokta = asyncHandler(async (req, res, next) => {
  await deleteNoktaService(
    req.user._id,
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: 'Nokta deleted successfully',
    data: null,
  });
});

// @desc    Get all Noktas for a specific person
// @route   GET /api/nokta/person/:personId
// @access  Private
export const getAllNoktaByPerson = asyncHandler(async (req, res, next) => {
  const noktas = await getAllNoktaByPersonService(req.user._id, req.params.personId);

  res.status(200).json({
    success: true,
    message: 'Person Noktas retrieved successfully',
    data: noktas,
  });
});
