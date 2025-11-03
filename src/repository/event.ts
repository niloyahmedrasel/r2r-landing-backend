import { EventModel, IEvent } from "../model/event";

type FindAllOptions = {
    skip?: number;
    limit?: number;
}
export class EventRepository{
    async create (title: string, description: string, location: string, date: string, organizer: string, images: string[]) {
        return await EventModel.create({ title, description, location, date, organizer, images });
    }
    async findAll(options: FindAllOptions = {}) {
        return EventModel.find({})
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .sort({ createdAt: -1 });
    }

    async count() {
        return EventModel.countDocuments();
    }

    async findById(id: string) {
        return await EventModel.findById(id);
    }

    async delete(id: string) {
        return await EventModel.findByIdAndDelete(id);
    }

    async update(id: string, event: IEvent) {
        return await EventModel.findByIdAndUpdate(id, event, { new: true });
    }
}