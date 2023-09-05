import { Messages } from './bug_tracking.types';

export const successMessages: Messages = {
    TRANSACTION_OK: {
        id: true,
        code: '01-001',
        status: 200,
        component: 'success',
        description: 'Transacción realizada.',
    },
};

export const errorMessages: Messages = {
    UNKNOWN_EXCEPTION: {
        id: false,
        code: '002-001',
        status: 500,
        component: 'unknown',
        description: 'Se ha producido una excepción desconocida.',
    },
    DATABASE_ERROR: {
        id: false,
        code: '002-002',
        status: 500,
        component: 'database',
        description: 'Se ha producido un error en la base de datos.',
    },
    NOT_FOUND: {
        id: false,
        code: '002-003',
        status: 404,
        component: 'client',
        description: 'Recurso no encontrado.',
    },
    COMMERCE_IS_CLOSE: {
        id: false,
        code: '002-004',
        status: 404,
        component: 'client',
        description: 'El comercio se encuentra cerrado.',
    },
};

export const authMessages: Messages = {
    UNAUTHORIZED: {
        id: false,
        code: '03-001',
        status: 401,
        component: 'auth',
        description: 'No autorizado. Acceso denegado.',
    },
    TOKEN_NOT_RECEIVED: {
        id: false,
        code: '03-002',
        status: 400,
        component: 'auth',
        description: 'Token no recibido.',
    },
};

export const validationMessages: Messages = {
    MISSING_ATTRIBUTE: {
        id: false,
        code: '04-001',
        status: 400,
        component: 'validations',
        description: 'Falta el atributo _nameAttribute.',
    },
    INVALID_ATTRIBUTE_TYPE: {
        id: false,
        code: '04-002',
        status: 400,
        component: 'validations',
        description:
            'El atributo _nameAttribute tiene un tipo de datos no válido. Esperado: _expectedType.',
    },
    ATTRIBUTE_LENGTH_EXCEEDED: {
        id: false,
        code: '04-003',
        status: 400,
        component: 'validations',
        description:
            'La longitud de _nameAttribute "_value" no puede superar _expectedCharacters.',
    },
    ATTRIBUTE_LENGTH_NOT_ENOUGH: {
        id: false,
        code: '04-003.1',
        status: 400,
        component: 'validations',
        description:
            'La longitud de _nameAttribute "_value" no puede ser menor a _expectedCharacters.',
    },
    INVALID_DNI: {
        id: false,
        code: '04-004',
        status: 400,
        component: 'validations',
        description:
            'El DNI _dni_partner facilitado no supera la validación. Por favor, verifique los datos introducidos.',
    },
    INVALID_DATE_FORMAT: {
        id: false,
        code: '04-005',
        status: 400,
        component: 'validations',
        description:
            'La fecha de nacimiento no coincide con el formato esperado (dd-mm-yyyy).',
    },
    INVALID_EMAIL: {
        id: false,
        code: '04-006',
        status: 400,
        component: 'validations',
        description: 'El correo electrónico introducido no es válido.',
    },
    INVALID_ENTITY_ID: {
        id: false,
        code: '04-007',
        status: 400,
        component: 'validations',
        description: 'El _id_name_entity falló la validación para la búsqueda.',
    },
    DUPLICATE_VALUE: {
        id: false,
        code: '04-009',
        status: 409,
        component: 'validations',
        description:
            'El valor proporcionado para el atributo _nameAttribute ya está en uso.',
    },
    NOT_FOUND_ENTITY_BY_ID: {
        id: false,
        code: '04-010',
        status: 404,
        component: 'validations',
        description: 'El _nameValue "_value" proporcionado no existe en _resource.',
    },
    ENTITY_WAS_DELETED: {
        id: false,
        code: '04-011',
        status: 400,
        component: 'validations',
        description: 'La entidad encontrada por _attribute "_value" ha sido eliminada.',
    },
    INVALID_CATEGORY: {
        id: false,
        code: '04-012',
        status: 400,
        component: 'validations',
        description: 'La categoría proporcionada _category no es válida.',
    },
    INVALID_CHANGES: {
        id: false,
        code: '04-013',
        status: 400,
        component: 'validations',
        description:
            'El comercio proporcionado _commerce no puede actualizar todos los valores porque fue verificado.',
    },
    INVALID_DAY_SCHEDULE_VALUES: {
        id: false,
        code: '04-013',
        status: 400,
        component: 'validations',
        description:
            'El horario proporcionado para _day no es válido porque no puede estar cerrado y openAllDay.',
    },
    NOT_FOUND_PRODUCT: {
        id: false,
        code: '04-014',
        status: 404,
        component: 'validations',
        description: 'The provided product "_value" not exist or is not available.',
    },
    INVALID_ORDER_BECAUSE_STATUS: {
        id: false,
        code: '04-014',
        status: 404,
        component: 'validations',
        description: 'La orden provista _value tiene un status no valido para la acción.',
    },
    INVALID_COMMERCE: {
        id: false,
        code: '04-015',
        status: 404,
        component: 'validations',
        description: 'El comercio no puede vender.',
    },
};
