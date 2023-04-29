import { Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class Address {
  @Expose()
  geolocation: {
    lat: string;
    long: string;
  };

  @Expose()
  city: string;

  @Expose()
  street: string;

  @Expose()
  number: number;

  @Expose()
  zipcode: string;
}

class Product {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  category: string;

  @Expose()
  image: string;

  @Expose()
  rating: {
    rate: number;
    count: number;
  };
}

class CartProduct {
  @Expose()
  quantity: number;

  @Expose()
  @ValidateNested()
  @Type(() => Product)
  product: Product;
}

class Cart {
  @Expose()
  id: number;

  @Expose()
  date: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CartProduct)
  products: CartProduct[];
}

@Expose()
export class UserHistoryDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ value }) => `${value.firstname} ${value.lastname}`)
  name: {
    firstname: string;
    lastname: string;
  };

  @Expose()
  username: string;

  @Expose()
  email: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Cart)
  history: Cart[];

  constructor(obj) {
    Object.assign(this, obj);
  }
}
