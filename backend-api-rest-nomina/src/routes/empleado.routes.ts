// importar router
import { Router } from "express";
// importacion de controladores(funciones) de cargo
import {
  createEmpleado,
  deleteEmpleado,
  getEmpleado,
  getEmpleados,
  updateEmpleado,
} from "../controllers/empleado.controller";
// instanciar router - ruteador
const router = Router();
// rutas de cargos con "/"
router.route("/").get(getEmpleados).post(createEmpleado);

// rutas de cargos con un id "/:empleadoId"
router.route("/:empleadoId").get(getEmpleado).delete(deleteEmpleado).put(updateEmpleado);

export default router;

// router.route("/cargo").get( async(req, res) => {
//    const conn = await connect();
//    const cargos = await conn.query("SELECT * FROM cargo");
//    res.json(cargos[0]);
// });
