import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    skinType?: number | null;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    skinType: {
        type: Number,
        required: false,
        min: 1,
        max: 6,
        default: null,
    },
},{ timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;