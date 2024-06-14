import { Controller, Get } from '@nestjs/common';
import {CartService} from "./services/cart.service";


@Controller()
export class CartController {
    constructor(private readonly cartService: CartService) {}

}