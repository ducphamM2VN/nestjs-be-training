import { IFirebaseUser } from "../models/firebaseUser.model"

export const decodeToken = (token) : IFirebaseUser => {
    var base64Payload = token.split('.')[1]
    var payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString()) as IFirebaseUser
}