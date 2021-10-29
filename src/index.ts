import './tailwind.css'
import { MainViewModel, registerControl as mainRegisterControl } from './viewmodels/mainViewModel';
import { NavigationViewModel, registerControl as navigationRegisterControl } from './viewmodels/navigationViewModel';
import {AdminLoginViewModel, registerControl as adminLoginRegisterControl} from './viewmodels/adminLoginViewModel';
import {OverviewViewModel, registerControl as overviewRegisterControl} from './viewmodels/overviewViewModel';

import { applyBindings, observable } from 'knockout';
import { AppState } from "src/framework/appState";
import { AdminDishesViewModel, registerControl as adminDishesRegisterVControl } from './viewmodels/adminDishesViewModel';
import { AdminPlanningViewModel, registerControl as adminPlanningRegisterControl } from './viewmodels/adminPlanningViewModel';

async function init(){
    console.log('init()');
    
    mainRegisterControl();
    navigationRegisterControl();
    adminLoginRegisterControl();
    overviewRegisterControl();
    adminDishesRegisterVControl();
    adminPlanningRegisterControl();

    const mainview = document.createElement('mainview');
    mainview.setAttribute('params', 'vm: $data');
    const root = document.getElementById("root");
    root?.appendChild(mainview);

    
    const initalAppState : AppState = {
        username : undefined,
        isAdmin : false,
        activePage : "OVERVIEW",
        requestedPage : "OVERVIEW",
        lastPage : "OVERVIEW"
    }

    const appStateObservable = observable(initalAppState)
    const adminLoginViewModel = new AdminLoginViewModel(appStateObservable);
    const navigationViewModel = new NavigationViewModel(appStateObservable);
    const overviewViewModel = new OverviewViewModel(appStateObservable);
    const adminDishesViewModel = new AdminDishesViewModel(appStateObservable);
    const adminPlanningViewModel = new AdminPlanningViewModel(appStateObservable);
    const mainViewModel = new MainViewModel(appStateObservable,
         navigationViewModel,
         adminLoginViewModel,
         overviewViewModel,
         adminDishesViewModel,
         adminPlanningViewModel);
     
    applyBindings(mainViewModel, root);
}

document.addEventListener("DOMContentLoaded", init);
