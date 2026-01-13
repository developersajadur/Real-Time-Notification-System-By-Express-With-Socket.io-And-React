import status from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { categoryService } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Category Created Successfully',
    data: category,
  });
});

const getAllCategoryByQuery = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategoryByQuery(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Categories Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category Retrieved Successfully',
    data: category,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category Updated Successfully',
    data: category,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category Deleted Successfully',
    data: null,
  });
});

export const categoryController = {
  createCategory,
  getAllCategoryByQuery,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
