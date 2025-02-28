//returns usd exchange rate for all other currencies
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// appending options to selects in dropdowns
for (let select of dropdowns) {
  for (currencyCodeKey in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currencyCodeKey;
    newOption.innerText = currencyCodeKey;
    if (select.name === "from" && currencyCodeKey === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCodeKey === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    //evt.target: kahan par change aaya hai
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue == 0 || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`; //this will return the exchange rate of the currency for all other currencies
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; // exchange rate of fromCurr to toCurr
  let finalAmount = amountValue * rate;
  msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

window.addEventListener("load", () => {
  updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // default behaviour of form will be prevented now});
  updateExchangeRate();
});
