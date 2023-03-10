import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: String,
      default: null,
    }, job: {
      type: String,
    },
    bio: {
      type: String,
    },
    role: {
      type: String,
      default: "user"
    }
  },
  { timestamps: true }
);

export default mongoose.models?.User || mongoose.model("User", UserSchema);