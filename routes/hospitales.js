/*
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getHospitales,
  crearHospitales,
  actualizarHospitales,
  eliminarHospitales,
} = require("../controllers/hospitales");

const router = Router();

router.get("/", getHospitales);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "nombre is required").not().isEmpty(),
    validarCampos,
  ],
  crearHospitales
);
router.put("/:id", [], actualizarHospitales);
router.delete("/:id", eliminarHospitales);

module.exports = router;
