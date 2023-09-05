import fs from 'fs';
import { MessageAPI } from './bug_tracking.types';

/**
 * Funcion para registrar el error en el almacenador de archivos (file_store)
 * @param messageAPI el mensaje de error que se le envía al cliente
 * @param errorString el error en string para poder comprender lo que esta sucediendo
 */
export const bugTrackingGenerator = (
    messageAPI: MessageAPI,
    errorString: string | null
): void => {
    const date: Date = new Date();

    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const fullYear: number = date.getFullYear();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    const time = `${hours}-${minutes}-${seconds}`;

    const fileStorePath = `./file_store`;
    if (!fs.existsSync(fileStorePath)) {
        fs.mkdirSync(fileStorePath);
    }

    const bugTrackingPath = `./file_store/bug_tracking`;
    if (!fs.existsSync(bugTrackingPath)) {
        fs.mkdirSync(bugTrackingPath);
    }

    const completePath = `./file_store/bug_tracking/${fullYear}-${month}-${day}`;

    if (!fs.existsSync(completePath)) {
        fs.mkdirSync(completePath);
    }
    /*
     * Escribimos el archivo con el error generado
     */
    const errorFilePath = `${completePath}/${time}.json`;

    fs.writeFileSync(
        errorFilePath,
        JSON.stringify({ ...messageAPI, errorString: errorString })
    );
};

/**
 * Obtener el string del error
 * @param error
 * @returns
 */
export const getErrorString = (error: any): string => {
    if (error instanceof Error) {
        return error.message;
    }

    // if (error.toString()) {
    //     return error.toString();
    // }

    return error;
};
