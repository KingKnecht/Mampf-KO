import { components, observable, Observable, ObservableArray, observableArray } from "knockout";
import { AppState } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";
import { DishesService } from "src/framework/DishesService";
import { AdminPlanningDayViewModel } from "./adminPlanningDayViewModel";
import { addWeeks } from "date-fns";

export class AdminPlanningViewModel extends BaseViewModel {

  dayVms: ObservableArray<AdminPlanningDayViewModel> = observableArray();
  availableDishes: ObservableArray<IDish> = observableArray();
  
  private readonly dishesService: DishesService;
  private showingDate: Date;

  constructor(appState: Observable<AppState>, dishesService: DishesService) {
    super(appState);

    this.dishesService = dishesService;
    
    this.showingDate = new Date();
    let dayVms = dishesService.createWorkingDaysOfWeek(this.showingDate)
      .map(d => new AdminPlanningDayViewModel(d, dishesService));

    this.dayVms.push(...dayVms);
  }

  gotoPreviousWeek = () => {
    this.showingDate = addWeeks(this.showingDate, -1);
    let dayVms = this.dishesService.createWorkingDaysOfWeek(this.showingDate)
      .map(d => new AdminPlanningDayViewModel(d, this.dishesService));

    this.dayVms.removeAll();
    this.dayVms.push(...dayVms);
  }

  gotoNextWeek = () => {
    this.showingDate = addWeeks(this.showingDate, 1);
    let dayVms = this.dishesService.createWorkingDaysOfWeek(this.showingDate)
      .map(d => new AdminPlanningDayViewModel(d, this.dishesService));

    this.dayVms.removeAll();
    this.dayVms.push(...dayVms);

  }

  gotoPresentWeek = () => {
        let dayVms = this.dishesService.createWorkingDaysOfWeek(new Date())
      .map(d => new AdminPlanningDayViewModel(d, this.dishesService));

    this.dayVms.removeAll();
    this.dayVms.push(...dayVms);

  }

  onPageEnter(): void {



  }
  onPageLeave(): void {

  }
  
}


export function registerControl() {
  components.register('adminplanning', { template: require('../views/adminPlanningView.html') });
}


