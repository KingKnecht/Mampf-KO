import { components, observable, Observable } from "knockout";
import { AppState, PageTypes } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";


export class NavigationViewModel extends BaseViewModel{

  constructor(appState: Observable<AppState>) {
    super(appState);
  }

  isPageActive = (name: string): boolean => {
    return name === this.appState().activePage;
  }

  requestAdminPage = () => {
    this.requestPage("ADMIN_PLANNING")
  }

  requestOverviewPage = () => {
    this.requestPage("OVERVIEW")
  }

  private requestPage = (page: PageTypes) => {
    let state = this.appState();
    state = {
      ...state,
      requestedPage: page
    }
    this.appState(state);
  }
}

export function registerControl() {
  components.register('navigationview', { template: require('../views/navigationView.html') });
}