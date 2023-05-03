export interface iUser {
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  __v: number;
}

export interface iCart {
  id: number;
  userId: number;
  date: string;
  products: iCartProduct[];
  __v: number;
}

export interface iCartProduct {
  productId: number;
  quantity: number;
}

export interface iProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
