import { components, observable, Observable, observableArray, ObservableArray } from "knockout";
import { DishesService } from "src/framework/DishesService";
import { stringify } from "uuid";

export class AdminPlanningDayViewModel {
    plannedDishes: ObservableArray<IPlannedDish> = observableArray();
    availableDishes: ObservableArray<IDish> = observableArray();
    dayName: Observable<string> = observable('');
    dayAndMonth: Observable<string> = observable('');
    selectedDish: Observable<IDish | undefined> = observable();
    selectedHour: Observable<string> = observable('');
    selectedMinute: Observable<string> = observable('');

    private readonly dishesService: DishesService;
    private readonly day: IDay;

    constructor(day: IDay, dishesService: DishesService) {

        this.day = day;
        this.dishesService = dishesService;
        this.dayName(day.dayName);
        this.dayAndMonth(day.dayAndMonth);

        dishesService.getDishes().then(dishes => this.availableDishes.push(...dishes));

        dishesService.getPlannedDishesOfDay(day).then(d => {
            this.plannedDishes.push(...d);
        })

    }

    addPlannedDish = () => {
        if (this.selectedDish() !== undefined) {
            this.dishesService.addPlannedDish(this.selectedDish() as IDish, this.day, +this.selectedHour(), +this.selectedMinute())
                .then(plannedDishes => {
                    this.plannedDishes.removeAll();
                    this.plannedDishes.push(...plannedDishes)
                });
        }
    }
}

export function registerControl() {
    components.register('adminplanningday', { template: require('../views/adminPlanningDayView.html') });
}