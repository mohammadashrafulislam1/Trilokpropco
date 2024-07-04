import mongoose from "mongoose";


const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    types: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Types'
    }],
    developer: {type: mongoose.Schema.Types.ObjectId, ref: 'Developer' },
    location: { type: String, required: true },
    statuses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status'
    }],
    priceRange: { type: String, required: true },
    configuration: { type: String, required: true },
    galleryImages: { type: [String], required: true },
    projectOverview: {
        possessionStart: { type: String},
        landArea: { type: String},
        configuration: { type: String},
        flatArea: { type: String},
        priceRange: { type: String},
        numberOfBlocks: { type: Number},
        elevation: { type: String},
        numberOfUnits: { type: Number},
        RegistrationNo: { type: String},
    },
    description: { type: String, required: true },
    priceDetails: {
      type: [{
        configuration: String,
        price: String,
        size: String
      }],
      required: true
    },
    plans: {
      type: [{
        planType: String,
        image: String,
        size: String,
        price: String
      }],
      required: true
    },
    pdfDownload: { type: String, required: true },
    amenities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amenity'
    }],
    nearbyFacilities: { type: String, required: true },
    locationMap: { type: String, required: true },
    specifications: { type: String, required: true },
    video: { type: String, required: true }
  });

export const PropertyMode = mongoose.model('Property', propertySchema);
