import {components, observable, Observable} from 'knockout'



export class MainViewModel {
    
    public readonly isActive : Observable<boolean> = observable(true);


    constructor() {

    }

    public toggleMenu = () => {
        console.log('toggle');
        this.isActive(!this.isActive());
    }

}

export function registerControl() {
    components.register('mainview', { template: require('../views/mainView.html') });
}