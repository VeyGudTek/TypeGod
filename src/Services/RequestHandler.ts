export class RequestHandler<T>{
    Data?:T;
    ErrorMessage?:string;

    constructor(path:string){
        const responsePromise:Promise<T> = new Promise((resolve) => {
            setTimeout(resolve, 5);
        });

        responsePromise.then(() => {
            this.ErrorMessage = `Not Implemented, path: ${path}`;
        })
    }
}