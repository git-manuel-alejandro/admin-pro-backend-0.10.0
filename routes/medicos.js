/*
    Ruta: /api/medicos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getMedicos,
  crearMedico,
  actualizarMedicos,
  eliminarMedicos,
} = require("../controllers/medicos");

const router = Router();

router.get("/", getMedicos);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "nombre médico is required").not().isEmpty(),
    check("hospital", "id hopspital must be a mongoID").isMongoId(),
    validarCampos,
  ],
  crearMedico
);
router.put("/:id", [], actualizarMedicos);
router.delete("/:id", eliminarMedicos);

module.exports = router;
