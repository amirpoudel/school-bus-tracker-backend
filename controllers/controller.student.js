
const { createParentWithStudent, getStudentLoction } = require("../models/mongoDB/services/service.student");
const { createRouteNode } = require("../models/neo4j/services/service.route");

const handleRegisterParentWithStudent = async (req, res) =>{
    const{student,parent} = req.body;

    try {
        const response = await createParentWithStudent(student,parent)
        console.log(response);
       // after create parent and student - init student pickup location in graph
        const studentNode = {
            studentID: response?.studentResponse?._id.toString(),
            name: response?.studentResponse?.name,
            latitude: response?.studentPickUp?.pickUpLocation?.coordinates?.latitude,
            longitude: response?.studentPickUp?.pickUpLocation?.coordinates?.longitude,
            areaName: student.areaName
       };
       console.log("This is student node ",studentNode)
        // creating student node in graph
        const graphResponse = await createRouteNode(studentNode);
        console.log("This is Graph Response ",graphResponse)
        return res.status(200).json({message:"Register Successfull"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Error"})
    }
}

const handleGetStudentLocation = async (req,res) =>{
    try {
        
        const response = await getStudentLoction();
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Error"})
    }
}



module.exports ={handleRegisterParentWithStudent,handleGetStudentLocation}