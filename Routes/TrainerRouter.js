const express = require("express");
const { postData, getAllData, updateData, deleteData, postTrainingTypeData,
    getTrainingTypeAllData, updateTrainingTypeData, deleteTrainingTypeData } =
    require("../Controllers/TrainerController")
const { requireAuth } = require("../Middlewares/requireAuth");
const router = express.Router();

router.get("/", getAllData)
router.post("/", requireAuth, postData)
router.put("/:id", updateData)
router.delete("/:id", deleteData)
router.get("/trainingtype/", getTrainingTypeAllData)
router.post("/trainingtype/", requireAuth, postTrainingTypeData)
router.put("/trainingtype/:id", updateTrainingTypeData)
router.delete("/trainingtype/:id", deleteTrainingTypeData)

module.exports = router;