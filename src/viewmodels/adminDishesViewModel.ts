import { components, observable, Observable, observableArray, ObservableArray } from "knockout";
import { AppState } from "src/framework/appState";
import { AdminAddDishViewModel } from "./adminAddDishViewModel";
import { BaseViewModel } from "./baseViewModel";


const dishes: IDish[] = [
  {
    id: "1",
    name: 'Spätzle mit Soß',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua'
  },
  {
    id: "2",
    name: 'xxx',
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
  }


  openAddDish = () => {
    this.adminAddDishViewModel.init(dishes,
      (dish: IDish) => {
        this.dishes.push(dish);
        this.isAddDishActive(false);
      },
      () => {
        this.isAddDishActive(false)
      }
    );
    this.isAddDishActive(true);
  }

}

export function registerControl() {
  components.register('admindishesview', { template: require('../views/admindishesview.html') });
}