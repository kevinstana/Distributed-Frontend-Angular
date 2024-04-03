export interface AuthorizedUser {
    id: number;
    username: string;
    email: string;
    roles: string[];
    accessToken: string;
    tokenType: string
}