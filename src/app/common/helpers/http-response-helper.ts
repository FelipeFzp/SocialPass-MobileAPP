import { ErrorResponse } from 'src/app/models/errors/error-response';

export abstract class HttpResponseHelper {

    public static mapErrorResponse(error: any): ErrorResponse{
        let err: ErrorResponse;
        try{
            err = error.error;
        }catch{
            err = {
                statusCode: 400,
                message: "Algo errado..."
            }
        }
    
        return err || {
            statusCode: 400,
            message: "Algo errado..."
        };
    }
}