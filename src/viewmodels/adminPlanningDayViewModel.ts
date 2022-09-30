import { components, observable, Observable, observableArray, ObservableArray } from "knockout";
import { DishesService } from "src/framework/DishesService";

export class AdminPlanningDayViewModel {
    plannedDishes: ObservableArray<IDish> = observableArray();
    availableDishes: ObservableArray<IDish> = observableArray();
    dayName: Observable<string> = observable('');
    dayAndMonth: Observable<string> = observable('');
    selectedDish: Observable<IDish | undefined> = observable();

    constructor(day: IDay, dishesService: DishesService) {

        this.dayName(day.dayName);
        this.dayAndMonth(day.dayAndMonth);

        dishesService.getDishes().then(dishes => this.availableDishes.push(...dishes));

        dishesService.getPlannedDishesOfDay(day).then(d => {
            this.plannedDishes.push(...d);
        })
    }
}

export function registerControl() {
    components.register('adminplanningday', { template: require('../views/adminPlanningDayView.html') });
}