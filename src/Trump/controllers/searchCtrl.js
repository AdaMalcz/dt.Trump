import MainContentView from '../views/mainContentView';
import SearchModel from '../models/searchModel';
import MapCtrl from './mapCtrl'


export default class SearchCtrl {
    constructor(par) {
        this.view = new MainContentView();
        this.model = new SearchModel();
        this.map = new MapCtrl();
        this.trumpCtrl = par;
    }

    async handleClickOnSearch() {
        this.model.start = this.view.el.startingAddress.value;
        this.model.meta = this.view.el.destination.value;
        this.model.date = this.view.el.date.value;
        this.model.time = this.view.el.time.value;
        // jeśli this.model.arrival_departure = true, wtedy this.model.date & time to dodzina wyjazdu, jeśli false - chodzi o godzinę przyjazdu
        this.model.arrival_departure = this.view.el.arrival_departure.checked;
        if ((typeof this.model.start === "string" && this.model.start && this.model.meta)) {
            this.view.el.mainContainer.style.display = "block";
            this.view.init(this.model.start, this.model.meta);
            // this.model.getCoors(this.model.meta);
            this.model.getCoors(this.model.meta);
            // await this.map.route();
            // console.log(resp.distance.value)
            this.trumpCtrl.renderSomething()
            document.querySelector("#map").style.height = "400px"; // ustawiania wysokości mapy
        }
        else {
            if (!this.model.start)
                this.view.el.startingAddress.classList.add('red');
            if (!this.model.meta)
                this.view.el.destination.classList.add('red');
        }
    }


    handleClickOnLocation(){
        this.model.geolocation = this.view.el.geolocation;
        if (this.model.geolocation.classList.contains('fa-dot-circle')){
            this.model.geolocation.classList.remove('fa-dot-circle');
            this.model.geolocation.classList.add('fa-times-circle');
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(async (position) => {
                this.model.coors = [position.coords.latitude, position.coords.longitude];
                await this.model.displayAddress(this.model.coors);
                this.model.start = this.model.address;
                this.view.el.startingAddress.value = this.model.address;
            })}
            else{
                window.alert('Geolocation is not supported by your browser')
            }
        }
        else {
            this.model.geolocation.classList.add('fa-dot-circle');
            this.model.geolocation.classList.remove('fa-times-circle');
            this.view.el.startingAddress.value = "";
        }
        
    }

    //Tutaj będą wywoływane inne eventy

    _setListeners() {
        this.view.el.searchBtn.addEventListener("click", ev => {

            ev.preventDefault();
            this.handleClickOnSearch();
            this.view.el.mainContainer.scrollIntoView();
        });
        this.view.el.geolocation.addEventListener("click", () => {
            this.handleClickOnLocation();
        });
    }

    init() {
        this._setListeners();
    }
}