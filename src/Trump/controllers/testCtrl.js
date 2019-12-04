import TestView from '../views/testView';
import TestModel from '../models/testModel';

export default class TestCtrl {
  constructor() {
    this.view = new TestView();
    this.model = new TestModel();
  }

  renderSomething() {
    this.view.render(
      // podajemy w jakim elemencie chcemy coś wyrenderować
      this.view.el.mainContainer,
      // i tutaj wpisujemy co chcemy wyrenderować - nasz markup
      this.view.getTestMarkup(this.model.getData()) // przekazujemy pobrane dane (pobieramy fetchem w modelu)
    );
  };

  init() {
    this.renderSomething();
  }
}