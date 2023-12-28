import mongoose from "mongoose";

const spotSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,
    },
    image: {
        type: String,
        trim: true
    },
    location: {
        type: {
            type: String
        },
        address: String,
        coordinates: [Number]
    }
}, {
    timestamps: true
})
spotSchema.index({ location: '2dsphere' })

const Spot = mongoose.model("Spot", spotSchema);

export default Spot