import { Injectable } from '@angular/core';

export interface List {
  id: number;
  text: string;
  icon: string;
}

export interface Order {
  ID: number;
  OrderNumber: number;
  OrderDate: string;
  SaleAmount: number;
  Terms: string;
  CustomerStoreState: string;
  CustomerStoreCity: string;
  Employee: string;
}

export interface Population {
  arg: number;
  val: number;
}

const populationData: Population[] = [
  { arg: 1960, val: 3032019978 },
  { arg: 1970, val: 3683676306 },
  { arg: 1980, val: 4434021975 },
  { arg: 1990, val: 5281340078 },
  { arg: 2000, val: 6115108363 },
  { arg: 2010, val: 6922947261 },
  { arg: 2020, val: 7795000000 },
];

const orders: Order[] = [
  {
    ID: 1,
    OrderNumber: 35703,
    OrderDate: '2014/04/10',
    SaleAmount: 11800,
    Terms: '15 Days',
    CustomerStoreState: 'California',
    CustomerStoreCity: 'Los Angeles',
    Employee: 'Harv Mudd',
  },
  {
    ID: 4,
    OrderNumber: 35711,
    OrderDate: '2014/01/12',
    SaleAmount: 16050,
    Terms: '15 Days',
    CustomerStoreState: 'California',
    CustomerStoreCity: 'San Jose',
    Employee: 'Jim Packard',
  },
  {
    ID: 5,
    OrderNumber: 35714,
    OrderDate: '2014/01/22',
    SaleAmount: 14750,
    Terms: '15 Days',
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Las Vegas',
    Employee: 'Harv Mudd',
  },
  {
    ID: 7,
    OrderNumber: 35983,
    OrderDate: '2014/02/07',
    SaleAmount: 3725,
    Terms: '15 Days',
    CustomerStoreState: 'Colorado',
    CustomerStoreCity: 'Denver',
    Employee: 'Todd Hoffman',
  },
  {
    ID: 9,
    OrderNumber: 36987,
    OrderDate: '2014/03/11',
    SaleAmount: 14200,
    Terms: '15 Days',
    CustomerStoreState: 'Utah',
    CustomerStoreCity: 'Salt Lake City',
    Employee: 'Clark Morgan',
  },
];

const navigation: List[] = [
  { id: 1, text: 'Products', icon: 'product' },
  { id: 2, text: 'Sales', icon: 'money' },
  { id: 3, text: 'Customers', icon: 'group' },
  { id: 4, text: 'Employees', icon: 'card' },
  { id: 5, text: 'Reports', icon: 'chart' },
];

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  getOrders(): Order[] {
    return orders;
  }

  getNavigationItems(): List[] {
    return navigation;
  }

  getPopulationData(): Population[] {
    return populationData;
  }
}
