const { Router } = require("express");
const {
  getAllProfesional,
  postAProfesional,
  putProfesional,
  delProfesional,
  getProfessioanlById,
} = require("../controllers/professionalController");
const router = Router();

router.get("/", getAllProfesional);
router.get("/:id", getProfessioanlById);

router.post("/", postAProfesional);

router.put("/:id", putProfesional);

router.delete("/:id", delProfesional);

module.exports = router;
