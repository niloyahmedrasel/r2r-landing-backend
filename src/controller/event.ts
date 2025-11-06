import { Request, Response } from "express";
import { deleteFileFromS3, uploadFileToS3 } from "../utils/s3Operations";
import { EventRepository } from "../repository/event";
import { IEvent } from "../model/event";
const eventRepository = new EventRepository();
export class EventController{
    async create (req: Request, res: Response) {
        try {
            const { title, description, location,organizer,date } = req.body;

            const files = req.files as Express.Multer.File[]; 
            const imageUrls = files? await Promise.all(
                files.map((file) =>
                uploadFileToS3(file.buffer, file.originalname, file.mimetype)
                )
            ):[];

            const event = await eventRepository.create(title,description,location,date,organizer,imageUrls);

            res.status(201).json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create event" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;
            const events = await eventRepository.findAll({
                skip,
                limit,
            });

            const total = await eventRepository.count();
            res.status(200).json({
                data: events,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to get events" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const event = await eventRepository.findById(id);
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
            res.status(200).json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to get event" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const existingEvent = await eventRepository.findById(id);
            if (!existingEvent) {
                return res.status(404).json({ error: "Event not found" });
            }

            console.log(existingEvent);

            const existingImageUrls: string[] = existingEvent.images || [];

            for (const url of existingImageUrls) {
                 await deleteFileFromS3(url);
            }

            const event = await eventRepository.delete(id);
            res.status(200).json({ message: "Event deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to delete event" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, description, location,organizer,date } = req.body;
            const files = req.files as Express.Multer.File[]; 

            const existingEvent = await eventRepository.findById(id);
            if (!existingEvent) {
                return res.status(404).json({ error: "Event not found" });
            }

            const existingImageUrls: string[] = existingEvent.images || [];

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

            const event = await eventRepository.update(id, { title,description,location,date,organizer,images:imageUrls } as IEvent);
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
            res.status(200).json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to update event" });
        }
    }
}