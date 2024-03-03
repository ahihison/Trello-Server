
import { WHITELIST_DOMAINS } from '@/utils/constants';
import { StatusCodes } from 'http-status-codes';
import ApiError from '@/utils/ApiError';

// Cấu hình CORS Option trong dự án thực tế (Video số 62 trong chuỗi MERN Stack Pro)
export const corsOptions = {
    origin: function (requestOrigin: string|undefined, callback: (err: Error | null, allow?: boolean) => void): void {
        return callback(null, true);
    },

    // Some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,

    // CORS sẽ cho phép nhận cookies từ request, (Nhá hàng :D | Ở khóa MERN Stack Advance nâng cao học trực tiếp mình sẽ hướng dẫn các bạn đính kèm jwt access token và refresh token vào httpOnly Cookies)
    credentials: true
};