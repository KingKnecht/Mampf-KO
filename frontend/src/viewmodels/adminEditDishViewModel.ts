import { components, computed, Computed, extenders, observable, Observable, observableArray, ObservableArray, pureComputed } from "knockout";
import { validateObservable, } from "knockout.validation";

import { AppState } from "src/framework/appState";
import { DishesService } from "src/framework/DishesService";
import { BaseViewModel } from "./baseViewModel";

export class AdminEditDishViewModel extends BaseViewModel {

    formVm: Observable<EditDishFormViewModel | undefined> = observable();
    dishes: IDish[];
    readonly dishesService: DishesService;

    constructor(appState: Observable<AppState>, dishesService: DishesService) {
        super(appState);

        this.dishesService = dishesService;
    }

    onPageEnter = () => {
        this.formVm(new EditDishFormViewModel(this.dishesService, this.appState))
    }

    onPageLeave = () => {

    }
}

class IngredientVm {

    constructor(ingredient: IIngredient) {
        this.id = ingredient.id;
        this.name = observable(ingredient.name);
        this.amount = observable(ingredient.amount);
        this.unit = observable(ingredient.unit);
    }
    id: string | undefined;
    name: Observable<string>;
    amount: Observable<number | undefined>;
    unit: Observable<string | undefined>;
    isEditing: Observable<boolean> = observable(false);
}

//FYI: FormViewModel is used as a little trick to be able to create a completly
//new viewmodel for the form every time a "Edit dish" is executed.
//This is important because the validation of the form should be in a clean start state.
//https://stackoverflow.com/a/14047064/2356048
class EditDishFormViewModel extends BaseViewModel {

    dishName: Observable<string> = observable('')
    description: Observable<string> = observable('')
    readonly id: string | undefined = ''
    existingDishes: ObservableArray<IDish> = observableArray();

    ingredientName: Observable<string | undefined> = observable();
    amount: Observable<number> = observable(0).extend({ numeric: 3 } as any);
    unit: Observable<string | undefined> = observable();

    isFormValid: Computed;
    dishesService: DishesService;

    currentIncredients: ObservableArray<IngredientVm> = observableArray();

    constructor(dishesService: DishesService, appState: Observable<AppState>) {
        super(appState);

        this.dishesService = dishesService;
        this.onPageEnter();

        var dish: IDish
        if (appState().payload !== undefined) {
            dish = appState().payload as IDish;

            if (dish !== undefined) {
                this.dishName(dish.name);
                this.description(dish.description);
                this.id = dish.id;
                //Todo: Ingredient VMs
                this.currentIncredients(dish.ingredients.map(i =>
                    new IngredientVm({
                        id: i.id,
                        name: i.name,
                        amount: i.amount,
                        unit: i.unit,
                    })
                ));
            }
        }

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
                        collection: this.existingDishes().filter(d => d.id !== dish.id),
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
        this.dishesService.update({
            id: this.id,
            name: this.dishName(),
            description: this.description(),
            persons: 1,
            ingredients: this.currentIncredients().map(i => (
                {
                    id: i.id,
                    name: i.name(),
                    amount: i.amount(),
                    unit: i.unit()
                }) as IIngredient)
        });

        this.requestPreviousPage();
    }

    addIngredient = () => {
        const ingredientName = this.ingredientName();
        if (ingredientName != undefined) {
            this.currentIncredients.push(
                new IngredientVm({
                    id: undefined,
                    name: ingredientName,
                    amount: this.amount(),
                    unit: this.unit(),
                }));

            this.ingredientName(undefined);
            this.amount(1.0);
            //this.unit(undefined);
        }
    }

    deleteIngredient = (elem: IngredientVm) => {
        this.currentIncredients.remove(elem);
    }

    editIngredient = (elem: IngredientVm) => {
        elem.isEditing(true);
    }

    stopEditIngredient = (elem: IngredientVm) => {
        elem.isEditing(false);
    }

    handleCancel = () => {
        this.requestPreviousPage();
    }
}

extenders.numeric = function (target: any, precision) {
    //create a writable computed observable to intercept writes to our observable
    var result = pureComputed({
        read: target,  //always return the original observables value
        write: function (newValue) {
            var current = target(),
                roundingMultiplier = Math.pow(10, precision),
                newValueAsNum = isNaN(newValue) ? 1 : +newValue,
                valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

            //only write if it changed
            if (valueToWrite !== current) {
                target(valueToWrite);
            } else {
                //if the rounded value is the same, but a different value was written, force a notification for the current field
                if (newValue !== current) {
                    target.notifySubscribers(valueToWrite);
                }
            }
        }
    }).extend({ notify: 'always' });

    //initialize with current value to make sure it is rounded appropriately
    result(target());

    //return the new computed observable
    return result;
};

export function registerControl() {
    components.register('admineditdishview', { template: require('../views/adminEditDishView.html') });
}

