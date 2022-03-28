// importar router
import { Router } from "express";
// importacion de controladores(funciones) de departamento
import {
  createDepartamento,
  deleteDepartamemto,
  getDepartamentos,
  updateDepartamento,
  getDepartamento,
} from "../controllers/departamento.controllers";
// instanciar router - ruteador
const router = Router();
// rutas de cargos con "/"
router.route("/").get(getDepartamentos).post(createDepartamento);

// rutas de cargos con un id "/:departamentoId"
router
  .route("/:departamentoId")
  .get(getDepartamento)
  .delete(deleteDepartamemto)
  .put(updateDepartamento);

export default router;

// router.route("/cargo").get( async(req, res) => {
//    const conn = await connect();
//    const cargos = await conn.query("SELECT * FROM cargo");
//    res.json(cargos[0]);
// });
