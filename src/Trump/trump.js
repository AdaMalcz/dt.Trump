import TrumpCtrl from './controllers/trumpCtrl';
import trumpModel from './models/trumpModel';
import trumpView from './views/trumpView';

// w tym pliku będziemy inicjalizować aplikację
export default class Trump {
    constructor() {
        this._trumpCtrl = new TrumpCtrl(trumpView, trumpModel);
    }
/*
    init() {
        this._gameCtrl.init();
    }
*/
}
