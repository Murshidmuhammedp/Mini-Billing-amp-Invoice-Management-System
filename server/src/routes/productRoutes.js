import { Router } from "express";
import { addNewProduct, deleteProduct, getAllProducts, getProductById, productblock, updateProduct } from "../controllers/productController.js";
import verifyToken from "../middlewares/jwtAuthValidation.js";

export const productRouter = Router();

productRouter.post("/addproduct", verifyToken, addNewProduct);
productRouter.get("/products", getAllProducts);
productRouter.get("/product/:id", getProductById);
productRouter.put("/updateproduct/:id", verifyToken, updateProduct);
productRouter.delete("/deleteproduct/:id", deleteProduct);
productRouter.patch("/islisted/:id", verifyToken, productblock);






