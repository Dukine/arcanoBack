import { Expose, Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class Address {
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

export class Product {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  category: string;

  @ApiProperty()
  @Expose()
  image: string;
}

export class CartProduct {
  @ApiProperty()
  @Expose()
  quantity: number;

  @ApiProperty()
  @Expose()
  @ValidateNested()
  @Type(() => Product)
  product: Product;
}

export class Cart {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  date: string;

  @ApiProperty({ type: [CartProduct] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CartProduct)
  products: CartProduct[];
}

export class UserHistoryDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({ type: String })
  @Expose()
  @Transform(({ value }) => `${value.firstname} ${value.lastname}`)
  name: {
    firstname: string;
    lastname: string;
  };

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @ApiProperty({ type: [Cart] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Cart)
  history: Cart[];

  constructor(obj) {
    Object.assign(this, obj);
  }
}
