const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getHospitales",
  });
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
