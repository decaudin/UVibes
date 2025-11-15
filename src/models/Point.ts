import mongoose, { Schema, Document } from 'mongoose';

export interface IPoint extends Document {
    userId: string;
    name: string;
    latitude: number;
    longitude: number;
    altitude?: number;
    createdAt: Date;
}

const PointSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number },
}, { timestamps: true });

const Point = mongoose.models.Point || mongoose.model<IPoint>('Point', PointSchema);

export default Point