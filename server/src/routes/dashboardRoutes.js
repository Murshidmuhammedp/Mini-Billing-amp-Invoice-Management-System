import { Router } from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import verifyToken from "../middlewares/jwtAuthValidation.js";


const dashboardRouter = Router();

dashboardRouter.get("/dashboard-data", verifyToken, getDashboardData);

export default dashboardRouter;