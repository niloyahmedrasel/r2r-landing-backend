import { Request, Response } from "express";
import { DemoRepository } from "../repository/demo";
import { IDemo } from "../model/demo";
import { de } from "zod/v4/locales/index.cjs";
const demoRepository = new DemoRepository();

export class DemoController {
    async createDemo(req: Request, res: Response) {
        try {
            const { name, email, company } = req.body;
            const demo = await demoRepository.create( name, email, company );
            res.status(201).json(demo);
        } catch (error) {
            res.status(500).json({ error: "Failed to create demo" });
        }
    }

     async getDemo(req: Request, res: Response) {
         try {
             const page = parseInt(req.query.page as string) || 1;
             const limit = parseInt(req.query.limit as string) || 10;
             const skip = (page - 1) * limit;
             const demo = await demoRepository.findAll({
                 skip,
                 limit,
             });
 
             const total = await demoRepository.count();
             res.status(200).json({data: demo, pagination:{page, limit, total, pages: Math.ceil(total / limit)}});
         } catch (error) {
             res.status(500).json({ error: "Failed to get demo" });
         }
     }

    async getDemoById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const demo = await demoRepository.findById(id);
            if (!demo) {
                return res.status(404).json({ error: "Demo not found" });
            }
            res.status(200).json(demo);
        } catch (error) {
            res.status(500).json({ error: "Failed to get demo" });
        }
    }

    async updateDemo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, company } = req.body;
            const demo = await demoRepository.update(id, { name, email, company } as IDemo);
            if (!demo) {
                return res.status(404).json({ error: "Demo not found" });
            }
            res.status(200).json(demo);
        } catch (error) {
            res.status(500).json({ error: "Failed to update demo" });
        }
    }

    async deleteDemo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const demo = await demoRepository.delete(id);
            if (!demo) {
                return res.status(404).json({ error: "Demo not found" });
            }
            res.status(200).json({ message: "Demo deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete demo" });
        }
    }
}