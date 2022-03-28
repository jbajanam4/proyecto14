"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmpleado = exports.deleteEmpleado = exports.getEmpleado = exports.createEmpleado = exports.getEmpleados = void 0;
const database_1 = require("../bd/database");
//import { Icargo } from "../interface/Cargo";
//import { Idepartamento } from "../interface/Departamento";
//import { getCargos } from "./cargo.controller";
// instanciar la clase coneccion
const conection = new database_1.Coneccion();
// controlador de getempleados (funcion o logica de la peticion)
function getEmpleados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield conection.getConneccion();
            const empleados = yield conn.query("SELECT empleado.id, nombre, cedula, cargo.descripcion, departamento.descripcion AS descripcion_depa, sueldo, empleado.estado FROM empleado, cargo, departamento WHERE empleado.cargoID=cargo.id AND empleado.departamentoID=departamento.id;");
            //console.log("Prueba:", empleados[0]);
            return res.json(empleados[0]);
            //const cargo = getCargos();
            //const cargo = await conn.query("SELECT * FROM cargo");
            //const departamento = await conn.query("SELECT * FROM departamento");
            //return res.json({empleados:empleados[0], cargos:cargo[0], departamentos: departamento[0]});
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getEmpleados = getEmpleados;
// creacion de un empleado
function createEmpleado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const modEmpleado = req.body;
            console.log(modEmpleado);
            const conn = yield conection.getConneccion();
            const empleados = yield conn.query("INSERT INTO empleado SET ?", [modEmpleado]);
            res.json({ msg: "Empleado insertado Satisfactoriamente", empleado: modEmpleado });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createEmpleado = createEmpleado;
// obtener un empleado mediante su id
function getEmpleado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.empleadoId;
        const conn = yield conection.getConneccion();
        const empleado = yield conn.query("SELECT * FROM empleado WHERE id = ?", [id]);
        //console.log(req.params.cargoId,id);
        //res.json(req.params);
        res.json(empleado[0]);
    });
}
exports.getEmpleado = getEmpleado;
// eliminar un empleado mediante su id
function deleteEmpleado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.empleadoId;
        console.log(req.params);
        const conn = yield conection.getConneccion();
        yield conn.query("DELETE FROM empleado WHERE id = ?", [id]);
        res.json({
            message: "empleado eliminado",
            id,
        });
    });
}
exports.deleteEmpleado = deleteEmpleado;
// actualizar o modificar o editar un empleado mediante su id
function updateEmpleado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.empleadoId;
        const modEmpleado = req.body;
        const conn = yield conection.getConneccion();
        yield conn.query("UPDATE empleado set ? WHERE id = ?", [modEmpleado, id]);
        res.json({
            message: "Empelado actualizado",
            modEmpleado,
        });
    });
}
exports.updateEmpleado = updateEmpleado;
