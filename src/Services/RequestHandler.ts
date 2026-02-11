export class RequestHandler<T>{
    Data?:T;
    ErrorMessage?:string;

    constructor(path:string, onSuccess:(data:T) => void, onError:(errorMessage:string) => void){
        const responsePromise:Promise<T> = new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        responsePromise.then(() => {
            this.ErrorMessage = `Not Implemented, path: ${path}`;
            onError(`Not Implemented, path: ${path}`);
        })
    }
}