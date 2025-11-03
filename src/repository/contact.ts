import { ContactModel, IContact } from "../model/contact";
interface FindAllOptions {
  skip?: number;
  limit?: number;
}
export class ContactRepository {
    async create(firstName: string, lastName: string, phone: string, email: string, company: string, message: string) {
        return await ContactModel.create({ firstName, lastName, phone, email, company, message });
    }
    async findAll(options: FindAllOptions = {}) {
        return ContactModel.find()
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .sort({ createdAt: -1 });
        }
    async findById(id: string) {
        return await ContactModel.findById(id);
    }
    async update(id: string, contact: IContact) {
        return await ContactModel.findByIdAndUpdate(id, contact, { new: true });
    }
    async delete(id: string) {
        return await ContactModel.findByIdAndDelete(id);
    }
    async count() {
        return ContactModel.countDocuments();
    }
}