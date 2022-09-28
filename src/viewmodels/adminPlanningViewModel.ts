import { components, Observable, ObservableArray, observableArray } from "knockout";
import { AppState } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";
import { addDays, format, startOfWeek, getWeek } from 'date-fns'

export class AdminPlanningViewModel extends BaseViewModel {

  days : ObservableArray<IDay> = observableArray();
  constructor(appState: Observable<AppState>) {
    super(appState);

    var firstDayOfWeek = startOfWeek(new Date(), { locale: undefined, weekStartsOn: 1 });
    const dayNamesOfWeek = Array.from(Array(5)).map((e, i) => format(addDays(firstDayOfWeek, i), 'EEEE'));
    const datesOfWeek = Array.from(Array(5)).map((e, i) => format(addDays(firstDayOfWeek, i), 'dd MMM'));

    var days = dayNamesOfWeek.map((e, i) => ({
      name: dayNamesOfWeek[i],
      date: datesOfWeek[i],
      dishes: []
    })) as IDay[];

    this.days.push(...days);
  }

  onPageEnter(): void {
    

   
  }
  onPageLeave(): void {

  }



}


export function registerControl() {
  components.register('adminplanning', { template: require('../views/adminPlanningView.html') });
}