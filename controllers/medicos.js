const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getMedicos",
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// const crearMedicos = async (req, res = response) => {
//   const uid = req.uid;
//   const medico = new Medico({ usuario: uid, ...req.body });
//   try {
//     const medicolDB = await medico.save();
//     res.json({
//       ok: true,
//       medico: medicolDB,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       ok: false,
//       msg: "error",
//     });
//   }
// };

const actualizarMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarMedicos",
  });
};

const eliminarMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "eliminarMedicos",
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedicos,
  eliminarMedicos,
};
