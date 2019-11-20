export default class TrumpCtrl {
  constructor(TrumpView, TrumpModel) {
    this._trumpModel = new TrumpModel();
    this._trumpView = new TrumpView();
  }
}