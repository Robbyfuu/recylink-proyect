export interface IAuthUser {
    token: string;
    user: IUser;
}
export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    isActive: boolean;
}