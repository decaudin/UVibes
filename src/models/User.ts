import mongoose, { Schema, Document } from 'mongoose';

interface RefreshToken {
    token: string;
    expiresAt: Date;
    isRememberMe: boolean;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    refreshTokens: RefreshToken[];
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
    refreshTokens: {
        type: [
            { 
                token: { type: String, required: true },
                expiresAt: { type: Date, required: true },
                isRememberMe: { type: Boolean, default: false }
            }
        ],
        default: [],
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