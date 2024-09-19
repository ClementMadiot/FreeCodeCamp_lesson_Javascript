// dynamic elements
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const displayChangeDue = document.getElementById("change-due");
const priceTotal = document.getElementById("price-total");
const containerInfo = document.getElementById("container-info");


let price = 3.26; // price of the item,
let cid = [
  // cash-in-drawer
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

// format
const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    (item) => (displayChangeDue.innerHTML += `<p>${item[0]}: ${item[1]}</p>`)
  );
  return;
};

//check cash
const checkCash = () => {
  // if the customer has enough money to purchase the item
  if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return;
  }
  // if the customer has enough money to purchase the item
  if (Number(cash.value) === price) {
    displayChangeDue.innerHTML = "No change due - customer paid with exact cash";
    cash.value = "";
    return;
  }

  let changeDue = Number(cash.value) - price;
  let reversedCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: "OPEN", change: [] };
  let totalCid = parseFloat(
    cid
      .map((total) => total[1])
      .reduce((acc, curr) => acc + curr)
      .toFixed(2)
  );
  // check if the cash-in-drawer is less than the change due
  if (totalCid < changeDue) {
    result.status = "CLOSED";
  }

  if (totalCid === changeDue) {
    result.status = "CLOSED";
  }
  // loop through the cash-in-drawer
  for (let i = 0; i < reversedCid.length; i++) {
    if (changeDue >= denominations[i] && changeDue > 0) {
      let amount = 0;
      while (reversedCid[i][1] > 0 && changeDue >= denominations[i]) {
        reversedCid[i][1] -= denominations[i];
        changeDue = parseFloat((changeDue - denominations[i]).toFixed(2));
        amount++;
      }
      if (amount > 0) {
        result.change.push([reversedCid[i][0], amount * denominations[i]]);
      }
    }
  }

  if (changeDue > 0) {
    return displayChangeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
  }

  formatResults(result.status, result.change);
  updateUI(result.change);
};

const checkResult = () => {
  if (!cash.value) {
    return;
  }
  checkCash();
};

const updateUI = (change) => {
  const currencyName = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "One Hundreds",
  };
// Update cid array
  if(change) {
    change.forEach(arr => {
      const targetArr = cid.find(cidArr => cidArr[0] === arr[0]);
      targetArr[1] = parseFloat((targetArr[1] - arr[1]).toFixed(2));
    });
  }

  cash.value = ''
  priceTotal.innerHTML = `Total: $${price}`;
  containerInfo.innerHTML = `<h2>Change in drawer:</h2>
  ${cid.map((arr, index) => {
    return `<p key=${index}>${currencyName[arr[0]]}: $${arr[1]}</p>`;
  }
).join('')} 
  `
}

// addEventListener
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkCash();
  }
});
purchaseBtn.addEventListener("click", checkCash);

updateUI();