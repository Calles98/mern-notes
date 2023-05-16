import "dotenv/config"
import express, { Response, Request, NextFunction } from 'express';
import notesRoutes from "./routes/notes"
import userRoutes from "./routes/users"
import morgan from "morgan"; 
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session'; 
import env from "./util/validateEnv"; 
import MongoStore from "connect-mongo"
import { requireAuth } from "./middleware/auth";

const app = express(); 

app.use(morgan("dev"));

app.use(express.json()); 

app.use(session({
    secret: env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/NotesAppDB"
    })
}));

app.use("/api/users", userRoutes);    
app.use("/api/notes", requireAuth, notesRoutes);     

// Middleware to handle errors in non existant routes
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found")); 
});

//Error Handler middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occured";
    let statusCode = 500;  
    if (isHttpError(error)) {
        statusCode = error.status; 
        errorMessage = error.message; 
    }
    res.status(statusCode).json({error: errorMessage});
    

});

export default app; 