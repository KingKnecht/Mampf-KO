import { components, computed, Computed, observable, Observable, observableArray, ObservableArray } from "knockout";
import { validateObservable, } from "knockout.validation";

import { AppState } from "src/framework/appState";
import { DishesService } from "src/framework/DishesService";
import { BaseViewModel } from "./baseViewModel";

export class AdminAddDishViewModel extends BaseViewModel {

  formVm: Observable<AddDishFormViewModel | undefined> = observable();
  dishes: IDish[];
  readonly dishesService: DishesService;

  constructor(appState: Observable<AppState>, dishesService: DishesService) {
    super(appState);

    this.dishesService = dishesService;
  }

  onPageEnter = () => {
    this.formVm(new AddDishFormViewModel(this.dishesService, this.appState))
  }
  
  onPageLeave = () => {
  
  }
}

//FYI: FormViewModel is used as a little trick to be able to create a completly
//new viewmodel for the form every time a "Add dish" is executed.
//This is important because the validation of the form should be in a clean start state.
//https://stackoverflow.com/a/14047064/2356048
class AddDishFormViewModel extends BaseViewModel{
   
  dishName: Observable<string> = observable('')
  description: Observable<string> = observable('')
  existingDishes: ObservableArray<IDish> = observableArray();
  isFormValid: Computed;
  dishesService: DishesService;

  constructor(dishesService: DishesService, appState: Observable<AppState>) {
    super(appState);

    this.dishesService = dishesService;
    this.onPageEnter();
    
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

  onPageEnter = () => {
    (async () => {
      this.existingDishes(await this.dishesService.getDishes());
    })();
  }
  onPageLeave = () => {
    
  }

  handleSubmit = () => {
    this.dishesService.add({
      id: '',
      name: this.dishName(),
      description: this.description(),
    });

    this.requestPreviousPage();
  }

  handleCancel = () => {
    this.requestPreviousPage();
  }
}


export function registerControl() {
  components.register('adminadddishview', { template: require('../views/adminAddDishView.html') });
}