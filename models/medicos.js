const { Schema, model } = require("mongoose");

const MedicosSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    requerid: true,
  },
  hospitales: {
    type: Schema.Types.ObjectId,
    ref: "Hospitales",
    requerid: true,
  },
});

HospitMedicos.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Medicos", HospitMedicos);
