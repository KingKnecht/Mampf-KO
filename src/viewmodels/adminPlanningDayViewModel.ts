import { addHours, getDaysInMonth, getMonth, format, setMonth, getDay, getDayOfYear, setHours, setMinutes, subSeconds, addDays } from "date-fns";
import { bindingHandlers, components, computed, Computed, observable, Observable, observableArray, ObservableArray, pureComputed, PureComputed, utils } from "knockout";
import { DishesService } from "src/framework/DishesService";
// import flatpickr from "flatpickr";
// import $ from "jquery";

interface IMonth {
    value: number,
    name: string
}

export class AdminPlanningDayViewModel {
    plannedDishes: ObservableArray<IPlannedDish> = observableArray();
    availableDishes: ObservableArray<IDish> = observableArray();
    dayName: Observable<string> = observable('');
    dayAndMonth: Observable<string> = observable('');
    selectedDish: Observable<IDish | undefined> = observable();
    selectedHour: Observable<string> = observable('');
    selectedMinute: Observable<string> = observable('');
    availableDaysOfMonth: ObservableArray<number> = observableArray()
    selectedDay: Observable<number> = observable(0);
    selectedMonth: Observable<IMonth | undefined> = observable();
    availableMonths: ObservableArray<IMonth> = observableArray()
    
    isDayInPast : Observable<boolean> = observable(false);;

    private readonly dishesService: DishesService;
    private readonly day: IDay;

    constructor(day: IDay, dishesService: DishesService) {

        this.day = day;
        this.dishesService = dishesService;
        this.dayName(day.dayName);
        this.dayAndMonth(day.dayAndMonth);

        setInterval(() => this.isDayInPastFn(), 1000 * 60);

        var months = [...Array(12).keys()].map(m => ({
            value: m,
            name: format(setMonth(new Date(), m), "LLLL")
        } as IMonth));

        this.availableMonths.push(...months);

        this.selectedMonth.subscribe(m => {
            if (m === undefined) return;
            this.availableDaysOfMonth.removeAll();
            let daysInMonth = getDaysInMonth(setMonth(new Date(), m.value));
            this.availableDaysOfMonth.push(...[...Array(daysInMonth).keys()].map((_, i) => i + 1))
        });

        this.selectedMonth(this.availableMonths().find(m => m.value == getMonth(this.day.date)) as IMonth);

        this.selectedDay(+format(this.day.date, "d"));

        dishesService.getDishes().then(dishes => this.availableDishes.push(...dishes));

        dishesService.getPlannedDishesOfDay(day).then(d => {
            this.plannedDishes.push(...d);
        })

        // bindingHandlers.datetimepicker = {
        //     init: function (element: HTMLElement, valueAccessor, allBindingsAccessor) {

        //         var options = $.extend({
        //             dateFormat: 'm-d-Y H:i',
        //             enableTime: true
        //         }, allBindingsAccessor().datetimepickerOptions),
        //             $el = $(element),
        //             picker = flatpickr(element, options);

        //         // Save instance for update method.
        //         $el.data('datetimepickr_inst', picker);

        //         // handle the field changing by registering datepicker's changeDate event
        //         utils.registerEventHandler(element, "change", function () {
        //             valueAccessor()(picker.parseDate($el.val() as string));
        //         }); 

        //         // handle disposal (if KO removes by the template binding)
        //         utils.domNodeDisposal.addDisposeCallback(element, function () {
        //             ($el as any).flatpickr("destroy");
        //         });

        //         // Update datepicker with new value from observable
        //         valueAccessor().subscribe((newVal: any) => $el.val(picker.formatDate(options.dateFormat, newVal)));
        //     },
        //     update: function (element, valueAccessor, allBindingsAccessor) {
        //         // Get datepickr instance.
        //         var picker = $(element).data('datetimepickr_inst');

        //         picker.setDate(ko.unwrap(valueAccessor()));
        //     }
        // };
    }

    addPlannedDish = () => {
        let month = this.selectedMonth()?.value;
        if (this.selectedDish() !== undefined && month !== undefined) {

            this.dishesService.addPlannedDish(this.selectedDish() as IDish,
                this.day,
                +this.selectedHour(),
                +this.selectedMinute(),
                +month,
                +this.selectedDay())
                .then(plannedDishes => {
                    this.plannedDishes.removeAll();
                    this.plannedDishes.push(...plannedDishes)
                });
        }
    }

    getFormattedDate = (date: Date) => {
        if (date === undefined) return '';
        return date.toLocaleTimeString();
    }

    deletePlannedDish = (dish: IPlannedDish) => {
        this.dishesService.deletePlannedDish(dish, this.day).then(plannedDishes => {
            this.plannedDishes.removeAll();
            this.plannedDishes.push(...plannedDishes);
        });
    }

    private isDayInPastFn = () => {
        this.isDayInPast(subSeconds(addDays(this.day.date,1), 1) < new Date());
    };

   
}

export function registerControl() {
    components.register('adminplanningday', { template: require('../views/adminPlanningDayView.html') });
}