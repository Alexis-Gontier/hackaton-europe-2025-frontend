export interface User {
    id: string;
    username: string;
    firstName: string;
    name: string;
    email: string;
    consent: boolean;
    role: "admin" | "user";
}