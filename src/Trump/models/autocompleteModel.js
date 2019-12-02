export default class AutocompleteModel {
    constructor() {
        this.autocomplete = '';
    }

    async getAutocomplete(input){
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        try{
        let autocomplete = `${proxyUrl}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input.value}&establishment&components=country:pl&key=${process.env.API_GM_KEY}`
        const places = await fetch(autocomplete);
        //onsole.log(places.json())
        return await places.json();
        } catch (error) {
        return new Error(`Wild ERROR occured, can't get LocObj. Details: ${error}`);
        }
    }
    async displayAutocomplete(input){
        let places = await this.getAutocomplete(input);
        this.autocomplete =places.predictions;
    }
}
