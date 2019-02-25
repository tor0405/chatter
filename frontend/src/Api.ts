import {JWT} from "./domain/JWT"
import * as UserInterfaces from "./domain/UserInterfaces"
import * as ChatInterfaces from "./domain/ChatInterfaces"
import Chat from "./views/chat/Chat";

export class Api {

    static post(url: string,jwt:boolean, data: object) {
        return fetch('/api' + url, {
            headers:{
                "Content-Type": "application/json; charset=utf-8",
                ...(jwt?{"Authorization":"JWT "+localStorage.getItem("token")} : {})
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
    }


    static put(url: string, jwt:boolean, data: object) {
        return fetch('/api' + url, {
            headers:{
                "Content-Type": "application/json; charset=utf-8",
                ...(jwt?{"Authorization":"JWT "+localStorage.getItem("token")} : {})
            },
            method: 'PUT',
            body: JSON.stringify(data)
        })
    }


    static get(url: string, jwt:boolean, query: string) {
        return fetch('/api' + url+"?"+query, {
            headers:{
                "Content-Type": "application/json; charset=utf-8",
                ...(jwt?{"Authorization":"JWT "+localStorage.getItem("token")} : {})
            },
            method: 'GET'
        })
    }


    static delete(url: string, jwt:boolean, data: object) {
        return fetch('/api' + url, {
            headers:{
                "Content-Type": "application/json; charset=utf-8",
                ...(jwt?{"Authorization":"JWT "+localStorage.getItem("token")} : {})
            },
            method: 'DELETE',
            body: JSON.stringify(data)
        })
    }

    static parseJwtToken(token: string): JWT {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

}


export class UserApi extends Api {

    static isLoggedIn(): boolean {
        let token: string | null = localStorage.getItem("token");
        if (token) {
            let jwt: JWT = Api.parseJwtToken(token);
            let current_time: number = Date.now() / 1000;
            return jwt.exp > current_time;
        } else {
            return false
        }
    }

    static login(username: string, password: string): Promise<string> {
        return new Promise(((resolve, reject) => {
            Api.post("/user/login",false, {username, password})
                .then((response) => (response.json()))
                .then((res: UserInterfaces.loginResponseSuccess) => {
                    localStorage.setItem("token", res.token);
                    resolve("Logget inn");
                })
                .catch((err: UserInterfaces.loginResponseError) => {
                    reject(err.msg);
                })
        }));
    }

    static register(username: string, password: string, fullName: string): Promise<string> {
        return new Promise(((resolve, reject) => {
            Api.post("/user/", false,{username, password, fullName})
                .then((response) => (response.json()))
                .then((res: UserInterfaces.registrationResponseSuccess) => {
                    resolve("Registrering vellykket");
                    console.log(res)
                })
                .catch((err: UserInterfaces.registrationResponseError) => {
                    reject(err.msg);
                })
        }));
    }

    static fetch(userID: string): Promise<UserInterfaces.User|string> {
        return new Promise(((resolve, reject) => {
            Api.get("/user/", true,userID)
                .then((response) => (response.json()))
                .then((res: UserInterfaces.fetchResponseSuccess) => {

                    resolve(res.user);
                })
                .catch((err: UserInterfaces.fetchResponseError) => {
                    reject(err.msg);
                })
        }));
    }
}




export class ChatApi extends Api{

    static getChat(chatID:string):Promise<ChatInterfaces.getChatSuccess|ChatInterfaces.getChatError>{
        return new Promise(((resolve, reject) => {
            Api.get("/chat/", true, chatID)
                .then((response) => (response.json()))
                .then((res: ChatInterfaces.getChatSuccess) => {
                    resolve(res);
                })
                .catch((err: ChatInterfaces.getChatError) => {
                    reject(err.msg);
                })
        }));
    }

    static sendMessage(chatID:string, message:string):Promise<string>{
        return new Promise(((resolve, reject) => {
            Api.post("/chat/"+chatID, true, {message})
                .then((response) => (response.json()))
                .then((res: ChatInterfaces.sendMessageSuccess) => {
                    resolve("Melding sendt!");
                })
                .catch((err: ChatInterfaces.sendMessageError) => {
                    reject(err.msg);
                })
        }));
    }

}
