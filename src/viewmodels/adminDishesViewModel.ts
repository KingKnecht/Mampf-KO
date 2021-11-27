import { components, observable, Observable, observableArray, ObservableArray } from "knockout";
import { AppState } from "src/framework/appState";
import { DishesService } from "src/framework/DishesService";
import { AdminAddDishViewModel } from "./adminAddDishViewModel";
import { BaseViewModel } from "./baseViewModel";




export class AdminDishesViewModel extends BaseViewModel {

  dishesCount: Observable<number> = observable(0);
  dishes: ObservableArray<IDish> = observableArray();


  private readonly dishesService: DishesService;

  constructor(appState: Observable<AppState>, dishesService: DishesService) {
    super(appState);

    this.dishesService = dishesService;
    this.onPageEnter();
  }

  openAddDish = () => {
    this.requestPage('ADMIN_ADD_DISH')
  }


 
  onPageEnter = () => {
    (async () => {
      this.dishes(await this.dishesService.getDishes());
      this.dishesCount(this.dishes().length);
    })();

  }
  onPageLeave = () => {

  }

}

export function registerControl() {
  components.register('admindishesview', { template: require('../views/admindishesview.html') });
}