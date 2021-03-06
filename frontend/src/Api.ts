import { JWT } from "./domain/JWT";
import * as UserInterfaces from "./domain/UserInterfaces";
import * as ChatInterfaces from "./domain/ChatInterfaces";


export class Api {

  static post(url: string, jwt: boolean, data: object) {
    return fetch("/api" + url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...(jwt ? { "Authorization": "JWT " + localStorage.getItem("token") } : {})
      },
      method: "POST",
      body: JSON.stringify(data)
    });
  }


  static put(url: string, jwt: boolean, data: object) {
    return fetch("/api" + url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...(jwt ? { "Authorization": "JWT " + localStorage.getItem("token") } : {})
      },
      method: "PUT",
      body: JSON.stringify(data)
    });
  }


  static get(url: string, jwt: boolean, query: string) {
    return fetch("/api" + url + "?" + query, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...(jwt ? { "Authorization": "JWT " + localStorage.getItem("token") } : {})
      },
      method: "GET"
    });
  }


  static delete(url: string, jwt: boolean, data: object) {
    return fetch("/api" + url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...(jwt ? { "Authorization": "JWT " + localStorage.getItem("token") } : {})
      },
      method: "DELETE",
      body: JSON.stringify(data)
    });
  }

  static parseJwtToken(token: string): JWT {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

}


export class UserApi extends Api {

  static isLoggedIn(): boolean {
    if ((<any>window).isLoggedIn == true) return true;
    let token: string | null = localStorage.getItem("token");
    if (token) {
      let jwt: JWT = Api.parseJwtToken(token);
      let current_time: number = Date.now() / 1000;
      if (jwt.exp > current_time) {
        (<any>window).isLoggedIn = true;
        return true;
      } else {
        this.logOut();
        return false;
      }
    } else {
      return false;
    }
  }

  static getUserId(): string {
    let token: string | null = localStorage.getItem("token");
    if (token) {
      let jwt: JWT = Api.parseJwtToken(token);
      return jwt.id;
    } else {
      return "";
    }
  }

  static logOut(): void {
    localStorage.removeItem("token");
    (<any>window).isLoggedIn = false;
  }

  static getUserToken(): string {
    let token: string | null = localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      return "";
    }
  }


  static login(username: string, password: string): Promise<string> {
    return new Promise(((resolve, reject) => {
      Api.post("/user/login", false, { username, password })
        .then((response) => (response.json()))
        .then((res) => {
          if (res.error) {
            throw(res.error);
          }
          (<any>window).isLoggedIn = true;
          localStorage.setItem("token", res.token);
          resolve("Logget inn");
        })
        .catch((err: UserInterfaces.loginResponseError) => {
          reject(err.msg);
        });
    }));
  }

  static register(username: string, password: string, fullName: string): Promise<string> {
    return new Promise(((resolve, reject) => {
      Api.post("/user/", false, { username, password, fullName })
        .then((response) => (response.json()))
        .then((res: UserInterfaces.registrationResponseSuccess) => {
          resolve("Registrering vellykket");
        })
        .catch((err: UserInterfaces.registrationResponseError) => {
          reject(err.msg);
        });
    }));
  }

  static fetch(userID: string): Promise<UserInterfaces.User> {
    return new Promise(((resolve, reject) => {
      Api.get("/user/", true, userID)
        .then((response) => (response.json()))
        .then((res: UserInterfaces.fetchResponseSuccess) => {
          resolve(res.user);
        })
        .catch((err: UserInterfaces.fetchResponseError) => {
          reject(err.msg);
        });
    }));
  }


}


export class ChatApi extends Api {

  static updateRoom(roomId: string, data: ChatInterfaces.roomUpdateData): Promise<ChatInterfaces.updateRoomSucess> {
    return new Promise(((resolve, reject) => {
      Api.put("/chat/" + roomId, true, { ...data })
        .then((response) => (response.json()))
        .then((res: ChatInterfaces.updateRoomSucess) => {
          resolve(res);
        })
        .catch((err: ChatInterfaces.getChatError) => {
          reject(err.msg);
        });
    }));
  }

  static getUserChats(): Promise<ChatInterfaces.getUserChatsSuccess> {
    return new Promise(((resolve, reject) => {
      Api.get("/chat/", true, "")
        .then((response) => (response.json()))
        .then((res: ChatInterfaces.getUserChatsSuccess) => {
          resolve(res);
        })
        .catch((err: ChatInterfaces.getChatError) => {
          reject(err.msg);
        });
    }));
  }

}
