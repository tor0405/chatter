//##Types
interface chatLog{
    messages:chatMessage[],
    id:string
}

interface chatMessage{
    text:string,
    name:string,
    id:string
}



//##Responses

//Fetching chat
export interface getChatResponse{
    success?:getChatSuccess
    error?:getChatError
}
export interface getChatSuccess{
    messages:chatMessage[],
    id:string
}
export interface getChatError{
    msg:string
}

//Sending message
export interface sendMessageSuccess{
    success:boolean
}
export interface sendMessageError{
    msg:string
}
