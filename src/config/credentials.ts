import { envOr } from './env';

export const credentials = {
    standardUser: envOr('STANDARD_USER', 'standard_user'),
    password: envOr('TTA_SECRET', 'tta_secret'),
} as const;

export const applitools = {
    username: envOr('APPLITOOLS_USERNAME', 'Admin'),
    password: envOr('APPLITOOLS_PASSWORD', 'Password@123'),
} as const;