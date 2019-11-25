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
        this.el.start = document.querySelector("#startingAddress").value;
        this.el.meta = document.querySelector("#destination").value;
        if ((typeof this.el.start === "string" && this.el.start && this.el.meta)) {
            this.view.init(this.el.start, this.el.meta);
            this.trumpCtrl.renderSomething()
            document.querySelector("#map").style.height="400px"; // ustawiania wysokości mapy
        }
    }

    //Tutaj będą wywoływane inne eventy
    _setListeners(){
        document.querySelector("#searchButton").addEventListener("click", ev => {
            ev.preventDefault();
            this.handleClickOnSearch();
            this.view.el.mainContainer.scrollIntoView();
        });
    }

    init(){
        this._setListeners();
    }
}