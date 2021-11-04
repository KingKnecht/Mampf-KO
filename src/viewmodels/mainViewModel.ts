import { components, computed, Computed, observable, Observable } from 'knockout'
import { AppState, RequestPageType, LogoutAdminType } from 'src/framework/appState';
import { AdminDishesViewModel } from './adminDishesViewModel';
import { AdminLoginViewModel } from './adminLoginViewModel';
import { AdminPlanningViewModel } from './adminPlanningViewModel';
import { BaseViewModel } from './baseViewModel';
import { NavigationViewModel } from './navigationViewModel';
import { OverviewViewModel } from './overviewViewModel';



export class MainViewModel extends BaseViewModel {

    readonly isActive: Observable<boolean> = observable(true);
    readonly navigationViewModel: NavigationViewModel;
    readonly adminLoginViewModel: AdminLoginViewModel;
    readonly isAdminLoginActive: Computed<boolean>;
    readonly overviewViewModel: OverviewViewModel;
    readonly isAdminDishesActive: Computed<boolean>;
    readonly isAdminPlanningActive: Computed<boolean>;
    readonly isOverviewActive: Computed<boolean>;
    readonly adminDishesViewModel: AdminDishesViewModel;
    readonly adminPlanningViewModel: AdminPlanningViewModel;

    constructor(appState: Observable<AppState>,
        navigationViewModel: NavigationViewModel,
        adminLoginViewModel: AdminLoginViewModel,
        overviewViewModel: OverviewViewModel,
        adminDishesViewModel: AdminDishesViewModel,
        adminPlanningViewModel: AdminPlanningViewModel) {

        super(appState);

        this.navigationViewModel = navigationViewModel;
        this.adminLoginViewModel = adminLoginViewModel;
        this.overviewViewModel = overviewViewModel;
        this.adminDishesViewModel = adminDishesViewModel;
        this.adminPlanningViewModel = adminPlanningViewModel;
        
        this.isAdminLoginActive = computed(() => { return this.appState().activePage === 'ADMIN_LOGIN' });
        this.isAdminDishesActive = computed(() => { return this.appState().activePage === 'ADMIN_DISHES' });
        this.isAdminPlanningActive = computed(() => { return this.appState().activePage === 'ADMIN_PLANNING' });
        this.isOverviewActive = computed(() => { return this.appState().activePage === 'OVERVIEW' });

        this.appState.subscribe((state: AppState) => {

            console.log(state);

            switch (state.action.kind) {
                case 'RequestPageType':

                    const pageRequest = state.action as RequestPageType;

                    if (state.activePage != pageRequest.page) {
                        switch (pageRequest.page) {
                            case 'ADMIN_PLANNING':
                            case 'ADMIN_DISHES':
                                if (!state.isAdmin && state.activePage !== "ADMIN_LOGIN") {
                                    this.setActivePage(state, {kind : 'RequestPageType', page: 'ADMIN_LOGIN'});
                                } else if (state.isAdmin) {
                                    this.setActivePage(state, pageRequest);
                                }
                                break;
                            case 'OVERVIEW':
                                this.setActivePage(state, pageRequest);
                                break;
                            case 'ADMIN_ADD_DISH':
                                if (state.isAdmin && state.activePage !== "ADMIN_ADD_DISH") {
                                    this.setActivePage(state, pageRequest);
                                }
                            break;
                            default:
                                throw Error("unknown requested page: " + pageRequest.page)
                        }
                    }
                    break;
                case 'LogoutAdminType':
                    const newState: AppState = {
                        ...state,
                        isAdmin: false,
                        action : {kind: 'RequestPageType', page : 'OVERVIEW'} as RequestPageType
                    }
                    this.appState(newState);
            }

        });
    }

    public toggleMenu = () => {
        console.log('toggle');
        this.isActive(!this.isActive());
    }


    private setActivePage(state: AppState, pageRequest: RequestPageType) {
        const newState: AppState = {
            ...state,
            activePage: pageRequest.page,
        };
        this.appState(newState);
    }
}

export function registerControl() {
    components.register('mainview', { template: require('../views/mainView.html') });
}