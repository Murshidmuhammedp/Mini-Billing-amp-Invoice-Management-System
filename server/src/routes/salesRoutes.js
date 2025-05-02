import { Router } from "express";
import { addInvoice, deleteSale, getAllSales, updateSaleIsPaid } from "../controllers/salesController.js";
import verifyToken from "../middlewares/jwtAuthValidation.js";

const salesRouter = Router();

salesRouter.post('/sales', verifyToken, addInvoice);
salesRouter.get('/listSales', verifyToken, getAllSales);
salesRouter.delete('/deletesale', verifyToken, deleteSale);
salesRouter.patch('/paymentstatus/:id', updateSaleIsPaid)

export default salesRouter;