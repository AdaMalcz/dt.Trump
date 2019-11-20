import MainView from "./mainView";

export default class TestView extends MainView {
  constructor() {
    super();
  }

  getTestMarkup(fetchedObj) {
    return `
            <h1>${fetchedObj.title}</h1>
            <br>
            <p>${fetchedObj.text}</p>
        `;
  }
}