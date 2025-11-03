import { DemoModel, IDemo } from "../model/demo";

interface FindAllOptions {
  skip?: number;
  limit?: number;
}
export class DemoRepository {
    async create(name: string, email: string, company: string) {
        return await DemoModel.create({ name, email, company });
    }

    async findAll(options: FindAllOptions = {}) {
        return DemoModel.find()
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .sort({ createdAt: -1 });
    }

    async findById(id: string) {
        return await DemoModel.findById(id);
    }

    async update(id: string, demo: IDemo) {
        return await DemoModel.findByIdAndUpdate(id, demo, { new: true });
    }

    async delete(id: string) {
        return await DemoModel.findByIdAndDelete(id);
    }

    async count() {
            return DemoModel.countDocuments();
    }
}