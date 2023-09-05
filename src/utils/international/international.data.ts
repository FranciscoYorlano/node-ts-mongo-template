import { ICountry } from './international.schema';

/**
 * Countries to the application
 */
export const countries: ICountry[] = [
    {
        name: 'Argentina',
        abbreviation: 'ARG',
        timeZone: 'America/Argentina/Buenos_Aires',
        UTCReference: '-3',
        currency: 'ARS',
        onlinePaymentMethod: 'MERCADOPAGO',
        language: 'ES',
        minimumWage: 112500,
        enabled: false,
        states: [],
    },
];
