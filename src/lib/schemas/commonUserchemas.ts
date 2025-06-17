import { z } from 'zod';

const nameRegex = /^[a-zA-ZÀ-ÿ]+([\- '][a-zA-ZÀ-ÿ]+)*$/;

export const createNameSchema = (fieldName: string) =>
    z.string()
        .min(1, `${fieldName} is required`)
        .min(2, `${fieldName} must be at least 2 characters`)
        .max(50, `${fieldName} must be at most 50 characters`)
        .regex(nameRegex, `${fieldName} can only contain letters, spaces, hyphens or apostrophes`);

export const emailSchema = z.string()
    .min(1, 'Email is required')
    .max(254, 'Email must be at most 254 characters')
    .email('Invalid email address');