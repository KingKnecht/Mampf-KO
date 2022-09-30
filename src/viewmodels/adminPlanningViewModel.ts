import { components, observable, Observable, ObservableArray, observableArray } from "knockout";
import { AppState } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";
import { DishesService } from "src/framework/DishesService";
import { AdminPlanningDayViewModel } from "./adminPlanningDayViewModel";

export class AdminPlanningViewModel extends BaseViewModel {

  dayVms: ObservableArray<AdminPlanningDayViewModel> = observableArray();
  availableDishes: ObservableArray<IDish> = observableArray();
  
  private readonly dishesService: DishesService;

  constructor(appState: Observable<AppState>, dishesService: DishesService) {
    super(appState);

    this.dishesService = dishesService;
    
    let dayVms = dishesService.createWorkingDaysOfWeek(new Date())
      .map(d => new AdminPlanningDayViewModel(d, dishesService));

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


