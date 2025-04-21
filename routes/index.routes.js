import { Router } from "express";
import { saludo } from "../controllers/index.controllers.js";
import { con1 } from "../controllers/index.controllers.js";
import { con2 } from "../controllers/index.controllers.js";
import { con3 } from "../controllers/index.controllers.js";


const router = Router();

router.get("/",saludo);
router.get("/ping",con1);
router.get("/nom",con2);
router.get("/a/b/c",con3);

export default router;