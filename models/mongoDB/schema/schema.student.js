const mongoose = require("mongoose");

const { Schema } = mongoose;

const studentSchema = new Schema({
    name: String,
    studentClass: String,
    studentPickUp: {
        type: Schema.Types.ObjectId,
        ref: 'StudentPickUp'
    }
});

const studentPickUpSchema = new Schema({
    studentID: {
        type: mongoose.Types.ObjectId, ref: 'Student'
    },
    pickUpLocation: {
        type: {
            type: String,
            enum: ['Point'],
            require: true
        },
        coordinates: {
            type: {
                longitude: {
                    type: Number,
                    required: true
                },
                latitude: {
                    type: Number,
                    required: true
                }
            },
            required: true
        },
        areaName: {
            type: String,
            required: true
        }
    }
})
//indexing pickUpLocation
studentPickUpSchema.index({ pickUpLocation: '2dsphere' })


const parentSchema = new Schema({
    name: String,
    address: String,
    email: {
        type: String,
        unique: true,
    },
    contact: {
        type: String,
        unique: true
    },

    studentID: {
        type: mongoose.Types.ObjectId, ref: 'Student'
    }

})

const Student = mongoose.model("Student", studentSchema);
const Parent = mongoose.model("Parent", parentSchema);
const StudentPickUp = mongoose.model("StudentPickUp", studentPickUpSchema);


module.exports = { Student, Parent, StudentPickUp }
