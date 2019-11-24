import MainContentView from '../views/mainContentView';
import SearchModel from '../models/searchModel';

export default class SearchCtrl {
    constructor(){
        /*
        this.el = {
            // startId: document.querySelector("#startingAddress"),
            startValue: null,
            // metaId: document.querySelector("#destination"),
            metaValue: null,
        } 
        */
        this.view = new MainContentView();
        this.model = new SearchModel();
    }

    handleClickOnSearch(){
        this.model.start = document.querySelector("#startingAddress").value;
        this.model.meta = document.querySelector("#destination").value;
        this.view.init(this.model.start, this.model.meta);
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