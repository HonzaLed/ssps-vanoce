export default class Result<R, E> {
    private ok?: R;
    private error?: E;
    private isError: boolean;

    constructor(ok?: R, error?: E) {
        this.ok = ok;
        this.error = error;
        this.isError = error !== undefined;
    }

    static Ok<R, E>(ok: R): Result<R, E> {
        return new Result<R, E>(ok, undefined);
    }

    static Error<R, E>(error: E): Result<R, E> {
        return new Result<R, E>(undefined, error);
    }

    isErr() {
        return this.isError;
    }

    isOk() {
        return !this.isError;
    }

    unwrap() {
        if (this.isError) {
            throw new Error("Called unwrap on an error Result");
        }
        return this.ok;
    }

    unwrapErr() {
        if (!this.isError) {
            throw new Error("Called unwrapErr on an ok Result");
        }
        return this.error;
    }
}