const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const results = document.getElementById("results-div");

const checkNumber = (el) => {
  const numberRegex = /[\d() -]+/
  const validNumberRegex = 
  /^(\d{1})?(?:[- ]?\(\d{3}\)[- ]?|[- ]?\d{3})[- ]?\d{3}[- ]?\d{4}$/;
  let message = "";

  // first alert
  if (!numberRegex.test(el)) {
    alert("Please provide a phone number");
  }
  // check phone number
  validNumberRegex.test(el)
    ? (message = "Valid US number: " + el)
    : (message = "Invalid US number: " + el);
  console.log(message);
  showMsg(message)
};

// message //
const showMsg = (msg) => {
  results.classList.remove("hidden");
  results.textContent = msg;
};

// evenment on click //
checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkNumber(userInput.value);
});

clearBtn.addEventListener("click", () => {
  userInput === "";
});
