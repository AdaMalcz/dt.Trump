import MainView from "./mainView";

export default class QuoteView extends MainView{
  constructor() {
    super();
  }

  init(quote) {
    this._createElement(this.el.journeyTitle, 'h3', 'Cytat Donalda Trumpa na dziś:', '', 'quote');
    this._createElement(this.el.journeyTitle, 'p', quote, 'random_quote', 'quote');
  }

}