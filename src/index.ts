import './tailwind.css'
import { MainViewModel, registerControl as mainRegisterControl } from './viewmodels/mainViewModel';
import { applyBindings } from 'knockout';


async function init(){
    console.log('init()');
    
    mainRegisterControl();

    const mainview = document.createElement('mainview');
    mainview.setAttribute('params', 'vm: $data');
    const root = document.getElementById("root");
    root?.appendChild(mainview);
    const mainViewModel = new MainViewModel();
    applyBindings(mainViewModel, root);
}

document.addEventListener("DOMContentLoaded", init);