import { Router } from "express";
import { crearAlbum, obtenerAlbum, obtenerAlbumPorId, actualizarAlbum, eliminarAlbum } from "../controllers/album.controller.js";

const router = Router();

router.post("/",crearAlbum);
router.get("/",obtenerAlbum);
router.get("/:id", obtenerAlbumPorId);
router.put("/:id", actualizarAlbum);
router.delete("/:id", eliminarAlbum);

export default router;
