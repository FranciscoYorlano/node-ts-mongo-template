import jwt from 'jsonwebtoken';
import { authMessages } from './bug_tracking/bug_tracking.messages';
/**
 * KEY_JWT
 */
const KEY_JWT = `${process.env.KEY_JWT}`;
/**
 * generateToken
 * @param payload
 * @param expiresIn
 * @returns token
 */
export const generateToken = (payload: Payload, expiresIn = 180): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        try {
            const generatedtoken: string = jwt.sign(payload, KEY_JWT, {
                expiresIn,
            });
            resolve(generatedtoken);
        } catch (error) {
            reject(error);
        }
    });
};
/**
 * verifyToken
 * @param token
 * @returns decoded
 */
export const verifyToken = (token: string): Promise<Payload> => {
    return new Promise<Payload>((resolve, reject) => {
        try {
            jwt.verify(token, KEY_JWT, (err, payload: Payload | any) => {
                if (payload != undefined && typeof payload == 'object') {
                    resolve(payload);
                } else {
                    reject(authMessages.UNAUTHORIZED);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

export interface Payload {
    iat?: number;
    exp?: number;
}

export interface SignInPayload extends Payload {
    id: string;
}
