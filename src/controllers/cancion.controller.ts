import { type Request, type Response } from "express";
import prisma from "../database/prisma.js";

export const crearCancion = async (req: Request, res: Response) => {
    const { titulo, duracion, albumId } = req.body;

    try {

        const albumExiste = await prisma.album.findUnique({
            where: {
                id: albumId,
            },
        });

        if (!albumExiste) {
            return res.status(404).json({
                mensaje: "El álbum al que se quiere agregar la canción no existe",
            });
        }

        const cancion = await prisma.cancion.create({
            data: {
                titulo,
                duracion,
                albumId,
            },
        });

        res.status(201).json(cancion);
        console.log("Canción agregada exitosamente");

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "La canción no se pudo agregar",
        });
    }
};

//Obtener cancione

export const obtenerCanciones = async (req: Request, res: Response) => {
    try {
        const canciones = await prisma.cancion.findMany();

        res.json(canciones);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener canciones",
        });
    }
};

//Obtener solo 1 canción

export const obtenerCancionPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const cancion = await prisma.cancion.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!cancion) {
            return res.status(404).json({
                mensaje: "Canción no encontrada",
            });
        }

        return res.json(cancion);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener la canción",
        });
    }
};

//actualizar cancion

export const actualizarCancion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { titulo, duracion, albumId } = req.body;

        const cancionExiste = await prisma.cancion.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!cancionExiste) {
            return res.status(404).json({
                mensaje: "La canción que desea actualizar no existe",
            });
        }

        const albumExiste = await prisma.album.findUnique({
            where: {
                id: albumId,
            },
        });

        if (!albumExiste) {
            return res.status(404).json({
                mensaje: "El álbum al que se quiere actualizar la canción no existe",
            });
        }

        const cancionActualizada = await prisma.cancion.update({
            where: {
                id: Number(id),
            },
            data: {
                titulo,
                duracion,
                albumId,
            },
        });

        return res.json(cancionActualizada);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "La canción que desea actualizar no existe",
        });
    }
};

//Eliminar cancion

export const eliminarCancion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.cancion.delete({
            where: {
                id: Number(id),
            },
        });

        res.json({
            mensaje: "Canción eliminada correctamente",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "La canción que desea eliminar no existe",
        });
    }
};