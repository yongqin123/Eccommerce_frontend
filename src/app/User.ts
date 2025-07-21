export class User {
    Id : number;
    name: string;
    email: string;
    password: string;
    phone: string;
    accountType: string;
    address: string;
    city: string;

    public constructor(id: number, Name: string, Email:string, Password:string, Phone:string, AccountType:string, Address:string, City:string) {
        this.Id = id;
        this.name = Name;
        this.email = Email;
        this.password = Password;
        this.phone = Phone;
        this.accountType = AccountType;
        this.address = Address;
        this.city = City;
    }

    
}