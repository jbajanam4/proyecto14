"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importar router
const express_1 = require("express");
// importacion de controladores(funciones) de cargo
const empleado_controller_1 = require("../controllers/empleado.controller");
// instanciar router - ruteador
const router = (0, express_1.Router)();
// rutas de cargos con "/"
router.route("/").get(empleado_controller_1.getEmpleados).post(empleado_controller_1.createEmpleado);
// rutas de cargos con un id "/:empleadoId"
router.route("/:empleadoId").get(empleado_controller_1.getEmpleado).delete(empleado_controller_1.deleteEmpleado).put(empleado_controller_1.updateEmpleado);
exports.default = router;
// router.route("/cargo").get( async(req, res) => {
//    const conn = await connect();
//    const cargos = await conn.query("SELECT * FROM cargo");
//    res.json(cargos[0]);
// });
