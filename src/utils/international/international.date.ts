import moment, { default as momentTz } from 'moment-timezone';
import { TIMEZONE_TYPE } from './international.schema';
import { DEFAULT_COUNTRY } from './internacional.config';

export interface IFullDate {
    fullYear: number;
    month: string;
    day: string;
    hours: string;
    minutes: string;
    seconds: string;
}

/**
 * Define the default country
 */

export const defaultCountryCurrentDate = moment().tz(DEFAULT_COUNTRY.timeZone).format();

/**
 *
 * @param stringDate
 * @returns
 */
export const getFullDate = (stringDate: string): IFullDate => {
    const date: Date = new Date(stringDate);

    return {
        fullYear: date.getFullYear(),
        month: addCeroNumber(date.getMonth() + 1),
        day: addCeroNumber(date.getDate()),
        hours: addCeroNumber(date.getHours()),
        minutes: addCeroNumber(date.getMinutes()),
        seconds: addCeroNumber(date.getSeconds()),
    };
};

/**
 * checkDateString
 * @param stringDate
 * @returns
 */
export const checkDateString = (stringDate: string): Promise<IFullDate> => {
    return new Promise<IFullDate>((resolve, reject) => {
        try {
            const date: Date = new Date(stringDate);

            if (
                !(
                    getFullDate(date.toString()).day === 'NaN' ||
                    getFullDate(date.toString()).month === 'NaN' ||
                    getFullDate(date.toString()).hours === 'NaN' ||
                    getFullDate(date.toString()).minutes === 'NaN' ||
                    getFullDate(date.toString()).seconds === 'NaN'
                )
            ) {
                resolve(getFullDate(stringDate));
            } else {
                reject();
            }
        } catch (error: any) {
            reject(error.toString());
        }
    });
};
/**
 * addCeroNumber
 * @param number
 * @returns string
 */
export const addCeroNumber = (number: number): string => {
    return number <= 9 ? `0${number}` : `${number}`;
};

/**
 * Obtenemos la hora en formato UTC (0)
 * @param clientDate fecha del cliente
 * @param clientTimeZone timezone del cliente
 * @returns Fecha en formato UTC
 */
export const getUTCDate = (clientDate: string, clientTimeZone: TIMEZONE_TYPE): string => {
    return momentTz.tz(clientDate, clientTimeZone).utc().format();
};

/**
 * Obtenemos la fecha en formato local de acuerdo a su timezone
 * @param clientUTCDate fecha UTC del cliente
 * @param clientTimeZone timezone del cliente
 * @returns Fecha en formato local de acuerdo a su timezone
 */
export const getLocalDate = (
    clientUTCDate: string,
    clientTimeZone: TIMEZONE_TYPE
): string => {
    return momentTz.tz(clientUTCDate, clientTimeZone).format();
};

/**
 * USE
 */

// Fecha simulada de los clientes en su formato local y su timezone
// const currentDateEC = moment().tz(DEFAULT_COUNTRY.timeZone).format();
// console.log('Hora Ecuador: ' + currentDateEC);

// Fecha para guardar en la base de datos
// const UTCDate = getUTCDate(currentDateEC, DEFAULT_COUNTRY.timeZone);
// console.log('Hora UTC: ' + UTCDate);

// Fecha a mostrar en la aplicación dependiente del cliente / Pais
// const localDate = getLocalDate(UTCDate, DEFAULT_COUNTRY.timeZone);
// console.log('Hora Ecuador: ' + localDate);
//https://medium.com/mr-leo/dealing-with-timezone-and-moment-js-handling-be9a5fcb9c31
