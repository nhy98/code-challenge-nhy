import mongoose, { Document, Model, Schema } from 'mongoose';

interface IResource extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const resourceSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
});

const ResourceModel: Model<IResource> = mongoose.model<IResource>('Resource', resourceSchema);

export default ResourceModel;