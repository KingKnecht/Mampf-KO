import { components, Observable } from "knockout";
import { AppState } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";

export class AdminDishesViewModel extends BaseViewModel{
  constructor(appState : Observable<AppState>) {
    super(appState);
  }
  
}

export function registerControl() {
  components.register('admindishesview', { template: require('../views/admindishesview.html') });
}