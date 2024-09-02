const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const results = document.getElementById("results-div");

// alert //
checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const numberRegex = /^[0-9]+$/;
  if (!numberRegex.test(userInput.value)) {
    alert("Please provide a phone number");
  }
  checkNumber(userInput.value);
});
clearBtn.addEventListener("click", () => {
  userInput === "";
});

const checkNumber = (el) => {
  const regexNum = /555/g;
  let message = "";
  regexNum
    ? (message = "Valid US number: " + el)
    : (message = "Invalid US number: " + el);
  console.log(message);
};

// Valid or Not //
const usNumber = [
  {
    num: "1 555-555-5555",
    valid: true,
  },
  {
    num: "1 (555) 555-5555",
    valid: true,
  },
  {
    num: "1(555)555-5555",
    valid: true,
  },
  {
    num: "5555555555",
    valid: true,
  },
  {
    num: "555-555-5555",
    valid: true,
  },
  {
    num: "(555)555-5555",
    valid: true,
  },
  {
    num: "555-5555",
    valid: false,
  },
  {
    num: "5555555",
    valid: false,
  },
  {
    num: "1 555)555-5555",
    valid: false,
  },
  {
    num: "55555555",
    valid: false,
  },
  {
    num: "1 555 555 5555",
    valid: true,
  },
  {
    num: "1 456 789 4444",
    valid: true,
  },
  {
    num: "123**&!!asdf#",
    valid: false,
  },
  {
    num: "55555555",
    valid: false,
  },
];
