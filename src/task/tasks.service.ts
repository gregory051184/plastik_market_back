import {Injectable} from "@nestjs/common";
import {Cron} from "@nestjs/schedule";
import {ItemService} from "../items/services/item.service";
import {config} from 'dotenv';
import * as process from 'node:process';

config();

@Injectable()
export class TasksService {
    constructor(
        private readonly itemService: ItemService
    ) {
    }

    @Cron('45 * * * * *')
    async subscribeTask(): Promise<void> {

        try {
            const itemsTime = +process.env.ITEMSTIME
            const currentDate = new Date().toLocaleDateString();
            const items = await this.itemService.getAllForCron();
            const list = items.map((item: any) => ({
                'date': item.updatedAt.toLocaleDateString(),
                'id': item.id
            }));
            for (let i = 0; i < list.length; i++) {
                //Проверка года
                if (list[i].date.split('.')[2] === currentDate.split('.')[2]) {

                    switch (list[i].date.split('.')[1]) {

                        case('01' || '03' || '05' || '07' || '08' || '10' || '12'):

                            if (itemsTime === 5) {
                                if (list[i].date.split('.')[0] === '31' && currentDate.split('.')[0] === '05') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '30' && currentDate.split('.')[0] === '04') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '03') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '02') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                    //нужно проверить есть ли перед однозначным число ноль !!!
                                } else if (list[i].date.split('.')[0] === '27' && currentDate.split('.')[0] === '01') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                    //нужно проверить есть ли перед однозначным число ноль !!!
                                } else if (+list[i].date.split('.')[0] + 5 === +currentDate.split('.')[0]) {
                                    await this.itemService.makeItemSold(+list[i].id)
                                }

                            }

                            if (itemsTime === 4) {
                                if (list[i].date.split('.')[0] === '31' && currentDate.split('.')[0] === '04') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '30' && currentDate.split('.')[0] === '03') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '02') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '01') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                    //нужно проверить есть ли перед однозначным число ноль !!!
                                } else if (+list[i].date.split('.')[0] + 4 === +currentDate.split('.')[0]) {
                                    await this.itemService.makeItemSold(+list[i].id)
                                }

                            }

                            if (itemsTime === 3) {
                                if (list[i].date.split('.')[0] === '31' && currentDate.split('.')[0] === '03') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '30' && currentDate.split('.')[0] === '02') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '01') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (+list[i].date.split('.')[0] + 3 === +currentDate.split('.')[0]) {
                                    await this.itemService.makeItemSold(+list[i].id)
                                }
                            }
                            return

                        case('02'):
                            //Если true - значит год високосный
                            const getLeapYear = (year: number) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
                            const year = list[i].date.split('.')[2];

                            if (getLeapYear(year)) {

                                if (itemsTime === 5) {
                                    if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '05') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '04') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '27' && currentDate.split('.')[0] === '03') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '26' && currentDate.split('.')[0] === '02') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                        //нужно проверить есть ли перед однозначным число ноль !!!
                                    } else if (list[i].date.split('.')[0] === '25' && currentDate.split('.')[0] === '01') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                        //нужно проверить есть ли перед однозначным число ноль !!!
                                    } else if (+list[i].date.split('.')[0] + 5 === +currentDate.split('.')[0]) {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    }

                                }

                                if (itemsTime === 4) {
                                    if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '04') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '03') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '27' && currentDate.split('.')[0] === '02') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '26' && currentDate.split('.')[0] === '01') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                        //нужно проверить есть ли перед однозначным число ноль !!!
                                    } else if (+list[i].date.split('.')[0] + 4 === +currentDate.split('.')[0]) {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    }

                                }

                                if (itemsTime === 3) {
                                    if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '03') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '02') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '27' && currentDate.split('.')[0] === '01') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (+list[i].date.split('.')[0] + 3 === +currentDate.split('.')[0]) {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    }
                                }
                            }

                            if (!getLeapYear(year)) {

                                if (itemsTime === 5) {
                                    if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '05') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '27' && currentDate.split('.')[0] === '04') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '26' && currentDate.split('.')[0] === '03') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '25' && currentDate.split('.')[0] === '02') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                        //нужно проверить есть ли перед однозначным число ноль !!!
                                    } else if (list[i].date.split('.')[0] === '24' && currentDate.split('.')[0] === '01') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                        //нужно проверить есть ли перед однозначным число ноль !!!
                                    } else if (+list[i].date.split('.')[0] + 5 === +currentDate.split('.')[0]) {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    }

                                }

                                if (itemsTime === 4) {
                                    if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '04') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '03') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '26' && currentDate.split('.')[0] === '02') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '25' && currentDate.split('.')[0] === '01') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                        //нужно проверить есть ли перед однозначным число ноль !!!
                                    } else if (+list[i].date.split('.')[0] + 4 === +currentDate.split('.')[0]) {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    }

                                }

                                if (itemsTime === 3) {
                                    if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '03') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '27' && currentDate.split('.')[0] === '02') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (list[i].date.split('.')[0] === '26' && currentDate.split('.')[0] === '01') {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    } else if (+list[i].date.split('.')[0] + 3 === +currentDate.split('.')[0]) {
                                        await this.itemService.makeItemSold(+list[i].id)
                                    }
                                }
                            }
                            return

                        case('04' || '06' || '09' || '11'):

                            if (itemsTime === 5) {
                                if (list[i].date.split('.')[0] === '30' && currentDate.split('.')[0] === '05') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '04') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '03') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '27' && currentDate.split('.')[0] === '02') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                    //нужно проверить есть ли перед однозначным число ноль !!!
                                } else if (list[i].date.split('.')[0] === '26' && currentDate.split('.')[0] === '01') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                    //нужно проверить есть ли перед однозначным число ноль !!!
                                } else if (+list[i].date.split('.')[0] + 5 === +currentDate.split('.')[0]) {
                                    await this.itemService.makeItemSold(+list[i].id)
                                }

                            }

                            if (itemsTime === 4) {
                                if (list[i].date.split('.')[0] === '30' && currentDate.split('.')[0] === '04') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '03') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '02') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '27' && currentDate.split('.')[0] === '01') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                    //нужно проверить есть ли перед однозначным число ноль !!!
                                } else if (+list[i].date.split('.')[0] + 4 === +currentDate.split('.')[0]) {
                                    await this.itemService.makeItemSold(+list[i].id)
                                }

                            }

                            if (itemsTime === 3) {
                                if (list[i].date.split('.')[0] === '30' && currentDate.split('.')[0] === '03') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '29' && currentDate.split('.')[0] === '02') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (list[i].date.split('.')[0] === '28' && currentDate.split('.')[0] === '01') {
                                    await this.itemService.makeItemSold(+list[i].id)
                                } else if (+list[i].date.split('.')[0] + 3 === +currentDate.split('.')[0]) {
                                    await this.itemService.makeItemSold(+list[i].id)
                                }
                            }
                            return
                    }
                }
            }

        } catch (error) {

        }

    }
}