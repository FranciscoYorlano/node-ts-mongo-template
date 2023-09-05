import fs from 'fs';

/**
 * UTILS GLOBALES A NIVEL DE PROYECTO
 */
/**
 * generateRandomNumber
 * @param length longitud del random number a generar
 * @returns randomNumber
 */
export const generateRandomNumber = (length: number): string => {
    let number = '';
    for (let x = 1; x <= length; x++) {
        let random: number = Math.floor(Math.random() * 10);
        if (random == 10) {
            random = random - 1;
        }
        number = number + random.toString();
    }
    return number;
};
/**
 * replaceDynamicData
 * @param description descripción del mensaje de error
 * @param data data para remplazar los campos dinámicos
 * @returns description con los campos dinamicos cambiados
 */
export const replaceDynamicData = (
    description: string,
    data: { [key: string]: string }
): string => {
    if (!data) {
        return description;
    }

    let replacedDescription: string = description;

    for (const key in data) {
        const dynamicKey = `${key}`;
        replacedDescription = replacedDescription.replace(
            new RegExp(dynamicKey, 'g'),
            data[key]
        );
    }

    return replacedDescription;
};
/**
 * stringToNumber
 * @param value string a transformar en number
 * @returns float number
 */
export const stringToNumber = (value: string): number => {
    const integerValue: number =
        value.length > 2 ? parseInt(value.substring(0, value.length - 2)) : 0;
    const decimalValue: number = parseInt(value.substring(value.length - 2)) / 100;
    return integerValue + decimalValue;
};
/**
 * numberToString
 * @param num number a transformar en string
 * @returns string
 */
export const numberToString = (num: number | undefined): string => {
    if (num === undefined) return '';

    const integerValue: number = Math.floor(num);
    const decimalValue: number = Math.round((num - integerValue) * 100);
    const decimalString: string = decimalValue.toString().padStart(2, '0');
    return `${integerValue}${decimalString}`;
};
/**
 * folderBaseImgVerification
 */
const folderBaseImgVerification = (): void => {
    const pathBasePublic = `./public`;
    if (!fs.existsSync(pathBasePublic)) {
        fs.mkdirSync(pathBasePublic);
    }

    const pathBaseResource = `./public/resource`;
    if (!fs.existsSync(pathBaseResource)) {
        fs.mkdirSync(pathBaseResource);
    }

    const pathBaseImg = `./public/resource/img`;
    if (!fs.existsSync(pathBaseImg)) {
        fs.mkdirSync(pathBaseImg);
    }

    const pathBaseAvatar = `./public/resource/img/profile_photo`;
    if (!fs.existsSync(pathBaseAvatar)) {
        fs.mkdirSync(pathBaseAvatar);
    }
};
/**
 * folderProfilePhotoVerification
 */
export const folderProfilePhotoVerification = (): string => {
    folderBaseImgVerification();

    const pathProfilePhoto = `./public/resource/img/profile_photo`;
    if (!fs.existsSync(pathProfilePhoto)) {
        fs.mkdirSync(pathProfilePhoto);
    }

    return pathProfilePhoto;
};
/**
 * folderBackgroundPhotoVerification
 */
export const folderBackgroundPhotoVerification = (): string => {
    folderBaseImgVerification();

    const pathBackgroundPhoto = `./public/resource/img/background_photo`;
    if (!fs.existsSync(pathBackgroundPhoto)) {
        fs.mkdirSync(pathBackgroundPhoto);
    }

    return pathBackgroundPhoto;
};
