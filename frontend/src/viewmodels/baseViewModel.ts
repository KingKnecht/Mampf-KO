import { Observable } from "knockout";
import { AppState, PageTypes, RequestPageType } from "src/framework/appState";
import { DishesService } from "src/framework/DishesService";

export abstract class BaseViewModel {
  protected appState: Observable<AppState>;

  constructor(appState : Observable<AppState>){
    this.appState = appState;
  }

  abstract onPageEnter() : void;
  abstract onPageLeave() : void;

  requestPage = (page: PageTypes) => {
    let state = this.appState();
    state = {
      ...state,
      action: ({kind: 'RequestPageType', page : page} as RequestPageType)
    }
    this.appState(state);
  }

  requestPageWithDish = (page: PageTypes, payload : IDish) => {
    let state = this.appState();
    state = {
      ...state,
      payload : payload,
      action: ({kind: 'RequestPageType', page : page} as RequestPageType)
    }
    this.appState(state);
  }

  requestPreviousPage = () => {
    this.requestPage(this.appState().previousPage);
  }
  
}