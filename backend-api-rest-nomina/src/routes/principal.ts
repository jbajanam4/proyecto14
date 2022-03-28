import {Router} from "express"
import { menuPrincipal } from "../controllers/principal.controller"
import { principal3 } from "../controllers/principal.controller"
import { principal4 } from "../controllers/principal.controller"

const router = Router()
router.route("/").get(menuPrincipal);

router.route("/dpto").get(principal3);

router.route("/empl").get(principal4);
export default router;