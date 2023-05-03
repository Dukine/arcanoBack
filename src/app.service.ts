import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { iCart, iProduct, iUser } from './interfaces';
import { UserHistoryDto } from './dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getUserHistory(id: string) {
    const user = await this.getUser(id);
    const carts = await this.getUserCart(id);
    const products = await this.getProducts();

    const userHistory = {
      ...user,
      history: carts.map((cart) => {
        return {
          ...cart,
          products: cart.products.map((cartProduct) => {
            return {
              ...cartProduct,
              product: products.find(
                (prod) => prod.id === cartProduct.productId,
              ),
            };
          }),
        };
      }),
    };

    return new UserHistoryDto(userHistory);
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

    if (!data) {
      throw new NotFoundException('User not found!');
    }

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
