import { Observable } from "knockout";
import { AppState } from "src/framework/appState";

export class BaseViewModel {
  protected appState: Observable<AppState>;

  constructor(appState : Observable<AppState>){
    this.appState = appState;
  }
  
}