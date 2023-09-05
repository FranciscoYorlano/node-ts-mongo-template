import { Types } from 'mongoose';

import { errorMessages, validationMessages } from './bug_tracking/bug_tracking.messages';
import { MessageAPI } from './bug_tracking/bug_tracking.types';
import { replaceDynamicData } from './global';
import { MODELS_ENUM, getOneByAttribute } from './mongo/common';

/**
 * Primite types and ObjectId
 */
export type PRIMITIVE_TYPES = 'number' | 'string' | 'boolean' | 'ObjectId';

/**
 * currentId se usa para permitir actualizar la información de un documento que tenga la propiedad uniqued pero que sea el mismo documento a actualizar
 */
export interface IValidateAttribute {
    model: MODELS_ENUM;
    name: string;
    value: string | number | boolean | object | Types.ObjectId | any;
    type: PRIMITIVE_TYPES;
    notNull: boolean;
    unique: boolean;
    length: number;
    currentId?: string;
}

/**
 * Permite obtener el atributo ObjectId para la validación
 * @param model Modelo
 * @param id id
 * @returns IValidateAttribute
 */
export const getValidateAttributeObjectId = (
    model: MODELS_ENUM,
    id: string
): IValidateAttribute => {
    return {
        model,
        name: '_id',
        value: id,
        type: 'ObjectId',
        notNull: true,
        unique: true,
        length: 0,
        currentId: id,
    };
};

/**
 * Nos permite validar un atributo, en los siguientes aspectos: type, notNull, unique, length de los tipos de datos primitivos y ObjectId
 * @param attributeToValidate
 * @returns Lista de mensajes del API | null
 */
export const validateAttribute = async (
    attributeToValidate: IValidateAttribute
): Promise<MessageAPI | null> => {
    /**
     * First ObjectId validation
     */
    if (attributeToValidate.type === 'ObjectId') {
        if (!Types.ObjectId.isValid(attributeToValidate.value)) {
            const description = replaceDynamicData(
                validationMessages.INVALID_ATTRIBUTE_TYPE.description,
                {
                    _nameAttribute: attributeToValidate.name,
                    _expectedType: 'ObjectId',
                }
            );

            return Promise.resolve({
                ...validationMessages.INVALID_ATTRIBUTE_TYPE,
                description: description,
            });
        }
        return Promise.resolve(null);
    }
    /**
     * Get validators
     */
    const valueIsNullOrEmpty =
        attributeToValidate.value === undefined ||
        attributeToValidate.value === null ||
        attributeToValidate.value === '';
    const valueDoesNotMatchType =
        typeof attributeToValidate.value !== attributeToValidate.type;

    const valueExceedsLength =
        (typeof attributeToValidate.value === 'string' &&
            attributeToValidate.value.length > attributeToValidate.length) ||
        (typeof attributeToValidate.value === 'number' &&
            attributeToValidate.value > attributeToValidate.length);

    /**
     * Check that the attribute is found as long as it is not null
     */
    if (attributeToValidate.notNull && valueIsNullOrEmpty) {
        const description = replaceDynamicData(
            validationMessages.MISSING_ATTRIBUTE.description,
            { _nameAttribute: attributeToValidate.name }
        );
        return Promise.resolve({
            ...validationMessages.MISSING_ATTRIBUTE,
            description: description,
        });
    }
    /**
     * Check that the attribute has its expected type
     */
    if (!valueIsNullOrEmpty && valueDoesNotMatchType) {
        const description = replaceDynamicData(
            validationMessages.INVALID_ATTRIBUTE_TYPE.description,
            {
                _nameAttribute: attributeToValidate.name,
                _expectedType: attributeToValidate.type,
            }
        );

        return Promise.resolve({
            ...validationMessages.INVALID_ATTRIBUTE_TYPE,
            description: description,
        });
    }
    /**
     * Verify that the attribute has its desired length
     */
    if (!valueIsNullOrEmpty && valueExceedsLength) {
        const description = replaceDynamicData(
            validationMessages.ATTRIBUTE_LENGTH_EXCEEDED.description,
            {
                _nameAttribute: attributeToValidate.name,
                _value: attributeToValidate.value,
                _expectedCharacters: `${attributeToValidate.length}`,
            }
        );
        return Promise.resolve({
            ...validationMessages.ATTRIBUTE_LENGTH_EXCEEDED,
            description: description,
        });
    }
    /**
     * Check that the attribute is unique
     */

    if (attributeToValidate.unique) {
        try {
            const document: any = await getOneByAttribute(
                attributeToValidate.model,
                attributeToValidate.name,
                attributeToValidate.value
            );

            const isCurrentDocument =
                attributeToValidate.currentId &&
                document &&
                document?.id.toString() === attributeToValidate.currentId.toString();

            if (document && !isCurrentDocument) {
                const description = replaceDynamicData(
                    validationMessages.DUPLICATE_VALUE.description,
                    { _nameAttribute: attributeToValidate.name }
                );
                return Promise.resolve({
                    ...validationMessages.DUPLICATE_VALUE,
                    description: description,
                });
            }
        } catch (error) {
            return Promise.resolve({ ...errorMessages.DATABASE_ERROR });
        }
    }

    return Promise.resolve(null);
};

/**
 * Validacion de attributos primitivos && ObjectId en lote
 * @param attributesToValidate [] of attributes to validate
 * @returns Lista de mensajes del API
 */
export const validateAttributeInBatch = async (
    attributesToValidate: IValidateAttribute[]
): Promise<MessageAPI[]> => {
    const validationResponse: (MessageAPI | null)[] = await Promise.all(
        attributesToValidate.map(async (attributeToValidate: IValidateAttribute) => {
            return await validateAttribute(attributeToValidate);
        })
    );
    /**
     * Filter only MessagesAPI
     */
    return validationResponse.filter((e): e is MessageAPI => e !== null);
};
