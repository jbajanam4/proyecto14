import { Empleado } from "./componente.js";
import { Cargo } from "../cargo/componente.js";
import { Departamento } from "../departamento/componente.js";


// instanciamos empleado
const serEmpleado = new Empleado();
const serCargo = new Cargo();
const serDepartamento = new Departamento();
const d = document;
const $formEmpleado = d.getElementById("form-empleado");
d.addEventListener("DOMContentLoaded", serEmpleado.obtenerEmpleados(), serCargo.obtenerCargos(true), serDepartamento.obtenerDepartamentos(true));
// delegacion de eventos
d.addEventListener("click", async (e) => {
  console.log(e.target);
  if (e.target.matches("#enviar")) {
    //alert("has hecho click")
    e.preventDefault();
    let $nombre = d.getElementById("nombre").value;
    let $cedula = d.getElementById("cedula").value;
    let $cargo = d.getElementById("cargo").value;
    let $departamento = d.getElementById("departamento").value;
    let $sueldo = d.getElementById("sueldo").value;
    let $estado = d.getElementById("activo").checked;
    var inValid = false;
    inValid=validate(inValid,$nombre, 3);
    inValid=validate(inValid,$cedula,6);
    inValid=validate(inValid,$cargo,1);
    inValid=validate(inValid,$departamento,1);
    inValid=validate(inValid,$sueldo,1);
    if (inValid) {
      alert("Datos vacios o incompletos");
    } else {
      if (serEmpleado.grabar) {
        let date = new Date();
        var dategen =(date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]);
        //console.log("fecha:", dategen)
        const empleado = {
          nombre: $nombre,
          cedula: $cedula,
          cargoID: $cargo,
          departamentoID: $departamento,
          sueldo: $sueldo,
          estado: $estado,
          create_at: dategen,
        };
        const empleadoJson = JSON.stringify(empleado);
        const res = await serEmpleado.insertarDatos(empleadoJson);
      } else {
        let id = serEmpleado.id;
        const empleado = { nombre:$nombre,cedula:$cedula, cargoID:$cargo, departamentoID:$departamento, sueldo:$sueldo, estado: $estado };
        const empleadoModJson = JSON.stringify(empleado);
        const res = await serEmpleado.modificarDatos(empleadoModJson, serEmpleado.id);
      }
      $formEmpleado.reset();
    }
  }
});
function validate(invalid, val, len) {
  if (invalid) {
    return invalid;
  } else if (val == null || val.trim().length < len) {
    return true
  }
}
