// Regular expressions, often shortened to "regex" or "regexp", are patterns that help programmers match, search, and replace text. Regular expressions are powerful, but can be difficult to understand because they use so many special characters.

// In this spam filter project, I learn about capture groups, **positive lookaheads**, **negative lookaheads**, and other techniques to match any text I want.

const messageInput = document.getElementById('message-input');
const result = document.getElementById('result');
const checkMessageButton = document.getElementById('check-message-btn');

// Regex = regular expression 
const helpRegex = /please help|assist me/i;
const dollarRegex = /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i;
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
const dearRegex = /(?:\s|^)d[e3][a@4]r fr[i1|][e3]nd(?:\s|$)/i;

//Regex list
const denyList = [helpRegex, dollarRegex, freeRegex, dearRegex];
// Regex to test if a string matches the pattern.
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));
//Evenement on cLick
checkMessageButton.addEventListener('click', () => {
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }

  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  messageInput.value = "";
});
