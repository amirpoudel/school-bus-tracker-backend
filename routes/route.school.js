const { handleRegisterParentWithStudent, handleGetStudentLocation } = require("../controllers/controller.student");

const router = require("express").Router();


router.get("/busLocation/historyLocation",);

//router.post("/routes")

router.post("/student/register",handleRegisterParentWithStudent)
router.get("/student/location",handleGetStudentLocation)

module.exports = router;
