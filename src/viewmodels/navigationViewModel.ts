import { components, observable, Observable } from "knockout";
import { AppState, LogoutAdminType, PageTypes, RequestPageType } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";


export class NavigationViewModel extends BaseViewModel{

  readonly isAdmin : Observable<boolean> = observable(false);

  constructor(appState: Observable<AppState>) {
    super(appState);

    this.appState.subscribe((state) => {
      this.isAdmin(state.isAdmin);
    });

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

  requestAdminLogout = () => {
    let state = this.appState();
    state = {
      ...state,
      action: {kind: 'LogoutAdminType'} as LogoutAdminType
    }
    this.appState(state);
  }

  private requestPage = (page: PageTypes) => {
    let state = this.appState();
    state = {
      ...state,
      action: ({kind: 'RequestPageType', page : page} as RequestPageType)
    }
    this.appState(state);
  }
}

export function registerControl() {
  components.register('navigationview', { template: require('../views/navigationView.html') });
}