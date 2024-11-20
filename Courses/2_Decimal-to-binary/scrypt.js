// I build a decimal-to-binary converter using JavaScript. I learn the fundamental concepts of **recursion**, explore the **call stack**, and build out a visual representation of the **recursion process** through an animation.

const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// inputVal: value of the input each time your recursive function runs.
// marginTop: top margin for DOM elements add to the page.
// addElDelay: delay between adding DOM elements to the page.
// animationData is a stack
const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  },
];

// decimal to binary
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    // String function convert a value into a string
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const showAnimation = () => {
  result.innerText = "Call Stack Animation";
  animationData.forEach(obj => {
    // add paragraph 
    setTimeout(() => {
      animationContainer.innerHTML += `<p id="${obj.inputVal}" style="margin-top:${obj.marginTop}px" class="animation-frame">decimalToBinary(${obj.inputVal})</p>`;  
    }, obj.addElDelay);
    // add msg
    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg
    },obj.showMsgDelay )
    // remove msg
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove()
    },obj.removeElDelay )
    // show binary result
    setTimeout(() => {
  result.innerText = decimalToBinary(5);
    },20000)
  });
};

const checkUserInput = () => {
  // console.log(numberInput.value)

  const inputInt = parseInt(numberInput.value);
  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }
  // convert the string into a number before comparing it to 5
  if (inputInt === 5) {
    showAnimation();
    return;
  }

  /// I use the parseInt() function to convert the input into a number
  result.textContent = decimalToBinary(inputInt);
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
// ------------------------------------------------- //

// decimal to binary second version

/// function that will count down from a given number to zero using recursion.
// const countDownAndUp = (number) => {
//   console.log(number)
///the if is a base case to stop the loop when number is equal to 0
//   if (number === 0) {
//     return;
//   } else {
//     countDownAndUp(number - 1);
//   }

// }
// decimal to binary
// const decimalToBinary = (input) => {
//   let binary = "";

//   if (input === 0) {
//     binary = "0";
//   }

//   while (input > 0) {
//     binary = (input % 2) + binary;
//     input = Math.floor(input / 2);
//   }

//   result.innerText = binary;
// };
