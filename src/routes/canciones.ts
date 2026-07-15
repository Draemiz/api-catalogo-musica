import { Router } from "express";
import { crearCancion, obtenerCanciones, obtenerCancionPorId, actualizarCancion, eliminarCancion } from "../controllers/cancion.controller.js";

const router = Router();

router.post("/", crearCancion);
router.get("/", obtenerCanciones);
router.delete("/:id", eliminarCancion);
router.get("/:id", obtenerCancionPorId);
router.put("/:id", actualizarCancion);

export default router;