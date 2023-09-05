/**
 * UTILS COMUNES PARA MONGO
 */
import { ComponentModel, IComponent } from '../../components/commerce/component.schema';

export interface DocumentResult<T> {
    _doc?: Partial<T>;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum MODELS_ENUM {
    ComponentModel,
}

/**
 * getOneByAttribute
 * @param modelEnum Modelo de mongoose
 * @param attribute Atributo que va a intentar machear
 * @param value Valor que va a intentar machear
 * @returns Objeto retornado por mongo o null
 */
export const getOneByAttribute = async (
    modelEnum: MODELS_ENUM,
    attribute: string,
    value: string | number | boolean
): Promise<IComponent | undefined> => {
    const obj: Record<string, string | number | boolean> = {};
    obj[attribute] = value;

    /*eslint no-case-declarations: "off"*/
    switch (modelEnum) {
        case MODELS_ENUM.ComponentModel:
            const component = await ComponentModel.findOne(obj);
            return component as IComponent;
        default:
            break;
    }
};
