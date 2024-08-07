const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

// decimal to binary
const decimalToBinary = (input) => {
  let binary = "";

  if (input === 0) {
    binary = "0";
  }

  while (input > 0) {
    binary = (input % 2) + binary;
    input = Math.floor(input / 2);
  }

  result.innerText = binary;
};

const checkUserInput = () => {
  // console.log(numberInput.value)
  if (
    !numberInput.value ||
    isNaN(parseInt(numberInput.value)) ||
    parseInt(numberInput.value) < 0
  ) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  /// I use the parseInt() function to convert the input into a number
  decimalToBinary(parseInt(numberInput.value));
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});


// ------------------------------------------------- //

// decimal to binary first version

// const decimalToBinary = (input) => {
//   /// Use the return keyword to return a string of the binary number representation of true. 1 is true, 0 is false
//   const inputs = [];
//   const quotients = [];
//   const remainders = [];

//   if (input === 0) {
//     result.innerText = "0"
//     return
//   }
// // convert to binary
//   while (input > 0) {
//     const quotient = Math.floor(input / 2);
//     const remainder = input % 2;
//     inputs.push(input);
//     quotients.push(quotient);
//     remainders.push(remainder);
    
//     input = quotient;
//   }
//   console.log("Inputs: ", inputs);
//   console.log("Quotients: ", quotients);
//   console.log("Remainders: ", remainders);

//   result.innerText = remainders.reverse().join("")
// }