
class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
    
        super(message);

        this.name = 'ApiError';

      
        this.statusCode = statusCode;

        // Ghi lại Stack Trace (dấu vết ngăn xếp) để thuận tiện cho việc debug
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;