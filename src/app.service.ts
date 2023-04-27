import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { iCart, iProduct, iUser } from './interfaces';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUserHistory() {
    return await this.getUserCart('2');
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
