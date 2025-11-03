import { Request, Response } from "express";
import { ContactRepository } from "../repository/contact";
import { IContact } from "../model/contact";
const contactRepository = new ContactRepository();
export class ContactController {
    async create(req: Request, res: Response) {
        try {
            const { firstName, lastName, phone, email, company, message } = req.body;
            const contact = await contactRepository.create( firstName, lastName, phone, email, company, message );
            res.status(201).json(contact);
        } catch (error) {
            res.status(500).json({ error: "Failed to create contact" });
        }
    }

    async get(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;
            const contacts = await contactRepository.findAll({
                skip,
                limit,
            });

            const total = await contactRepository.count();
            res.status(200).json({data: contacts, pagination:{page, limit, total, pages: Math.ceil(total / limit)}});
        } catch (error) {
            res.status(500).json({ error: "Failed to get contacts" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const contact = await contactRepository.findById(id);
            if (!contact) {
                return res.status(404).json({ error: "Contact not found" });
            }
            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({ error: "Failed to get contact" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const contact = await contactRepository.delete(id);
            if (!contact) {
                return res.status(404).json({ error: "Contact not found" });
            }
            res.status(200).json({ message: "Contact deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete contact" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { firstName, lastName, phone, email, company, message } = req.body;
            const contact = await contactRepository.update(id, { firstName, lastName, phone, email, company, message } as IContact);
            if (!contact) {
                return res.status(404).json({ error: "Contact not found" });
            }
            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({ error: "Failed to update contact" });
        }
    }
}