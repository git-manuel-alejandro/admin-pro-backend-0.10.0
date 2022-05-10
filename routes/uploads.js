/*
    Ruta: /api/upload
*/
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload } = require("../controllers/uploads");

const expressfileUpload = require("express-fileupload");

const router = Router();
// default options
router.use(expressfileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload);

module.exports = router;
