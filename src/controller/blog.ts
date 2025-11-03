import { Request, Response } from "express";
import { deleteFileFromS3, uploadFileToS3 } from "../utils/s3Operations";
import { BlogRepository } from "../repository/blog";
import { IBlog } from "../model/blog";
const blogRepository = new BlogRepository();
export class BlogController {
    async create(req: Request, res: Response) {
        try {
            const { title, content, author,date,time  } = req.body;
            const files = req.files as Express.Multer.File[]; 

            const imageUrls = files? await Promise.all(
                files.map((file) =>
                uploadFileToS3(file.buffer, file.originalname, file.mimetype)
                )
            ):[];
            
            const blog = await blogRepository.create(title, content, author,date,time, imageUrls);
            res.status(201).json(blog);
        } catch (error) {
            res.status(500).json({ error: "Failed to create blog" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const blog = await blogRepository.findById(id);
            if (!blog) {
                return res.status(404).json({ error: "Blog not found" });
            }
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json({ error: "Failed to get blog" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;
            const blogs = await blogRepository.findAll({
                skip,
                limit,
            });

            const total = await blogRepository.count();
            res.status(200).json({
                data: blogs,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            })
        } catch (error) {
            res.status(500).json({ error: "Failed to get blogs" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, content, author,date,time } = req.body;
            const files = req.files as Express.Multer.File[]; 

            const existingBlog = await blogRepository.findById(id);
            if (!existingBlog) {
                return res.status(404).json({ error: "Blog not found" });
            }

            const existingImageUrls: string[] = existingBlog.images || [];

            if (files && files.length > 0) {
                    for (const url of existingImageUrls) {
                    await deleteFileFromS3(url);
                }
            }

            const imageUrls = files? await Promise.all(
                files.map((file) =>
                uploadFileToS3(file.buffer, file.originalname, file.mimetype)
                )
            ):[];

            const blog = await blogRepository.update(id, { title, content, author,date,time, images: imageUrls } as IBlog);
            if (!blog) {
                return res.status(404).json({ error: "Blog not found" });
            }
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json({ error: "Failed to update blog" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const existingBlog = await blogRepository.findById(id);
            if (!existingBlog) {
                return res.status(404).json({ error: "Blog not found" });
            }

            const existingImageUrls: string[] = existingBlog.images || [];

            for (const url of existingImageUrls) {
                 await deleteFileFromS3(url);
            }

            const blog = await blogRepository.delete(id);
            res.status(200).json({ message: "Blog deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete blog" });
        }
    }
}