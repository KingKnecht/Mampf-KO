import { components, computed, Computed, observable, Observable, observableArray, ObservableArray } from "knockout";
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
  existingDishes: ObservableArray<IDish> = observableArray();
  isFormValid: Computed;

  parentHandleCancel: () => void;
  parentHandleAddDish : (dish: IDish) => void;


  constructor(appState: Observable<AppState>) {
    super(appState);


    this.dishName
      .extend({
        required: {
          params: 'true',
          message: () => 'Dish Name is required.'
        },

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
    }
    );
  }

  ClearForm = () => {
    this.dishName('');
    this.description('');
  }

  setDishes = (dishes: IDish[]) => {
    this.existingDishes(dishes);
  }

  handleSubmit = () => {
   this.parentHandleAddDish({
     id : '',
     name : this.dishName(),
     description : this.description(),
   })
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