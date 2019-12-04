import QuoteView from '../views/quoteView';
import QuoteModel from '../models/quoteModel';


export default class QuoteCtrl {
  constructor() {
      this.view = new QuoteView();
      this.model = new QuoteModel();
  }

}