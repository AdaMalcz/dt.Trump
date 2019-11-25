import MainContentView from '../views/mainContentView';
import SearchModel from '../models/searchModel';

export default class SearchCtrl {
    constructor(par){
        this.el = {
            // startId: document.querySelector("#startingAddress"),
            startValue: null,
            // metaId: document.querySelector("#destination"),
            metaValue: null,
        } 
        this.view = new MainContentView();
        this.model = new SearchModel();
        this.trumpCtrl = par;
    }

    handleClickOnSearch(){
        this.model.start = document.querySelector("#startingAddress").value;
        this.model.meta = document.querySelector("#destination").value;
        if ((typeof this.model.start === "string" && this.model.start && this.model.meta)) {
            this.view.init(this.model.start, this.model.meta);
            this.trumpCtrl.renderSomething()
            document.querySelector("#map").style.height="400px"; // ustawiania wysokości mapy
        }
        else if (!this.model.start) {
        }
        else if (!this.model.meta) {
        }  
    }

    handleClickOnLocation(){
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition((position) => {
                this.view.el.startingAddress.value = `${position.coords.latitude}, ${position.coords.longitude}`
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