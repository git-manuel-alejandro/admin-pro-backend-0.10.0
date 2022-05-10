const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["hospital", "medicos", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "Debe ser médico, hostpial o usuario",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No files were uploaded.",
    });
  }

  // Procesar imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "Not valid format files",
    });
  }

  //Generar nombre archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  //Path guardar archivo
  const path = `./uploads/${tipo}/${nombreArchivo}`;
  // const path = __dirname + `/uploads/${tipo}/${nombreArchivo}`;

  // Use the mv() method to place the file somewhere on your server

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: true,
        msg: "Error al mover la imagen",
      });
    }

    //Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);
    res.json({
      ok: true,
      msg: "fileUpload",
      nombre: nombreArchivo,
    });
  });
};

module.exports = { fileUpload };
