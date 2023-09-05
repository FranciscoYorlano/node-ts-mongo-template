/**
 * Interface Country
 */
export interface ICountry {
    name: string;
    abbreviation: COUNTRY_ABBREVIATION_TYPE;
    timeZone: TIMEZONE_TYPE;
    UTCReference: UTC_REFERENCE_TYPE;
    currency: CURRENCY_TYPE;
    onlinePaymentMethod: ONLINE_PAYMENT_METHOD_TYPE;
    language: LANGUAGE_TYPE;
    minimumWage: number;
    enabled: boolean;
    states: IState[];
}
/**
 * Interface State
 */
export interface IState {
    name: string;
    cities: string[];
}

/**
 * Abbreviation Countries
 */
export type COUNTRY_ABBREVIATION_TYPE =  'ARG';
/**
 * Timezone
 */
export type TIMEZONE_TYPE = 'America/Argentina/Buenos_Aires';

/**
 * UTC Reference
 */
export type UTC_REFERENCE_TYPE =
    | '-12'
    | '-11'
    | '-10'
    | '-9'
    | '-8'
    | '-7'
    | '-6'
    | '-5'
    | '-4'
    | '-3'
    | '-2'
    | '-1'
    | '0'
    | '+1'
    | '+2'
    | '+3'
    | '+4'
    | '+5'
    | '+6'
    | '+7'
    | '+8'
    | '+9'
    | '+10'
    | '+11'
    | '+12';
/**
 * Currencies to the countries
 */
export type CURRENCY_TYPE = 'ARS' | 'USD';

/**
 * Payment Methods to the countries
 */
export type PAYMENT_METHOD_TYPE = 'CASH' |  'MERCADOPAGO';

export type ONLINE_PAYMENT_METHOD_TYPE = 'MERCADOPAGO';

/**s
 * Languages to the countries
 */
export type LANGUAGE_TYPE = 'EN' | 'ES';
