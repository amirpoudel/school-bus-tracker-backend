const { Student, Parent,StudentPickUp } = require("../schema/schema.student");




async function registerStudent(name, studentClass) {
    return await Student.create({
        name: name,
        studentClass: studentClass
    })
}


// async function registerParent(name, email, contact, address) {
//     return await Parent.create({
//         name: name,
//         email: email,
//         contact: contact,
//         address: address
//     })
// }

async function insertStudentPickUp(studentID, latitude, longitude, areaName) {
    return await StudentPickUp.create({
        studentID: studentID,
        pickUpLocation: {
            type: "Point",
            coordinates: {
                longitude:longitude,
                latitude:latitude
            },
            areaName: areaName
        },
    })

}


async function createParentWithStudent(student, parent) {
    try {
        const studentResponse = await registerStudent(student.name, student.class);
        const studentPickUp = await insertStudentPickUp(studentResponse._id, student.latitude, student.longitude, student.areaName);
        studentResponse.studentPickUp = studentPickUp._id
        await studentResponse.save()
        const parentResponse =  await Parent.create({
            name: parent.name,
            address: parent.address,
            email: parent.email,
            contact: parent.contact,
            studentID: studentResponse._id
        })
        return {studentResponse,studentPickUp,parentResponse}
    } catch (error) {
        throw error;
    }
}



async function getStudentLoction(){
    return await Student.find().populate('studentPickUp')
}



module.exports = { createParentWithStudent,getStudentLoction };












