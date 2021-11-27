import './tailwind.css'
import { MainViewModel, registerControl as mainRegisterControl } from './viewmodels/mainViewModel';
import { NavigationViewModel, registerControl as navigationRegisterControl } from './viewmodels/navigationViewModel';
import {AdminLoginViewModel, registerControl as adminLoginRegisterControl} from './viewmodels/adminLoginViewModel';
import {OverviewViewModel, registerControl as overviewRegisterControl} from './viewmodels/overviewViewModel';
import { init as kov_init, validateObservable } from 'knockout.validation';
import { applyBindings, observable } from 'knockout';
import { AppState } from "src/framework/appState";
import { AdminDishesViewModel, registerControl as adminDishesRegisterVControl } from './viewmodels/adminDishesViewModel';
import { AdminPlanningViewModel, registerControl as adminPlanningRegisterControl } from './viewmodels/adminPlanningViewModel';
import {AdminAddDishViewModel, registerControl as adminAddDishRegisterControl} from "./viewmodels/adminAddDishViewModel";
import { DishesService } from './framework/DishesService';

async function init(){
    console.log('init()');
    
    mainRegisterControl();
    navigationRegisterControl();
    adminLoginRegisterControl();
    overviewRegisterControl();
    adminDishesRegisterVControl();
    adminPlanningRegisterControl();
    adminAddDishRegisterControl();

    
    kov_init({insertMessages: false});
    
    const mainview = document.createElement('mainview');
    mainview.setAttribute('params', 'vm: $data');
    mainview.setAttribute('class', 'min-h-full grid');
    const root = document.getElementById("root");
    root?.appendChild(mainview);

    
    const initalAppState : AppState = {
        username : undefined,
        isAdmin : true,
        activePage : "OVERVIEW",
        action :  {kind : 'RequestPageType', page : 'OVERVIEW'},
        previousPage : "OVERVIEW"
    }

    // const initalAppState : AppState = {
    //     username : undefined,
    //     isAdmin : true,
    //     activePage : "ADMIN_DISHES",
    //     action :  {kind : 'RequestPageType', page : 'ADMIN_DISHES'},
    //     previousPage : "OVERVIEW"
    // }

    const appStateObservable = observable(initalAppState)
    const dishService = new DishesService();
    const adminLoginViewModel = new AdminLoginViewModel(appStateObservable);
    const navigationViewModel = new NavigationViewModel(appStateObservable);
    const overviewViewModel = new OverviewViewModel(appStateObservable);
    const adminAddDishViewModel = new AdminAddDishViewModel(appStateObservable,dishService);

    const adminDishesViewModel = new AdminDishesViewModel(appStateObservable,dishService);
    const adminPlanningViewModel = new AdminPlanningViewModel(appStateObservable);
    const mainViewModel = new MainViewModel(appStateObservable,
         navigationViewModel,
         adminLoginViewModel,
         overviewViewModel,
         adminDishesViewModel,
         adminPlanningViewModel,
         adminAddDishViewModel);
    
    applyBindings(mainViewModel, root);
}

document.addEventListener("DOMContentLoaded", init);
