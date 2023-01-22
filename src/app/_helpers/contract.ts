export interface Contract {
    id: number;
    text: string;
    dateCreated: string;
    dateApproved: string;
    status: string;
}

export interface UserContract {
    text: string;
    dateCreated: string;
    dateApproved: string;
    status: string;
    members: string[];
}