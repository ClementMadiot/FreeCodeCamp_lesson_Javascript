const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const results = document.getElementById("results-div");

const checkNumber = (el) => {
  const numberRegex = /[\d() -]+/
  const validNumberRegex = 
  /^(1)?(?:[- ]?\(\d{3}\)[- ]?|[- ]?\d{3})[- ]?\d{3}[- ]?\d{4}$/;
  let message = "";

  // first alert
  if (!numberRegex.test(el)) {
    alert("Please provide a phone number");
  }
  // check phone number
  validNumberRegex.test(el)
    ? message = "Valid US number: " + el
    : message = "Invalid US number: " + el
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

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  results.classList.add("hidden");
  results.textContent = '';
  userInput.value = ""
});


// problem
// 2 (757) 622-7382 "Invalid US number: 2 (757) 622-7382".

//  0 (757) 622-7382 "Invalid US number: 0 (757) 622-7382".

// 2 757 622-7382 "Invalid US number: 2 757 622-7382".

// 27576227382 "Invalid US number: 27576227382".

// 2(757)6227382 "Invalid US number: 2(757)6227382".

// 2(757)622-7382 "Invalid US number: 2(757)622-7382".