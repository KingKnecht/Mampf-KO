import { components, computed, Computed, observable, Observable } from "knockout";
import { validateObservable } from "knockout.validation";

import { AppState } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";

interface InputField {
  isTouched: boolean,
  hasError: boolean,
  errorMsg: string,
  value: string
}

interface FormData {
  nameInput: InputField,
  descriptionInput: InputField
  isValid: boolean
}

export class AdminAddDishViewModel extends BaseViewModel {

  dishName: Observable<string> = observable('')
  description: Observable<string> = observable('')
  isFormValid : Computed;

  parentHandleCancel: () => {};
  constructor(appState: Observable<AppState>) {
    super(appState);

   

    this.dishName.extend({ required: true } as any);
    // .extend({ minLength: 3 } as any).extend({
    //   pattern: {
    //     message: 'Hey this doesnt match my pattern',
    //     params: '^[A-Z0-9].$'
    //   }
    // } as any);

    this.description.extend({ required: true } as any)


    this.isFormValid = computed(() =>
      {
        const x = validateObservable(this.dishName as any);
        console.log(x);
        return x;
      }
    )
    // applyBindings(x);

  }

  handleSubmit = () => {
    if (this.dishName() != undefined) {

    }
  }

  handleCancel = () => {
    this.dishName('');
    this.description('');
    this.parentHandleCancel();
  }

}


export function registerControl() {
  components.register('adminadddishview', { template: require('../views/adminAddDishView.html') });
}