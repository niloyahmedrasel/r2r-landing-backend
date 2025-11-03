import { TeamModel } from "../model/team";
export class TeamRepository {
    async create(name: string, designation: string, image: string, description: string) {
        return await TeamModel.create({ name, designation, image, description });
    }
    async findAll() {
        return await TeamModel.find();
    }
    async findById(id: string) {
        return await TeamModel.findById(id);
    }
    async update(id: string, data: any) {
        return await TeamModel.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id: string) {
        return await TeamModel.findByIdAndDelete(id);
    }
}