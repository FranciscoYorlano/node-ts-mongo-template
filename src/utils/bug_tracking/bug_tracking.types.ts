export interface MessageAPI {
    id: boolean;
    code: string;
    status: number;
    component: string;
    description: string;
    errorString?: string;
}

export interface Messages {
    [key: string]: MessageAPI;
}
