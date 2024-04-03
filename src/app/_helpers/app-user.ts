import { Contract } from "./contract";


export interface roles {
    role: string;
}


export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    afm: string;
    amka: string;
    answer: string;
    roles: roles[];
    contract: Contract;
    strRoles: string;
}


export interface CreateUser {
    username: string | null | undefined;
    password: string | null | undefined;
    email: string | null | undefined;
    role: string[];
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    afm: string | null | undefined;
    amka: string | null | undefined;
}


export interface UpdateUser {
    username: string | null | undefined;
    password: string | null | undefined;
    email: string | null | undefined;
    role: string[];
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    afm: string | null | undefined;
    amka: string | null | undefined;
}

export interface ViewUser {
    username: string | null | undefined;
    email: string | null | undefined;
    role: string[];
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    afm: string | null | undefined;
    amka: string | null | undefined;
}
