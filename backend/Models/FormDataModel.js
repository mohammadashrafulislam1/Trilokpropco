import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
    option:{ type: String, required: true},
    name:{ type: String, required: true},
    email:{ type: String, required: true},
    message:{ type: String, required: true},
    option:{ type: String, required: true},
    created_at:{ type: Date, default: Date.now},
})

export const FormDataModel = mongoose.model('inquiries', formDataSchema);