const { Router } = require("express");
const router = Router();
const {
  infoProfessions,
  postProfessions,
} = require("../controllers/professions");

router.get("/", async (req, res, next) => {
  try {
    let profsDb = await infoProfessions();
    res.send(profsDb);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  const { name } = req.body;
  try {
    const { isnew, newProfessional, error } = await postProfessions({ name });
    if (error) {
      res.send({ error });
      return;
    } else if (!isnew) {
      res.send({ message: "Ya existia", professional: newProfessional });
      return;
    } else {
      res.send(newProfessional);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
