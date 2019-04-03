export type TronWebState = {
    installed: boolean;
    loggedIn: boolean;
};

export interface UpdateTronWebStatePayload {
    installed: boolean;
    loggedIn: boolean;
}