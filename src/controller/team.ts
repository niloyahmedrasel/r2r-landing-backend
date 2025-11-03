import { Request, Response } from "express";
import { deleteFileFromS3, uploadFileToS3 } from "../utils/s3Operations";
import { TeamRepository } from "../repository/team";
import { ITeam } from "../model/team";
const teamRepository = new TeamRepository();
export class TeamController {
  async create(req: Request, res: Response) {
    try {
      const { name, designation, description } = req.body;
      const file = (req.file as Express.Multer.File) || null; 

      let imageUrl = "";
      if (file) {
        imageUrl = await uploadFileToS3(file.buffer, file.originalname, file.mimetype);
      }
      const team = await teamRepository.create(name,designation,imageUrl,description);

      res.status(201).json(team);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create team" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const team = await teamRepository.findById(id);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      res.status(200).json(team);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get team" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const teams = await teamRepository.findAll();
      res.status(200).json({data:teams});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get teams" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const existingTeamMember = await teamRepository.findById(id);
        if (!existingTeamMember) {
            return res.status(404).json({ error: "Event not found" });
        }

        const existingImageUrls: string = existingTeamMember.image;

        if (existingImageUrls) {
            await deleteFileFromS3(existingImageUrls);
        }    
        const team = await teamRepository.delete(id);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete team" });
    }
  }

  async update(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name, designation, description } = req.body;
        const file = req.file as Express.Multer.File;
        
        const existingTeamMember = await teamRepository.findById(id);
        if (!existingTeamMember) {
            return res.status(404).json({ error: "Member not found" });
        }

        const existingImageUrls: string = existingTeamMember.image;

        if (file) {
            await deleteFileFromS3(existingImageUrls);
        }      
      const team = await teamRepository.update(id, { name, designation, description });
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      res.status(200).json(team);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update team" });
    }
  }
}