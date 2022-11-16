import { Injectable } from '@nestjs/common';
import { CollectionReference } from 'firebase/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { IResponse } from 'src/shared/models/response.model';
import { User } from './users.model';
@Injectable()
export class UsersService {
    private collection: CollectionReference;
    constructor(private firebaseService: FirebaseService) {
        this.collection = this.firebaseService.usersCollection
    }
    public async getAll(): Promise<IResponse> {
        return this.firebaseService.getAll(this.collection);
    }
    public async getById(id: string): Promise<IResponse> {
        return this.firebaseService.getById(this.collection, id);
    }
    public async update(body: User): Promise<IResponse> {
        return this.firebaseService.update(this.collection, body);
    }
    public async create(body: User): Promise<IResponse> {
        return this.firebaseService.create(this.collection, body)
    }
    public async delete(id: string): Promise<IResponse> {
        return this.firebaseService.delete(this.collection, id)
    }
}
