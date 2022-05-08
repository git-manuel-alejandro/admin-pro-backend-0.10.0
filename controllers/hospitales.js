const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
  try {
    const hospitales = await Hospital.find().populate("usuario", "nombre");
    // const hospitales = await Hospital.find({}, "nombre");

    res.json({
      ok: true,
      hospitales,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "unexpected error",
    });
  }
};

const crearHospitales = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalDB = await hospital.save();
    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "bad request",
    });
  }
};

const actualizarHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarHospitales",
  });
};

const eliminarHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: "eliminarHospitales",
  });
};

module.exports = {
  getHospitales,
  crearHospitales,
  actualizarHospitales,
  eliminarHospitales,
};
