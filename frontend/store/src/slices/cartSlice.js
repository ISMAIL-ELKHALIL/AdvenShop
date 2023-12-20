// Import createSlice function from Redux Toolkit and updateCart utility function
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// Use localStorage to store the cart items; initialize state from local storage or use a default structure
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

// Create a cart slice using createSlice
const cartSlice = createSlice({
  // Specify the name of the slice
  name: "cart",
  // Provide the initial state
  initialState,
  // Define reducer functions for updating state
  reducers: {
    // Reducer for adding an item to the cart
    addToCart: (state, action) => {
      // Extract the item from the action payload
      const item = action.payload;
      // Check if the item already exists in the cart
      const existItem = state.cartItems.find((i) => i._id === item._id);

      // Update the state based on whether the item exists or not
      if (existItem) {
        // If the item exists, update the existing item in the cart
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? item : i
        );
      } else {
        // If the item doesn't exist, add it to the cart
        state.cartItems = [...state.cartItems, item];
      }

      // Update the cart and return the updated state
      return updateCart(state);
    },

    // Reducer for removing an item from the cart
    removeFromCart: (state, action) => {
      // Filter out the item with the specified ID from the cart
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      // Update the cart and return the updated state
      return updateCart(state);
    },

    // Reducer for saving the shipping address in the cart
    saveShippingAddress: (state, action) => {
      // Update the shipping address in the state
      state.shippingAddress = action.payload;

      // Update the cart and return the updated state
      return updateCart(state);
    },

    // Reducer for saving the payment method in the cart
    savePaymentMethod: (state, action) => {
      // Update the payment method in the state
      state.paymentMethod = action.payload;

      // Update the cart and return the updated state
      return updateCart(state);
    },

    // Reducer for clearing all items from the cart
    clearCartItems: (state) => {
      // Clear the cart items array
      state.cartItems = [];

      // Update the cart and return the updated state
      return updateCart(state);
    },
  },
});

// Export selector function to get the entire cart slice from the Redux store
export const selectCart = (state) => state.cart;

// Export action creators for addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, and clearCartItems
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

// Export the cart reducer to be used in the Redux store
export default cartSlice.reducer;
