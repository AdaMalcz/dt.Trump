import MainContentView from '../views/mainContentView';
import SearchModel from '../models/searchModel';


export default class SearchCtrl {
    constructor(par){
        this.view = new MainContentView();
        this.model = new SearchModel();
        this.trumpCtrl = par;
    }

    handleClickOnSearch(){
        this.model.start = this.view.el.startingAddress.value;
        this.model.meta = this.view.el.destination.value;
        this.model.date = this.view.el.date.value;
        this.model.time = this.view.el.time.value;
        if ((typeof this.model.start === "string" && this.model.start && this.model.meta)) {
            this.view.el.mainContainer.style.display = "initial";
            this.view.init(this.model.start, this.model.meta);
            this.trumpCtrl.renderSomething()
            document.querySelector("#map").style.height="400px"; // ustawiania wysokości mapy
        }
        else {
            if (!this.model.start)
                this.view.el.startingAddress.classList.add('red');
            if (!this.model.meta)   
                this.view.el.destination.classList.add('red');
        }
    }

    handleClickOnLocation(){
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(async (position) => {
                this.model.coors = [position.coords.latitude, position.coords.longitude];
                //this.view.el.startingAddress.value = `${position.coords.latitude}, ${position.coords.longitude}`
                await this.model.displayAdress(this.model.coors);
                this.model.start = this.model.address;
                this.view.el.startingAddress.value = this.model.address;
        })
        else{
            window.alert('Geolocation is not supported by your browser')
        }
    }

    //Tutaj będą wywoływane inne eventy
    _setListeners(){
        document.querySelector("#searchButton").addEventListener("click", ev => {
            ev.preventDefault();
            this.handleClickOnSearch();
            this.view.el.mainContainer.scrollIntoView();
        });
        document.querySelector("#location").addEventListener("click", () => {
            this.handleClickOnLocation();
        });
    }

    init(){
        this._setListeners();
    }
}