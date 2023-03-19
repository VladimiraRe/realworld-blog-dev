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

export class ServerError extends FetchError {
    constructor(status: number) {
        super(status, 'server error');
    }
}

export class UnauthorizedError extends FetchError {
    constructor(status: number) {
        super(status, 'unauthorized error');
    }
}

export class ReservedError extends FetchError {
    constructor(status: number) {
        super(status, 'reserved error');
    }
}
