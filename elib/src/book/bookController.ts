import path from "node:path";
import fs from "node:fs";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import { AuthRequest } from "../middlewares/verifyJwtToken";

const handleCreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, genre } = req.body;

    // Multer File Type
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Cover Image File upload
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const coverImageFileName = files.coverImage[0].filename;
    const coverImageFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      coverImageFileName
    );

    const coverImageUploadResult = await cloudinary.uploader.upload(
      coverImageFilePath,
      {
        filename_override: coverImageFileName,
        folder: "book-covers",
        format: coverImageMimeType,
      }
    );

    if (!coverImageUploadResult) {
      return next(
        createHttpError(500, "Error while uploading the cover image")
      );
    }

    // Book PDF upload
    const bookPdfName = files.file[0].filename;
    const bookPdfPath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookPdfName
    );

    const bookPdfUploadResult = await cloudinary.uploader.upload(bookPdfPath, {
      resource_type: "raw",
      folder: "book-pdfs",
      filename_override: bookPdfName,
    });

    if (!bookPdfUploadResult) {
      return next(createHttpError(500, "Error while uploading the book pdf"));
    }

    const _customReq = req as AuthRequest;

    const newBook = await bookModel.create({
      title,
      author: _customReq.userId,
      genre,
      coverImage: coverImageUploadResult.secure_url,
      file: bookPdfUploadResult.secure_url,
    });

    if (!newBook) {
      return next(createHttpError(500, "Error while creating the book"));
    }

    await fs.promises.unlink(coverImageFilePath);
    await fs.promises.unlink(bookPdfPath);

    res.status(201).json({ id: newBook._id });
  } catch (error) {
    console.log(`File Upload Error: ${error}`);
    return next(createHttpError(500, "Error while uploading the files"));
  }
};

export { handleCreateBook };
