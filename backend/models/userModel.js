import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: "true",
    }
  },
  { timestamps: true }
);

//! create a matchPassword (customized) function with Schema.methods to verify the userPassword

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//! Use a pre-save hook to hash the password before saving

userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT));
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Replace the plain text password with the hashed password
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = model("User", userSchema);

export default User;
