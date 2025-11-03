import { IBlog } from "../model/blog";
import { BlogModel } from "../model/blog";

type FindAllOptions = {
    skip?: number;
    limit?: number;
}
export class BlogRepository {
    async create(title: string, content: string, author: string,date:string,time:string, imageUrls: string[]): Promise<IBlog> {
        return await BlogModel.create({ title, content, author,date,time, images: imageUrls });
    }
    async findAll(options: FindAllOptions = {}) {
        return BlogModel.find()
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .sort({ createdAt: -1 });
    }
    async count() {
        return BlogModel.countDocuments();
    }
    async findById(id: string) {
        return BlogModel.findById(id);
    }
    async update(id: string, blog: IBlog) {
        return BlogModel.findByIdAndUpdate(id, blog, { new: true });
    }
    async delete(id: string) {
        return BlogModel.findByIdAndDelete(id);
    }
}