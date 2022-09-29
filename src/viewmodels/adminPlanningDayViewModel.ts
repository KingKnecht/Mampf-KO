import { components, observable, Observable, observableArray, ObservableArray } from "knockout";
import { DishesService } from "src/framework/DishesService";

export class AdminPlanningDayViewModel {
    dishes: ObservableArray<IDish> = observableArray();
    dayName: Observable<string> = observable('');
    dayAndMonth: Observable<string> = observable('');

    constructor(day: IDay, dishesService: DishesService) {

        this.dayName(day.dayName);
        this.dayAndMonth(day.dayAndMonth);

        (async () => {
            var dishes = await dishesService.getPlannedDishesOfDay(day);
            this.dishes.push(...dishes);
        })();

    }
}

export function registerControl() {
    components.register('adminplanningday', { template: require('../views/adminPlanningDayView.html') });
}