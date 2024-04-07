import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    regularRate: {
        type: Number,
        required: true,
    },
    discountedRate: {
        type: Number,
        required: true,
    },
    plotSize: {
        type: Number,
        required: true,
    },
    amenities: {
        type: String,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
  }, {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;