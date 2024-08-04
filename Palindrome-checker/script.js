const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

const checkForPalindrome = (input) => {
  // Store for later output
  const originalInput = input;

  // alert if input is empty
  if (input === "") {
    alert("Please input a value");
    // answer.textContent = "";
    return;
  }
  // remove the previous result
  result.replaceChildren();

  const lowerCaseStr = input.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
  let resultMsg = `<strong>${originalInput}</strong> ${
    lowerCaseStr === [...lowerCaseStr].reverse().join("") ? "is" : "is not"
  } a palindrome`;

  // Create paragraph to show result
  const pUser = document.createElement("p");
  pUser.className = "user-input";
  pUser.innerHTML = resultMsg;
  result.appendChild(pUser);

  // console.log(resultMsg)
};

checkBtn.addEventListener('click', () => {
  checkForPalindrome(textInput.value);
  textInput.value = '';
});

textInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkForPalindrome(textInput.value);
    textInput.value = '';
  }
  });

