import { components, Observable } from "knockout";
import { AppState } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";

export class AdminPlanningViewModel extends BaseViewModel{
  constructor(appState : Observable<AppState>) {
    super(appState);


  }


}


export function registerControl() {
  components.register('adminplanning', { template: require('../views/adminPlanningView.html') });
}