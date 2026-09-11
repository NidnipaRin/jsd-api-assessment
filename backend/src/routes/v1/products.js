import { Router } from "express";
import { products } from "../../fakeDB/fakeProducts.js";

export const router = Router();

// Read products (GET /)
router.get("/", (req, res, next) => {
  try {
    const { search } = req.query;

    // ถ้ามีการส่ง ?search= มา ให้ filter ตามชื่อ
    if (search) {
      const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
      return res.json(filteredProducts);
    }

    // ถ้าไม่มี search ส่งมา ก็คืนค่า products ทั้งหมด
    res.json(products);
  } catch (err) {
    next(err);
  }
});
