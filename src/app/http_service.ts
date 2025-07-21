import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; 
import { Item } from "./Item";
import { Observable } from "rxjs";
import { User } from "./User";
import { Cart } from "./cart";

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    url:string = 'https://localhost:7277/api/Items/male' 
    constructor(private http: HttpClient) {}

    //Item
    public getAllMenItems(): Observable<Item[]> {
        return this.http.get<Item[]>(`https://localhost:7277/api/Items/male/`);
    }

    public getAllWomanItems(): Observable<Item[]> {
        return this.http.get<Item[]>(`https://localhost:7277/api/Items/female`);
    }

    public addItem(formData: FormData) {
        
        return this.http.post(`https://localhost:7277/api/Items/AddItem/`,formData);
    }

    public getItem(id: number): Observable<Item> {
        return this.http.get<Item>(`https://localhost:7277/api/Items/`+id);
    }

    public getAllItems(): Observable<Item[]> {
        return this.http.get<Item[]>(`https://localhost:7277/api/Items/`);
    }

    public updateItem(formData: FormData,id: number) {
        return this.http.put<Item[]>(`https://localhost:7277/api/Items/`+ id, formData );
    }
    public deleteItem(id:number) {
        return this.http.delete<Item[]>(`https://localhost:7277/api/Items/`+id);
    }

    //User
    public getUserByEmailAndPassword(email:string, password:string): Observable<User[]> {
        return this.http.get<User[]>(`https://localhost:7277/api/Users/` + email + `/` + password + '/');
    }

    public addUser(formData: FormData) {
        
        return this.http.post(`https://localhost:7277/api/Users/`,formData);
    }

    //Cart
    public addCart(cart: Cart) {
        
        return this.http.post(`https://localhost:7277/api/Carts/`,cart);
    }

    public getAllCartsEmail(email:string) :Observable<Cart[]> {
        return this.http.get<Cart[]>(`https://localhost:7277/api/Carts/email/` + email);
    }

    public updateCart(cart: Cart,id: number) {
        return this.http.put<Item[]>(`https://localhost:7277/api/Carts/`+ id, cart );
    }
}