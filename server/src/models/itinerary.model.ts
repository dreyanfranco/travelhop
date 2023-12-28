import mongoose, { Schema } from "mongoose"

const itinerarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,
        set: (text: string) => text.charAt(0).toUpperCase() + text.substring(1)
    },
    cityName: {
        type: String
    },
    location: {
        type: {
            type: String
        },
        address: String,
        coordinates: [Number]
    },
    description: {
        type: String,
        required: true,
        default: 'Desconocido',
        trim: true,
    },
    itineraryImage: {
        type: String,
        trim: true
    },
    duration: {
        type: String,
        enum: ['1 día', '2 días', '3 días', '4 días', '5 días', '6 días', '7 días']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    spots: [{
        type: Schema.Types.ObjectId,
        ref: 'Spots'
    }],
    // messages: [messageSchema],

}, {
    timestamps: true
})

itinerarySchema.index({ location: "2dsphere" })

const Itinerary = mongoose.model("Itineraries", itinerarySchema)
module.exports = Itinerary