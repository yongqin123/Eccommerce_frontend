import { Item } from "./Item";

export class Cart {
  constructor(
    public id: number | undefined,
    public itemId: number,
    public email: string,
    public quantity: number,
    public size: string,
  ) {}
}