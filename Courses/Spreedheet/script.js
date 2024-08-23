//* Function to generate a range of numbers.

// Your array will need to be the size of the range. You can calculate this by finding the difference between end and start, and adding 1 to the result.
const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);


window.onload = () => {
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label"
    label.textContent = name;
    container.appendChild(label);
  };
};

