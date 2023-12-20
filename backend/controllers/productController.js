import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import OpenAI from "openai";
import { config } from "dotenv";
config();

//! Configuration of openAi API
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_AI_KEY,
  // dangerouslyAllowBrowser: true,
});

//! free AI models to  use
const FreeAIModels = [
  "nousresearch/nous-capybara-7b",
  "mistralai/mistral-7b-instruct",
  "huggingfaceh4/zephyr-7b-beta",
  "openchat/openchat-7b",
  "undi95/toppy-m-7b",
  "gryphe/mythomist-7b",
  "openrouter/cinematika-7b",
];
//? just simple function to get a free model random
function getRandomAIModel() {
  const randomIndex = Math.floor(Math.random() * FreeAIModels.length);
  return FreeAIModels[randomIndex];
}

//! @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, description } = req.body;

  const image = (await req.files) ? req.files.map((file) => file.path) : null;
  console.log("req files ", req.files);
  console.log("req file ", req.file);
  console.log("name ", name);
  console.log("price ", price);
  console.log("image ", image);
  const product = new Product({
    name,
    price,
    user: req?.user?._id,
    image,
    category: new mongoose.Types.ObjectId(category),
    countInStock: 5,
    description,
  });

  if (product) {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//! @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  //?  Descending the newest products will appear first in the sorted list.
  const products = await Product.find({}).sort({ createdAt: "desc" });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Not Product ");
  }
});

//! @desc Fetch  a product
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  return res.status(200).send(product);
});

//! @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//! @desc Update product
// @route UPDATE /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { name, price, category, description } = req.body;
  console.log('jgugu',name, price, category, description)

  const image = req.files ? req.files.map((file) => file.path) : null;
  console.log("req file ", req.file);

  // Assuming you have a method like `Product.findById` to find the existing product
  const existingProduct = await Product.findById(productId);

  if (existingProduct) {
    existingProduct.name = name || existingProduct.name;
    existingProduct.price = price || existingProduct.price;
    existingProduct.category = category || existingProduct.category;
    existingProduct.description = description || existingProduct.description;

    if (image) {
      existingProduct.image = image;
    }

    const updatedProduct = await existingProduct.save();
    console.log("updated product", updatedProduct);
    console.log("existingProduct", existingProduct);
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

/**
 *!@description Create a new product review
 * @route POST /api/products/:id/reviews
 * @access Private
 */

const createProductReview = asyncHandler(async (req, res) => {
  // Extracting product ID, rating, or comment from the request body
  const { id } = req.params;
  const { rating, comment } = req.body;

  // Find the product by ID
  const product = await Product.findById(id);

  // Check if the product exists
  if (product) {
    // Check if the user has already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    // If the user has already reviewed, return an error
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    //! verify if the comment of the feedback is appropriate with OpenAi
    const isReviewAppropriate = await openai.chat.completions.create({
      model: getRandomAIModel(),
      messages: [
        {
          role: "user",
          content: `Customer comment :"${comment.toString()}" Is this an appropriate and respectful feedback comment true or false?`,
        },
        {
          role: "system",
          content:
            "You are a Robot that reads customers comments on our product and check if the comment are appropriate and respectful (no bad cursing,adultery words ), you are only allowed to response with one number 1 if true or 0 if false",
        },
      ],
    });

    console.log("isReviewAppropriate", isReviewAppropriate);
    console.log("Ai response,", isReviewAppropriate.choices[0].message.content);
    if (Number(isReviewAppropriate.choices[0].message.content) === 1) {
      // Create a new review object
      const newReview = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
        isAppropriate: true,
      };

      // Add the new review to the product's reviews array
      product.reviews.push(newReview);
      product.numReviews = product.reviews.length;

      // Calculate the average rating of the product based on all reviews
      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;

      // Save the updated product
      await product.save();

      // Send a success response
      res.status(200).json({ message: "Review added successfully" });
    } else {
      // Create a new review object
      const newReview = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
        isAppropriate: false,
      };

      // Add the new review to the product's reviews array
      product.reviews.push(newReview);
      product.numReviews = product.reviews.length;

      // Calculate the average rating of the product based on all reviews
      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;

      // Save the updated product
      await product.save();

      res.status(200).json({
        message:
          "We sincerely apologize that your experience with our product did not meet your expectations,",
      });
    }
  } else {
    // If the product is not found, return a 404 error
    res.status(404);
    throw new Error("Resource not found");
  }
});

/**
 *!@description Create a new product review
 * @route POST /api/products
 * @access Public
 */

const filterProducts = async (req, res) => {
  try {
    const { name, description, category, minPrice, maxPrice, rating } =
      req.query;

    // Create an object to build the search query
    const searchQuery = {};
    // Add filters based on query parameters
    if (name) {
      searchQuery["name"] = { $regex: new RegExp(name, "i") };
    }

    if (description) {
      searchQuery["description"] = { $regex: new RegExp(description, "i") };
    }

    if (category) {
      searchQuery["category"] = category;
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      searchQuery["price"] = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      searchQuery["price"] = { $gte: Number(minPrice) };
    } else if (maxPrice !== undefined) {
      searchQuery["price"] = { $lte: Number(maxPrice) };
    }

    if (rating) {
      searchQuery["rating"] = { $eq: Number(rating) };
    }
    // Use the search query to find matching products
    const searchedProducts = await Product.find(searchQuery).sort({
      price: "desc",
    });

    // Send the search results as a JSON response
    return res.status(200).json(searchedProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

/*------------------------STATISTICS--------------------*/

//! @desc Get product count by day
// @route GET /api/products/count-by-day
// @access Private/Admin
const getProductCountByDay = asyncHandler(async (req, res) => {
  const productCountByDay = await Product.aggregate([
    {
      $group: {
        _id: {
          day: { $dayOfYear: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  if (!productCountByDay) {
    res.status(404);
    throw new Error("No data found");
  }

  return res.status(200).json(productCountByDay);
});

const getProductsCountByCategory = asyncHandler(async (req, res) => {
  const productsCountByCategory = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "categories", // name of the categories collection
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: 0,
        name: "$category.name",
        count: 1,
      },
    },
  ]);

  if (!productsCountByCategory) {
    res.status(404);
    throw new Error("No data found");
  }

  res.json(productsCountByCategory);
});

export {
  getProducts,
  getProductById,
  createProductReview,
  createProduct,
  filterProducts,
  getProductCountByDay,
  updateProduct,
  deleteProduct,
  getProductsCountByCategory,
};
