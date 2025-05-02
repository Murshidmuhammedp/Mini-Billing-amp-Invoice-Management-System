import { Router } from "express";
import { salesInvoice } from "../controllers/salesController";
import verifyToken from "../middlewares/jwtAuthValidation";

const salesRouter = Router();

salesRouter.post('/sales', verifyToken, salesInvoice)

export default salesRouter;