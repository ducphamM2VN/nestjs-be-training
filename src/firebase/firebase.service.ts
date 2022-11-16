import { HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import { collections } from "src/shared/constants/fireStoreConstants";
import { IResponse } from "src/shared/models/response.model";
import { response } from "src/shared/utils/defineResponse";
@Injectable()
export class FirebaseService {
    public app: FirebaseApp;
    public auth: Auth;
    public fireStore: Firestore;
    public usersCollection: CollectionReference;
    public categoriesCollection: CollectionReference;
    firebaseService: any;
    constructor(private configService: ConfigService) {
        this.app = initializeApp({
            apiKey: configService.get<string>('apiKey'),
            appId: configService.get<string>('appId'),
            authDomain: configService.get<string>('authDomain'),
            measurementId: configService.get<string>('measurementId'),
            messagingSenderId: configService.get<string>('messagingSenderId'),
            projectId: configService.get<string>('projectId'),
            storageBucket: configService.get<string>('storageBucket')
        });
        this.auth = getAuth(this.app);
        this.fireStore = getFirestore(this.app);
        this._createCollections();

    }
    private _createCollections() {
        this.usersCollection = collection(this.fireStore, collections.USERS)
        this.categoriesCollection = collection(this.fireStore, collections.CATEGORIES)
    }

    public async getUserId(): Promise<string> {
        return this.auth.currentUser.uid || ''
    }

    public async getAll(collectionRef: CollectionReference): Promise<IResponse> {
        try {
            const result = await getDocs(collectionRef).then(res => {
                return res.docs.map((data: DocumentData) => {
                    return {
                        id: data.id,
                        ...data.data(),
                    }
                })
            })
            return response(HttpStatus.OK, { items: result || [] })
        } catch (error) {
            return response(HttpStatus.BAD_REQUEST, {})
        }
    }
    public async getById(collectionRef: CollectionReference, id: string): Promise<IResponse> {
        try {
            const snap = await getDoc(doc(collectionRef, id))
            return response(HttpStatus.OK, snap?.data() || {})
        } catch {
            return response(HttpStatus.BAD_REQUEST, {})
        }
    }
    public async update(collectionRef: CollectionReference, body: any): Promise<IResponse> {
        try {
            body.updatedDate = Math.floor(Date.now() / 1000);
            body.updatedBy = await this.getUserId();
            return await setDoc(doc(collectionRef, body.id), body).then(async () => {
                return await this.getById(collectionRef, body.id)
            })
        } catch (error) {
            return response(HttpStatus.BAD_REQUEST, {})
        }
    }
    public async create(collectionRef: CollectionReference, body: any): Promise<IResponse> {
        try {
            delete body.id
            body.isDelete = false;
            body.createdDate = Math.floor(Date.now() / 1000);
            body.createdBy = await this.getUserId();
            return await addDoc(collectionRef, body).then(async (res: DocumentReference) => {
                return await this.getById(collectionRef, res.id)
            })
        } catch (error) {
            return response(HttpStatus.BAD_REQUEST, {})
        }
    }
    public async delete(collectionRef: CollectionReference, id: string): Promise<IResponse> {
        try {
            const body: any = await this.getById(collectionRef, id);
            if (body) {
                body.isDelete = true;
                body.deletedDate = Math.floor(Date.now() / 1000);
                body.deletedBy = await this.getUserId();
                return await setDoc(doc(collectionRef, id), body).then(async () => {
                    return response(HttpStatus.OK, {})
                })
            }
            return response(HttpStatus.BAD_REQUEST, {})
        } catch {
            return response(HttpStatus.BAD_REQUEST, {})
        }
    }
}