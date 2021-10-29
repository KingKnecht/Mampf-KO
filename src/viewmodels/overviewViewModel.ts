import { components, Observable } from "knockout";
import { AppState } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";

export class OverviewViewModel extends BaseViewModel {

  constructor(appState: Observable<AppState>) {
    super(appState);
  }
}

export function registerControl() {
  components.register('overviewview', { template: require('../views/overviewView.html') });
}