import { Router } from "express";
import { products } from "../../fakeDB/fakeProducts.js";

export const router = Router();

// Read All Products (พร้อม Search Query String)
router.get("/", (req, res, next) => {
  try {
    const { search } = req.query;

    // ถ้ามีการส่ง ?search= มา ให้ filter กรองตามชื่อที่พิมพ์หามา
    if (search) {
      const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
      return res.json(filteredProducts);
    }

    // ถ้าไม่มี search ส่งมา ก็คืนค่า products ทั้งหมด
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// Read One Product by ID
router.get("/:id", (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});
