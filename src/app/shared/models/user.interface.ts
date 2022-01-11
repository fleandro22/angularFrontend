export interface User{
    email: string;
}

export interface dataResponseUser{
    nombre:string;
    cargo:string;
}

export interface responseUser {
    statusResponse: string;
    data: dataResponseUser;
}