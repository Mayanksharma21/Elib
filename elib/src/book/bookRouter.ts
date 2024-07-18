import path from "node:path";
import express from "express";
import multer from "multer";
import { handleCreateBook } from "./bookController";
import verifyJwtToken from "../middlewares/verifyJwtToken";

const bookRouter = express.Router();

const fileUpload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 1e7 }, // Limit is 10MB
});

bookRouter.route("/").post(
  verifyJwtToken,
  fileUpload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  handleCreateBook
);

export default bookRouter;
