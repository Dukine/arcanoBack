import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { iCart, iProduct, iUser, iCartProduct } from './interfaces';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUserHistory(id: string) {
    const user = await this.getUser(id);
    const carts = await this.getUserCart(id);
    const products = await this.getProducts();

    const userHistory = {
      ...user,
      history: carts.map((cart) => {
        return {
          ...cart,
          products: cart.products.map((product) => {
            return {
              quantity: product.quantity,
              product: products.find((prod) => prod.id === product.productId),
            };
          }),
        };
      }),
    };

    return userHistory;
  }

  //Http Requests
  async getProducts(): Promise<iProduct[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<iProduct[]>('https://fakestoreapi.com/products'),
    );

    return data;
  }

  async getUser(id: string): Promise<iUser> {
    const { data } = await firstValueFrom(
      this.httpService.get<iUser>(`https://fakestoreapi.com/users/${id}`),
    );

    return data;
  }

  //FakeAPI error without a date.
  async getUserCart(id: string): Promise<iCart[]> {
    const todayDate = new Date();

    const { data } = await firstValueFrom(
      this.httpService.get<iCart[]>(
        `https://fakestoreapi.com/carts/user/${id}?startdate=2019-01-01&enddate=${
          todayDate.toISOString().split(`T`)[0]
        }`,
      ),
    );

    return data;
  }
}
