import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive", "suspended"]
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }],
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;