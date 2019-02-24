

export class Api {

    static post(url: string, data: object){
       return fetch('/api'+url, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

}


export class User extends Api {

    static login(username:string, password:string){
        return new Promise(((resolve, reject) => {
            Api.post("/user/login",{username, password})
                .then(res=>{
                resolve("Logged in!");
                console.log(res)})
                .catch(err=>{
                    console.log(err);
                    reject();
                })
        }));
    }


}
