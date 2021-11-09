import { components, computed, Computed, observable, Observable, observableArray, ObservableArray } from "knockout";
import { validateObservable, } from "knockout.validation";

import { AppState } from "src/framework/appState";
import { BaseViewModel } from "./baseViewModel";

// interface InputField {
//   isTouched: boolean,
//   hasError: boolean,
//   errorMsg: string,
//   value: string
// }

// interface FormData {
//   nameInput: InputField,
//   descriptionInput: InputField
//   isValid: boolean
// }



export class AdminAddDishViewModel extends BaseViewModel {
  
  
  //parentHandleCancel: () => void;
  //parentHandleAddDish: (dish: IDish) => void;
  formVm : Observable<AddDishFormViewModel|undefined> = observable();

  constructor(appState: Observable<AppState>) {
    super(appState);


  }

  init = (dishes: IDish[], onSubmit : (dish: IDish) => void, onCancel: () => void) => {
    this.formVm(new AddDishFormViewModel(dishes,onSubmit, onCancel))
  }

}

//FYI: FormViewModel is used as a little trick to be able to create a completly
//new viewmodel for the form every time a "Add dish" is executed.
//This is important because the validation of the form should be in a clean start state.
//https://stackoverflow.com/a/14047064/2356048
class AddDishFormViewModel {
  dishName: Observable<string> = observable('')
  description: Observable<string> = observable('')
  existingDishes: ObservableArray<IDish> = observableArray();
  isFormValid: Computed;
  onSubmit: (dish: IDish) => void;
  onCancel: () => void;

  constructor(dishes: IDish[],onSubmit : (dish: IDish) => void, onCancel: () => void) {

    this.existingDishes(dishes);
    this.onSubmit = onSubmit;
    this.onCancel = onCancel;

    this.dishName
      .extend({
        required: {
          params: 'true',
          message: () => 'Dish Name is required.'
        },
        rateLimit: { timeout: 200, method: "notifyWhenChangesStop" }
      } as any)
      .extend({
        unique: {
          params: {
            collection: this.existingDishes,
            externalValue: true,
            valueAccessor: (dish: IDish) => dish.name
          },
          message: () => 'Dish with given name already exists.'
        }
      } as any);

    this.description.extend({ required: true } as any)

    this.isFormValid = computed(() => {
      return validateObservable(this.dishName as any);
    });

  }

  handleSubmit = () => {
    this.onSubmit({
      id: '',
      name: this.dishName(),
      description: this.description(),
    })
  }

  handleCancel = () => {
   this.onCancel();
  }
}


export function registerControl() {
  components.register('adminadddishview', { template: require('../views/adminAddDishView.html') });
}