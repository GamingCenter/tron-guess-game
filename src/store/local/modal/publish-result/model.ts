export interface PublishResultModalState {
    isOpen: boolean;
    isLoading: boolean;
    name: string;
    country: string;
}

export interface PublishResultModalUpdatePlayerPayload {
    name: string;
    country: string;
}