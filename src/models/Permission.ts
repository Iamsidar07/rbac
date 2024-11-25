import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
}, {timestamps: true});

const Permission = mongoose.models.Permission || mongoose.model("Permission", permissionSchema);
export default Permission;