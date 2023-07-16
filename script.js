const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
// hide loading
const hideLoading = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const newQuote = () => {
  loading();
  const one = Math.random() * apiQuotes.length;
  const quote = apiQuotes[Math.floor(Math.random() * one)];
  // check if author is null
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // check quote length for style
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoading();
};

// get quotes from api
const getQuotes = async () => {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
};
// tweet quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

//  on load
getQuotes();
// loading();
