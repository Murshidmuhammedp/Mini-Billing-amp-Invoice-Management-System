import { Router } from "express";
import { addNewProduct, deleteProduct, getAllProducts, getProductById, productblock, updateProduct } from "../controllers/productController.js";

export const productRouter = Router();

productRouter.post("/addproduct", addNewProduct);
productRouter.get("/products", getAllProducts);
productRouter.get("/product/:id", getProductById);
productRouter.put("/updateproduct/:id", updateProduct);
productRouter.delete("/deleteproduct/:id", deleteProduct);
productRouter.patch("/islisted/:id",  productblock);






