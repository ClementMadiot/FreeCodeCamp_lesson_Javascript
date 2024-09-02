const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const decimalToRoman = (num) => {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let result = "";

  for (let i = 0; i < romanNumerals.length; i++) {
    // Décompose l'élément courant du tableau en deux valeurs
    const [roman, value] = romanNumerals[i];
    console.log(roman, value)
    while (num >= value) {
      // Ajoute le chiffre romain roman à la chaîne de caractères
      result += roman;
      //  Soustrait la valeur décimale 'value' du chiffre romain courant de la valeur 'num'.
      num -= value;
    }
  }
  return result;
};

const outputText = (input) => {
  resetMsg();
  // console.log(input);
  if (input === "") {
    alertMsg("Please enter a valid number");
  } else if (input <= 0) {
    alertMsg("Please enter a number greater than or equal to 1");
  } else if (input >= 4000) {
    alertMsg("Please enter a number less than or equal to 3999");
  } else {
    showMsg(decimalToRoman(input))
    console.log(decimalToRoman(input))
  } 
    
};

// evenment on click
convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  outputText(number.value);
});

// Message
const resetMsg = () => {
  output.classList.add("hidden");
  output.classList.remove("alert");
};
const alertMsg = (msg) => {
  output.classList.remove("hidden");
  output.classList.add("alert");
  output.textContent = msg;
};

const showMsg = (msg) => {
  output.classList.remove("hidden");
  output.textContent = msg;
};