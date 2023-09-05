import { Response } from 'express';
import { bugTrackingGenerator } from '../utils/bug_tracking/bug_tracking.functions';
import { MessageAPI } from '../utils/bug_tracking/bug_tracking.types';
import { replaceDynamicData } from '../utils/global';

/**
 * Función para responder al cliente con success
 * @param res response del controller
 * @param status status
 * @param body body de la respuesta en JSON
 */
export const successResponse = (res: Response, status: number, body: any): void => {
    res.status(status).json(body);
};

/**
 * Función para responder al cliente con errores
 * @param res response del controller
 * @param message mensaje de error
 * @param errorString cadena de texto del error que permite analizar que ocurrio
 * @param data data para remplazar los campos dinamicos del mensaje
 */
export const errorResponse = async (
    res: Response,
    messageAPI: MessageAPI,
    errorString: string | null,
    data?: any
): Promise<void> => {
    /**
     * Replace description MessageAPI
     */
    const description: string = replaceDynamicData(messageAPI.description, data);

    messageAPI = {
        ...messageAPI,
        description,
    };

    /**
     * Set errorString if exist
     */
    if (errorString) {
        messageAPI.errorString = errorString;
    }

    res.status(messageAPI.status).json(messageAPI);

    bugTrackingGenerator(messageAPI, errorString);
};
