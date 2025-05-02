import { Router } from "express";
import { getDashboardData } from "../controllers/dashboardController.js";


const dashboardRouter = Router();

dashboardRouter.get("/dashboard-data", getDashboardData);

export default dashboardRouter;