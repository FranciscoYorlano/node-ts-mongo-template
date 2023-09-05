import { NextFunction, Request, Response } from 'express';
import { MessageAPI } from '../../utils/bug_tracking/bug_tracking.types';

import {
    getValidateAttributeObjectId,
    validateAttribute,
    validateAttributeInBatch,
} from '../../utils/validations';
import { errorResponse } from '../../network/response';
import { MODELS_ENUM } from '../../utils/mongo/common';

/**
 * Validate addComponent
 * @param req Request
 * @param res Response
 * @param next Function to next
 * @returns void
 */
export const addComponent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { _id /*...*/ } = req.body;

    /**
     * _id validation
     */
    const messagesAPI: MessageAPI[] = await validateAttributeInBatch([
        getValidateAttributeObjectId(MODELS_ENUM.ComponentModel, _id),
    ]);
    if (messagesAPI.length > 0) return errorResponse(res, messagesAPI[0], null);

    next();
};

/**
 * Validate Component Id
 * @param req Request
 * @param res Response
 * @param next Function to next
 * @returns void
 */
export const validationComponentId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { componentId } = req.params;

    const messageAPI: MessageAPI | null = await validateAttribute(
        getValidateAttributeObjectId(MODELS_ENUM.ComponentModel, componentId)
    );

    if (messageAPI !== null) return errorResponse(res, messageAPI, null);

    next();
};
