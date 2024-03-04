export interface IAccountType {
    userName: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    _destroy: boolean;
}