import { components, observable, Observable, observableArray, ObservableArray } from "knockout";
import { AppState } from "src/framework/appState";
import { DishesService } from "src/framework/DishesService";
import { AdminAddDishViewModel } from "./adminAddDishViewModel";
import { AdminEditDishViewModel } from "./adminEditDishViewModel";
import { BaseViewModel } from "./baseViewModel";




export class AdminDishesViewModel extends BaseViewModel {

  //Todo: convert dishesCount & isAskingForDeletion to computed observables?
  dishesCount: Observable<number> = observable(0);
  dishes: ObservableArray<IDish> = observableArray();
  toBeDeletedDish: Observable<IDish | undefined> = observable();
  public readonly isAskingForDeletion: Observable<boolean> = observable(false);

  private readonly dishesService: DishesService;

  constructor(appState: Observable<AppState>, dishesService: DishesService) {
    super(appState);

    this.dishesService = dishesService;
    this.onPageEnter();
  }

  openAddDish = () => {
    this.requestPage('ADMIN_ADD_DISH')
  }

  openEditDish = (dish: IDish) => {
    this.requestPageWithDish('ADMIN_EDIT_DISH', dish)
  }

  deleteDish = (dish: IDish) => {
    this.toBeDeletedDish(dish);
    this.isAskingForDeletion(true);
  }

  acknowlageDeleteDish = () => {
    if (this.toBeDeletedDish() !== undefined) {
      this.dishesService.delete(this.toBeDeletedDish() as IDish)
      this.toBeDeletedDish(undefined);
      this.isAskingForDeletion(false);
      this.onPageEnter();
    }
  }

  cancelDeleteDish = () => {
    this.toBeDeletedDish(undefined);
    this.isAskingForDeletion(false);
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