import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import {
    AuthError,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';
import {
    setDoc,
    DocumentReference,
    doc,
    getDoc,
    DocumentSnapshot,
    DocumentData,
} from 'firebase/firestore';
import { RegisterSchema, UserInfo } from './auth.model';
import { response } from 'src/shared/utils/defineResponse';
import { IResponse } from 'src/shared/models/response.model';
import { firebaseAuthErrorCode } from 'src/shared/constants/fireAuthErrorConstants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private firebaseService: FirebaseService, private configService: ConfigService) {}

    public async login(
        email: string,
        password: string,
    ): Promise<IResponse> {
        try {
            return await signInWithEmailAndPassword(
                this.firebaseService.auth,
                email,
                password,
            ).then(async (res: any) => {
                this.firebaseService.auth = res?.user?.auth;
                const userCredential: UserCredential = res;
                if (userCredential) {
                    const id: string = userCredential.user.uid;
                    const docRef: DocumentReference = doc(
                        this.firebaseService.usersCollection,
                        id,
                    );
                    const snapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
                    const loggedUser: UserInfo = {
                        ...snapshot.data(),
                        id: snapshot.id,
                    } as UserInfo;
                    delete loggedUser.password;
                    return response(HttpStatus.OK, loggedUser)
                }
            })

        } catch (error: unknown) {
            const firebaseAuthError = error as AuthError;
            if (firebaseAuthError.code === firebaseAuthErrorCode.INVALID_EMAIL) {
                throw new HttpException(
                    'Invalid Email',
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (firebaseAuthError.code === firebaseAuthErrorCode.WRONG_PASS) {
                throw new HttpException(
                    'Email or password incorrect.',
                    HttpStatus.FORBIDDEN,
                );
            }

            if (firebaseAuthError.code === firebaseAuthErrorCode.INVALID_USER) {
                throw new HttpException('Email not found.', HttpStatus.NOT_FOUND);
            }
        }
    }

    public async register(body: RegisterSchema): Promise<IResponse> {
        try {
            const userCredential: UserCredential =
                await createUserWithEmailAndPassword(
                    this.firebaseService.auth,
                    body.email,
                    body.password,
                );

            if (userCredential) {
                const id: string = userCredential.user.uid;
                const docRef: DocumentReference = doc(
                    this.firebaseService.usersCollection,
                    id,
                );
                delete body.password
                await setDoc(docRef, body);
                return response(HttpStatus.OK, body)
            }
        } catch (error: unknown) {
            const firebaseAuthError = error as AuthError;
            if (firebaseAuthError.code === firebaseAuthErrorCode.INVALID_EMAIL) {
                throw new HttpException('Email is not existed.', HttpStatus.CONFLICT);
            }
            if (firebaseAuthError.code === firebaseAuthErrorCode.EXISTED_EMAIL) {
                throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
            }
        }
    }

    public async logOut(): Promise<IResponse> {
        try {
            if (this.firebaseService.auth?.currentUser) {
                const result = await this.firebaseService.auth.signOut();
                return response(HttpStatus.OK, 'Logout successfully.');
            }
            else {
                return response(HttpStatus.BAD_REQUEST, 'Logout unsuccessfully.');
            }
        } catch (error) {
            throw new HttpException('Logout unsuccessfully.', HttpStatus.BAD_REQUEST);
        }
    }

    public async isLoging(): Promise<IResponse> {
        try {
            const user: any = this.firebaseService.auth?.currentUser;
            if (user) {
                const expTime = user?.stsTokenManager?.expirationTime
                if (expTime < (new Date().getTime() + 1) / 1000) {
                    return response(HttpStatus.BAD_REQUEST, 'Session Expired');
                }
                return response(HttpStatus.OK, user);
            }
            else
                return response(HttpStatus.BAD_REQUEST, 'Session Expired');
        } catch (error) {
            const firebaseAuthError = error as AuthError;
            if (firebaseAuthError.code === firebaseAuthErrorCode.TOKEN_EXPIRED) {
                throw new HttpException('Session Expired.', HttpStatus.BAD_REQUEST);
            }
        }
    }
}