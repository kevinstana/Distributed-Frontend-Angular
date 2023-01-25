import { Contract } from "./contract";

export interface AppUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    afm: string;
    amka: string;
    answer: string;
    roles: [
        {
            role: string;
        }
    ];
    contract: Contract;
    strRoles: string;
}

export interface CreateOrUpdateUser {
    username: string;
    password: string;
    email: string;
    role: string[];
    firstName: string;
    lastName: string;
    afm: string;
    amka: string;
}


