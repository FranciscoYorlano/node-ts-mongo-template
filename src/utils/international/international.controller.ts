import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../network/response';
import { getErrorString } from '../bug_tracking/bug_tracking.functions';
import { errorMessages } from '../bug_tracking/bug_tracking.messages';
import { countries } from './international.data';
import { ICountry } from './international.schema';


export const getAllCountries = async (req: Request, res: Response): Promise<void> => {
    try {
        const filterCountries: ICountry[] = countries.filter(
            (country: ICountry) => country.enabled
        );

        return successResponse(res, 200, filterCountries);
    } catch (error) {
        const errorString: string = getErrorString(error);
        return errorResponse(res, errorMessages.DATABASE_ERROR, errorString);
    }
};

