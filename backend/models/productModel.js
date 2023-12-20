import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    // Reference to the User model
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    isAppropriate: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    // Reference to the User model
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // Reference to the Category model
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: Array,
      required: true,
    },

    price: {
      type: Number,
      require: true,
    },

    sizes: {
      type: Array,
    },

    description: {
      type: String,
      required: true,
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  { timestamps: true }
);


const Product = model("Product", productSchema);

export default Product;
