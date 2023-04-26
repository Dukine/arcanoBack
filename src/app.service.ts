import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

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
  async getProducts() {
    const { data } = await firstValueFrom(
      this.httpService.get('https://fakestoreapi.com/products'),
    );

    return data;
  }

  async getUser(id: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://fakestoreapi.com/users/${id}`),
    );

    return data;
  }

  //FakeAPI error without a date.
  async getUserCart(id: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://fakestoreapi.com/carts/user/${id}?startdate=2019-01-01&enddate=2023-12-31`,
      ),
    );

    return data;
  }
}
