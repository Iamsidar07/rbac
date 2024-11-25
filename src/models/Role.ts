import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: true
    }],
   
}, {timestamps: true});

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
export default Role;