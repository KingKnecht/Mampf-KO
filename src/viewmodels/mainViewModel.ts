import { components, computed, Computed, observable, Observable } from 'knockout'
import { AppState } from 'src/framework/appState';
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

    constructor(appState: Observable<AppState>,
        navigationViewModel: NavigationViewModel,
        adminLoginViewModel: AdminLoginViewModel,
        overviewViewModel: OverviewViewModel,
        adminDishesViewModel : AdminDishesViewModel,
        adminPlanningViewModel: AdminPlanningViewModel) {
        
            super(appState);

        this.navigationViewModel = navigationViewModel;
        this.adminLoginViewModel = adminLoginViewModel;
        this.overviewViewModel = overviewViewModel;
        this.isAdminLoginActive = computed(() => { return this.appState().activePage === 'ADMIN_LOGIN' });

        this.appState.subscribe((state: AppState) => {
            if (state.activePage != state.requestedPage) {
                switch (state.requestedPage) {
                    case 'ADMIN_PLANNING':
                    case 'ADMIN_DISHES':
                        if (!state.isAdmin && state.activePage !== "ADMIN_LOGIN") {
                            const newState: AppState = {
                                ...state,
                                activePage: "ADMIN_LOGIN",
                            }
                            this.appState(newState);
                        } else if (state.isAdmin) {
                            const newState: AppState = {
                                ...state,
                                activePage: state.requestedPage,
                            }
                            this.appState(newState);
                        }
                        break;
                    case 'OVERVIEW':
                        const newState: AppState = {
                            ...state,
                            activePage: state.requestedPage,
                        }
                        this.appState(newState);
                        break;
                    default:
                        throw Error("unknown requested page: " + state.requestedPage)
                }
            }
        });
    }

    public toggleMenu = () => {
        console.log('toggle');
        this.isActive(!this.isActive());
    }

}

export function registerControl() {
    components.register('mainview', { template: require('../views/mainView.html') });
}