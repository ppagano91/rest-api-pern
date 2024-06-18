import express from "express"
import colors from "colors"
import router from "./router"
import db from "./config/db"

const server = express();

async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.magenta("Conexión existosa a la DB"));
    } catch (error) {
        console.log(error)
        console.log(colors.bgRed.white("Error al conectar la DB"));
    }
}

connectDB();

server.use("/api/products", router);

export default server;