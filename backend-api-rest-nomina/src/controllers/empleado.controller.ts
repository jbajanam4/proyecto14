import { Request, Response } from "express";
import { Coneccion } from "../bd/database";
import { Iempleado } from "../interface/Empleado";
//import { Icargo } from "../interface/Cargo";
//import { Idepartamento } from "../interface/Departamento";
//import { getCargos } from "./cargo.controller";



// instanciar la clase coneccion
const conection: Coneccion = new Coneccion();
// controlador de getempleados (funcion o logica de la peticion)
export async function getEmpleados(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const conn = await conection.getConneccion();
    const empleados = await conn.query(
      "SELECT empleado.id, nombre, cedula, cargo.descripcion, departamento.descripcion AS descripcion_depa, sueldo, empleado.estado FROM empleado, cargo, departamento WHERE empleado.cargoID=cargo.id AND empleado.departamentoID=departamento.id;"
    );
    //console.log("Prueba:", empleados[0]);
    return res.json(empleados[0]);
    //const cargo = getCargos();
    //const cargo = await conn.query("SELECT * FROM cargo");
    //const departamento = await conn.query("SELECT * FROM departamento");
    //return res.json({empleados:empleados[0], cargos:cargo[0], departamentos: departamento[0]});
  } catch (err) {
    console.log(err);
  }
}


// creacion de un empleado
export async function createEmpleado(req: Request, res: Response) {
  try {
    const modEmpleado: Iempleado = req.body;
    console.log(modEmpleado);
    const conn = await conection.getConneccion();
    const empleados = await conn.query("INSERT INTO empleado SET ?", [modEmpleado]);
    res.json({ msg: "Empleado insertado Satisfactoriamente", empleado: modEmpleado });
  } catch (err) {
    console.log(err);
  }
}

// obtener un empleado mediante su id
export async function getEmpleado(req: Request, res: Response) {
  const id = req.params.empleadoId;
  const conn = await conection.getConneccion();
  const empleado = await conn.query("SELECT * FROM empleado WHERE id = ?", [id]);
  //console.log(req.params.cargoId,id);
  //res.json(req.params);
  res.json(empleado[0]);
}

// eliminar un empleado mediante su id
export async function deleteEmpleado(req: Request, res: Response) {
  const id = req.params.empleadoId;
  console.log(req.params);
  const conn = await conection.getConneccion();
  await conn.query("DELETE FROM empleado WHERE id = ?", [id]);
  res.json({
    message: "empleado eliminado",
    id,
  });
}

// actualizar o modificar o editar un empleado mediante su id
export async function updateEmpleado(req: Request, res: Response) {
  const id = req.params.empleadoId;
  const modEmpleado: Iempleado = req.body;
  const conn = await conection.getConneccion();
  await conn.query("UPDATE empleado set ? WHERE id = ?", [modEmpleado, id]);
  res.json({
    message: "Empelado actualizado",
    modEmpleado,
  });
}