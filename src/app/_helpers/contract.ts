// used in contract list

import { Member } from "./contract-members";

// and to delete contract
export interface Contract {
    id: number;
    text: string;
    dateCreated: string;
    dateApproved: string;
    status: string;
}


export interface CreateContract {
    lawyerId: number,
    afms: Set<string | null | undefined>,
    text: string | null | undefined
}


export interface ViewContract {
    text: string;
    dateCreated: string;
    dateApproved: string;
    status: string;
    members: Member[];
}
