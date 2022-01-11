export interface User{
    email: string;
}

export interface dataResponseUser{
    nombre:string;
    cargo:string;
}

export interface dataResponseCopany{
    nit:string;
    nombre:string;
    capa:string;
    segmento:string;
}

export interface responseUser {
    statusResponse: string;
    data: dataResponseUser;
}

export interface responseCompany{
    statusResponse:string;
    data:dataResponseCopany;
}