import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const addCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category
    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//!@desc Get All category
//?@route GET /api/categories/
//?@access Private/Admin

export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const allCategories = await Category.find({});
    console.log("fetched all categories", allCategories);
    res.status(200).json(allCategories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

//!@desc Get category By ID
//?@route GET /api/categories/:id
//?@access Private/Admin

export const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//!@desc Update a category
//?@route PUT /api/categories/:id
//?@access Private/Admin

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    const newCategoryName = req.body.name;

    const existingCategory = await Category.findOne({ name: newCategoryName });

    if (existingCategory) {
      res.status(400);
      throw new Error("Category with this name already exists");
    }

    category.name = newCategoryName || category.name;

    const updatedCategory = await category.save(); // save the updated category

    res.json({
      _id: updatedCategory._id,
      name: updatedCategory.name,
    });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

//!@desc Delete category
//?@route DELETE /api/categories/:id
//?@access Private/Admin

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await Category.deleteOne({ _id: category.id });
    res.json({ message: `${category.name} Category  removed` });
  } else {
    throw new Error("Category not found");
  }
});
