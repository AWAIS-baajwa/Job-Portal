import express from "express";
export const router = express.Router();

router.get("/test_1", function (req, res) {
  res.send("<h1>test _ 1 is accessible </h1>");
});

router.get("/test_2", function (req, res) {
  res.send("<h1>test _ 2 is accessible </h1>");
});
