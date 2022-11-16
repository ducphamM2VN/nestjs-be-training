import { IResponse } from "../models/response.model"

export const response = (status: number, responeObject?: any, error?: any)=>{
    return {
        statusCode: status,
        result: responeObject,
        error: error
    } as IResponse
}