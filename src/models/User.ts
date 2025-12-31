import mongoose, { Schema, Document } from 'mongoose';

interface RefreshToken {
    token: string;
    expiresAt: Date;
    isRememberMe: boolean;
}

interface ResetPasswordToken {
    token: string;
    expiresAt: Date;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    isOAuth: boolean;
    refreshTokens: RefreshToken[];
    resetPasswordTokens: ResetPasswordToken[];
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
        required: function (this: IUser) { return !this.isOAuth },
        select: false,
    },
    isOAuth: { 
        type: Boolean, 
        default: false 
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
    resetPasswordTokens: {
        type: [
            {
                token: { type: String, required: true, select: false },
                expiresAt: { type: Date, required: true, select: false },
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