import { applyBindings, components, observable, Observable, observableArray, ObservableArray } from "knockout";
import { AppState } from "src/framework/appState";
import { AdminAddDishViewModel } from "./adminAddDish";
import { BaseViewModel } from "./baseViewModel";


const dishes: IDish[] = [
  {
    id: "1",
    name: 'Spätzle mit Soß',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua'
  }
]

export class AdminDishesViewModel extends BaseViewModel {

  dishesCount: Observable<number> = observable(dishes.length);
  dishes: ObservableArray<IDish> = observableArray(dishes);
  isAddDishActive: Observable<boolean> = observable(false);
  adminAddDishViewModel: AdminAddDishViewModel;


  constructor(appState: Observable<AppState>, adminAddDishViewModel: AdminAddDishViewModel) {
    super(appState);

    this.adminAddDishViewModel = adminAddDishViewModel;
    this.adminAddDishViewModel.parentHandleCancel = () => this.isAddDishActive(false);
  }


  openAddDish = () => {
    this.isAddDishActive(true);
  }

}

export function registerControl() {
  components.register('admindishesview', { template: require('../views/admindishesview.html') });
}