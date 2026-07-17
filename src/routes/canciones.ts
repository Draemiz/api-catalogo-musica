import { Router, type Request, type Response, type NextFunction } from "express";
import { crearCancion, obtenerCanciones, obtenerCancionPorId, actualizarCancion, eliminarCancion } from "../controllers/cancion.controller.js";
import { error } from "node:console";

const router = Router();

//Middleware

const verificarDuración = (req:Request, res:Response, next: NextFunction)=>{
    const duracion = req.body.duracion;
    if (duracion <30 || duracion > 600){
        return res.status(400).json({
            error:"La duracion debe ser entre 30 seg y 600 seg"
        });
    }
    next();
};

//Rutas
router.post("/", verificarDuración, crearCancion);
router.get("/", obtenerCanciones);
router.delete("/:id", eliminarCancion);
router.get("/:id", obtenerCancionPorId);
router.put("/:id", actualizarCancion);

export default router;