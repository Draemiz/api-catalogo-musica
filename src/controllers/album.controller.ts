import {type Request, type Response} from "express";
import prisma from "../database/prisma.js";

export const crearAlbum = async (req:Request, res:Response) =>{
    const {titulo, artista, anio, generoId}=req.body;
    try{
        const album = await prisma.album.create({
          data:{
            titulo, artista, anio, generoId,
          }  
        })
        res.status(201).json(album)
        console.log("album agregado exitosamente");
    } catch (error){
        console.error (error);
        res.status(500).json({
            mensaje:"album no se agrego",
        })
    }
}

export const obtenerAlbum = async (req:Request, res:Response) =>{
    try {
        const albumes =await prisma.album.findMany();
        res.json (albumes);

    } catch (error) {
        console.error (error);
        res.status(500).json({
            mensaje:"error al obtener album",
        })
    }
    
} 

//Ontener solo 1 album por ID con sus canciones

export const obtenerAlbumPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const album = await prisma.album.findUnique({
            where: {
                id: Number(id),
            },
            include:{
                canciones:true,
            }
        });

        if (!album) {
            return res.status(404).json({
                mensaje: "Álbum no encontrado",
            });
        }

        return res.json(album);

    } catch (error) {
        return res.json({
            mensaje: "Error al obtener el álbum",
        });
    }
};

//put - actualizar

export const actualizarAlbum = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { titulo, artista, anio } = req.body;

        const albumActualizado = await prisma.album.update({
            where: {
                id: Number(id),
            },
            data: {
                titulo,
                artista,
                anio,
            },
        });

        return res.json(albumActualizado);

    } catch (error) {
        return res.json({
            mensaje: "Error al actualizar el álbum",
        });
    }
};

// delete - eliminar album

export const eliminarAlbum = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.album.delete({
            where: {
                id: Number(id),
            },
        });

        return res.json({
            mensaje: "Álbum eliminado correctamente",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "El álbum que desea eliminar no existe ",
        });
    }
};