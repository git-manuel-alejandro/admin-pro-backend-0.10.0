const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  // const usuarios = await Usuario.find({ nombre: regex });
  // const medico = await Medico.find({ nombre: regex });
  // const hospital = await Hospital.find({ nombre: regex });

  const [usuarios, medico, hospital] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  try {
    res.json({
      ok: true,
      msg: "getTodo",
      busqueda,
      usuarios,
      medico,
      hospital,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "unexpected error",
    });
  }
};

const getDocumentoColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;

    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;

    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "usuarios o medicos o hospitales",
      });
  }
  res.json({
    ok: true,
    resultado: data,
  });
};

module.exports = { getTodo, getDocumentoColeccion };
