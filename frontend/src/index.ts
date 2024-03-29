import './tailwind.css'
import { MainViewModel, registerControl as mainRegisterControl } from './viewmodels/mainViewModel';
import { NavigationViewModel, registerControl as navigationRegisterControl } from './viewmodels/navigationViewModel';
import { AdminLoginViewModel, registerControl as adminLoginRegisterControl } from './viewmodels/adminLoginViewModel';
import { OverviewViewModel, registerControl as overviewRegisterControl } from './viewmodels/overviewViewModel';
import { init as kov_init } from 'knockout.validation';
import { applyBindings, observable } from 'knockout';
import { AppState } from "src/framework/appState";
import { AdminDishesViewModel, registerControl as adminDishesRegisterVControl } from './viewmodels/adminDishesViewModel';
import { AdminPlanningViewModel, registerControl as adminPlanningRegisterControl } from './viewmodels/adminPlanningViewModel';
import { registerControl as adminPlanningDayRegisterControl } from './viewmodels/adminPlanningDayViewModel';
import { AdminAddDishViewModel, registerControl as adminAddDishRegisterControl } from "./viewmodels/adminAddDishViewModel";
import { AdminEditDishViewModel, registerControl as adminEditDishRegisterControl } from "./viewmodels/adminEditDishViewModel";
import { DishesService } from './framework/DishesService';
import { AuthService } from './framework/authService';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './framework/tokenBearer';

async function init() {

    console.log('init()');

    axios.defaults.baseURL = 'http://localhost:3000/v1/' ;
    axios.interceptors.request.use((config : AxiosRequestConfig)=> {
        if(config.headers != null)
            config.headers['Authorization'] = `Bearer ${getToken()}`;
        
            return config;
    });

    mainRegisterControl();
    navigationRegisterControl();
    adminLoginRegisterControl();
    overviewRegisterControl();
    adminDishesRegisterVControl();
    adminPlanningRegisterControl();
    adminPlanningDayRegisterControl();
    adminAddDishRegisterControl();
    adminEditDishRegisterControl();


    kov_init({ insertMessages: false });

    const mainview = document.createElement('mainview');
    mainview.setAttribute('params', 'vm: $data');
    mainview.setAttribute('class', 'min-h-full grid');
    const root = document.getElementById("root");
    root?.appendChild(mainview);


    const initalAppState: AppState = {
        username: undefined,
        isAdmin: true,
        activePage: "OVERVIEW",
        action: { kind: 'RequestPageType', page: 'OVERVIEW' },
        previousPage: "OVERVIEW",
        payload: undefined
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
    const authService = new AuthService();
    const adminLoginViewModel = new AdminLoginViewModel(appStateObservable, authService);
    const navigationViewModel = new NavigationViewModel(appStateObservable);
    const overviewViewModel = new OverviewViewModel(appStateObservable);
    const adminAddDishViewModel = new AdminAddDishViewModel(appStateObservable, dishService);
    const adminEditDishViewModel = new AdminEditDishViewModel(appStateObservable, dishService);
    const adminDishesViewModel = new AdminDishesViewModel(appStateObservable, dishService);
    const adminPlanningViewModel = new AdminPlanningViewModel(appStateObservable, dishService);

    const mainViewModel = new MainViewModel(appStateObservable,
        navigationViewModel,
        adminLoginViewModel,
        overviewViewModel,
        adminDishesViewModel,
        adminPlanningViewModel,
        adminAddDishViewModel,
        adminEditDishViewModel);

    applyBindings(mainViewModel, root);
}

document.addEventListener("DOMContentLoaded", init);
