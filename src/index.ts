import express, {type Request, type Response} from "express";
import albumesRoutes from "./routes/albumes.js";
import cancionesRoutes from "./routes/canciones.js";

const app = express();
const port= 3000;
app.use (express.json());

app.use("/albums", albumesRoutes);
app.use("/cancion", cancionesRoutes);

app.get ("/",(req:Request,res:Response)=>{
    res.send("Servidor funcionando");
});

app.listen(port, ()=>{
    console.log("Servidor listo " + port);
});