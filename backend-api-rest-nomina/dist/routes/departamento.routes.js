"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importar router
const express_1 = require("express");
// importacion de controladores(funciones) de departamento
const departamento_controllers_1 = require("../controllers/departamento.controllers");
// instanciar router - ruteador
const router = (0, express_1.Router)();
// rutas de cargos con "/"
router.route("/").get(departamento_controllers_1.getDepartamentos).post(departamento_controllers_1.createDepartamento);
// rutas de cargos con un id "/:departamentoId"
router
    .route("/:departamentoId")
    .get(departamento_controllers_1.getDepartamento)
    .delete(departamento_controllers_1.deleteDepartamemto)
    .put(departamento_controllers_1.updateDepartamento);
exports.default = router;
// router.route("/cargo").get( async(req, res) => {
//    const conn = await connect();
//    const cargos = await conn.query("SELECT * FROM cargo");
//    res.json(cargos[0]);
// });
