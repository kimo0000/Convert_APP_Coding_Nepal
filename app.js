const amount = document.querySelector(".amount input"),
  allSelect = document.querySelectorAll("select"),
  fromCurrency = document.querySelector(".from_exchange select"),
  toCurrency = document.querySelector(".to_exchange select"),
  resultEl = document.querySelector(".result"),
  iconChange = document.querySelector(".change_icon"),
  btnExchange = document.querySelector("button");

// console.log(amout, fromCurrency, toCurrency, resultEl, btnExchange);

const apiKey = "3b52f787ed2e43e1b7c1a101";

for (let i = 0; i < allSelect.length; i++) {
  for (let code in country_list) {
    let selected;
    if (i == 0) {
      selected = code === "USD" ? "selected" : "";
    }

    if (i == 1) {
      selected = code === "TND" ? "selected" : "";
    }

    let optionTag = `<option value="${code}" ${selected}>${code}</option>`;
    allSelect[i].innerHTML += optionTag;
    // allSelect[i].insertAdjacentHTML("afterbegin", optionTag);
  }

  allSelect[i].addEventListener("change", ({ target }) => {
    changeFlag(target);
  });
}

function changeFlag(el) {
  let imgTag = el.parentElement.querySelector("img");
  for (let code in country_list) {
    if (code === el.value) {
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}

function getExhange() {
  let amountValue = amount.value;
  if (amountValue == "" || amountValue == "0") {
    amountValue = 1;
    amount.value = 1;
  }

  let URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  resultEl.innerText = "download Change...";
  fetch(URL)
    .then((res) => res.json())
    .then((result) => {
      // console.log(result);
      let amountExchange = result.conversion_rates[toCurrency.value];
      let totalExchange = (amountValue * amountExchange).toFixed(2);
      resultEl.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchange} ${toCurrency.value}`;
    });
}

btnExchange.addEventListener("click", (e) => {
  e.preventDefault();
  getExhange();
});

iconChange.addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [
    toCurrency.value,
    fromCurrency.value,
  ];
  getExhange();
  changeFlag(fromCurrency);
  changeFlag(toCurrency);
});
