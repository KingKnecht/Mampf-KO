import { components, observable, Observable } from "knockout";
import { AppState } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";


export class AdminLoginViewModel extends BaseViewModel{
  
  onPageEnter(): void {
    throw new Error("Method not implemented.");
  }
  onPageLeave(): void {
    throw new Error("Method not implemented.");
  }

  username: Observable<string> = observable('')
  password: Observable<string> = observable('')

  constructor(appState: Observable<AppState>) {
    super(appState);
  }

  handleSubmit = () => {
    if (this.username() === "123" && this.password() === "123") {
      let state = this.appState();
      state = {
        ...state,
        isAdmin: true
      }
      this.appState(state);
    }
  }

  handleCancel = () : boolean => {
    let state = this.appState();
      state = {
        ...state,
        action : {kind: 'RequestPageType', page : state.previousPage}
      }
      this.appState(state);
      return false;
  }
}


export function registerControl() {
  components.register('adminloginview', { template: require('../views/adminloginview.html') });
}