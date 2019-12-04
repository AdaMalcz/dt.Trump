export default class QuoteModel {
  constructor() {
    this.quote = '';
  }

  async getRandomQuote() {
    const rawRandomQuote = await fetch("https://api.whatdoestrumpthink.com/api/v1/quotes/random");
    const randomQuote = await rawRandomQuote.json();
    //console.log(randomQuote.message);
    this.quote = randomQuote.message;
  }
}

