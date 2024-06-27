import express from "express"
import colors from "colors"
import cors, {CorsOptions} from "cors"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggeerSpec, {swaggerUiOptions} from "./config/swagger"

import router from "./router"
import db from "./config/db"

// Instancia de express
const server = express();

const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true);
        } else{
            callback(new Error("Error de CORS"), false)
        }
    }
}

server.use(cors(corsOptions));

// Leer datos JSON de body
server.use(express.json())

export async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.magenta("Conexión existosa a la DB"));
    } catch (error) {
        console.log(error)
        console.log(colors.bgRed.white("Error al conectar la DB"));
    }
}

connectDB();

server.use(morgan("dev"));

server.use("/api/products", router);

// For Testing
server.get("/api", (req, res) => {
    res.json({msg: "GET /api"})
})

// Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggeerSpec, swaggerUiOptions))


export default server;