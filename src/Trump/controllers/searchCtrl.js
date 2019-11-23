import MainContentView from '../views/mainContentView';

export default class SearchCtrl {
    constructor(){
        this.el = {
            // startId: document.querySelector("#startingAddress"),
            startValue: null,
            // metaId: document.querySelector("#destination"),
            metaValue: null,
        }
        this.view = new MainContentView();
    }

    handleClickOnSearch(){
        this.el.start = document.querySelector("#startingAddress").value;
        this.el.meta = document.querySelector("#destination").value;
        this.view.init(this.el.start, this.el.meta);
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