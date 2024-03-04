import { IAccountType } from "@/types/accountType";
import Jwt from "jsonwebtoken";
export const generateToken = (user: IAccountType): string => {
    const token = Jwt.sign({ 
        id:user._id, 
        admin:user.role === 'admin' }, 
      process.env.JWT_SECRET as string,
      { expiresIn: "30s" }
    );
    return token;
};

export const generateReFressToken = (user: IAccountType): string => {
    const token = Jwt.sign({ 
        id:user._id, 
        admin:user.role === 'admin' }, 
      process.env.JWT_REFRESS_TOKEN as string,
      { expiresIn: "365d" }
    );
    return token;
};