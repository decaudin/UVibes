import { z } from 'zod';

const nameRegex = /^[a-zA-ZÀ-ÿ]+([\- '][a-zA-ZÀ-ÿ]+)*$/;

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/;

export const createIdentitySchema = (fieldKey: string) =>
    z.string()
        .trim()
        .min(1, `${fieldKey}Required`)
        .min(2, `${fieldKey}TooShort`)
        .max(50, `${fieldKey}TooLong`)
        .regex(nameRegex, `${fieldKey}Invalid`);

export const passwordSchema = z.string()
    .trim()
    .min(1, 'passwordRequired')
    .min(8, 'passwordTooShort')
    .max(64, 'passwordTooLong')
    .regex(passwordRegex, 'passwordInvalid');

export const emailSchema = z.string()
    .trim()
    .min(1, 'emailRequired')
    .max(254, 'emailTooLong')
    .email('emailInvalid');