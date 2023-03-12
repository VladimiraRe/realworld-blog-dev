export class FetchError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export class NotFoundError extends FetchError {
    constructor(status: number) {
        super(status, 'not found');
    }
}
