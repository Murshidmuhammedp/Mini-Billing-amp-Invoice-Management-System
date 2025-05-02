import { Router } from "express";
import { addNewCustomer, blockCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer } from "../controllers/customerController.js";
import verifyToken from "../middlewares/jwtAuthValidation.js";

export const customerRouter = Router();

customerRouter.post("/addcustomer",verifyToken, addNewCustomer);
customerRouter.get("/customers", getAllCustomers);
customerRouter.get("/customer/:id", getCustomerById);
customerRouter.put("/updatecustomer/:id", updateCustomer);
customerRouter.delete("/deletecustomer/:id", deleteCustomer);
customerRouter.patch("/block/:id", blockCustomer);