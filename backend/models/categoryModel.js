// Import necessary modules
import { Schema, model } from "mongoose";
import Product from "./productModel.js";
// Create the category schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Pre-hook to delete all products when a category is removed
categorySchema.pre("remove", async function (next) {
  try {
    // Use deleteMany to remove all products in this category
    //? this  key refers to the the deleted category
    await Product.deleteMany({ category: this._id });

    console.log(
      `All Products in the category  ${this.name} were deleted successfully.`
    );
    next();
  } catch (error) {
    console.error(
      `Error deleting products in the category ${this.name}  :`,
      error
    );
    next(error);
  }
});

// Create and export the Category model
const Category = model("Category", categorySchema);
export default Category;
