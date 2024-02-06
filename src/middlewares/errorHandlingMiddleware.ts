
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import  { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
// import { env } from '~/config/environment'
interface ErrorHandler extends Error {
  statusCode?: number;
}

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleware: ErrorRequestHandler = (
    err: ErrorHandler, 
    req: Request, 
    res: Response, 
    next: NextFunction): Response|void => {

    // Nếu dev không cẩn thận thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
    if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
    const responseError = {
        statusCode: err.statusCode,
        message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
        stack: err.stack
    };
   
    res.status(responseError.statusCode).json(responseError);
};