//##Types
export interface chatLog {
    messages: chatMessage[],
    id: string
}

interface chatMessage {
    msg: string,
    name: string,
    id: string
}

interface chatListItem {
    public_id: string
}


//##Responses

//Fetching chat
export interface getChatResponse {
    success?: getChatSuccess
    error?: getChatError
}

export interface getChatSuccess {
    messages: chatMessage[],
    id: string
}

export interface getChatError {
    msg: string
}


export interface getUserChatsResponse {
    success?: getUserChatsSuccess
    error?: getUserChatsError
}

export interface getUserChatsSuccess {
    chatList: chatListItem[]
}

export interface getUserChatsError {
    msg: string
}

//Sending message
export interface sendMessageSuccess {
    success: boolean
}

export interface sendMessageError {
    msg: string
}


//update Room
export interface roomUpdateData {
    open?: boolean;
}

export interface updateRoomSucess {
    success: boolean
}
