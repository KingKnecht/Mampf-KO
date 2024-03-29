import { components, observable, Observable } from "knockout";
import { AppState, LogoutAdminType, PageTypes, RequestPageType } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";


export class NavigationViewModel extends BaseViewModel{

  readonly isAdmin : Observable<boolean> = observable(false);
  readonly isMenuOpen : Observable<boolean> = observable(false);

  constructor(appState: Observable<AppState>) {
    super(appState);

    this.isAdmin(appState().isAdmin)

    this.appState.subscribe((state) => {
      this.isAdmin(state.isAdmin);
    });

  }

 
  isPageActive = (name: string): boolean => {
    return name === this.appState().activePage;
  }

  toggleMenu = () => {
    this.isMenuOpen(!this.isMenuOpen());
  }

  requestAdminPlanningPage = () => {
    this.requestPage("ADMIN_PLANNING")
    this.toggleMenu();
  }

  requestOverviewPage = () => {
    this.requestPage("OVERVIEW")
    this.toggleMenu();
  }

  requestAdminDishesPage = () => {
    this.requestPage("ADMIN_DISHES")
    this.toggleMenu();
  }
  requestAdminLogout = () => {
    let state = this.appState();
    state = {
      ...state,
      action: {kind: 'LogoutAdminType'} as LogoutAdminType
    }
    this.appState(state);
    this.toggleMenu();
  }

  onPageEnter = () => {
   
  }
  onPageLeave = () => {
   
  }
  
}

export function registerControl() {
  components.register('navigationview', { template: require('../views/navigationView.html') });
}