
//User
export interface User{
    username:string,
    id:string
}


//Login
export interface loginResponseSuccess{
    token:string;
    success:boolean;
}
export interface loginResponseError{
    msg:string
}


//Registration
export interface registrationResponseSuccess {
    success:boolean
}
export interface registrationResponseError {
    msg:string
}


//fetching
export interface fetchResponseSuccess {
    user:User
}
export interface fetchResponseError {
    msg:string
}


