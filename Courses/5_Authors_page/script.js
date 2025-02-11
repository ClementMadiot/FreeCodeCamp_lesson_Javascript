// One common aspect of web development is learning how to fetch data from an external API, then work with asynchronous JavaScript.

// This freeCodeCamp authors page project show me how to use the **fetch method**, then **dynamically update the DOM** to display the fetched data.

// This project also teach me how to **paginate my data** so me can load results in batches.

const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");

let startingIndex = 0;
let endingIndex = 8;

let authorDataArr = [];

fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex))
  })
  .catch((err) => 
    // console.error(`There was an error: ${err}`)
  authorContainer.innerHTML = `<p class="error-msg">There was an error loading the authors</p>`

);

const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `
<div id=${index} class="user-card">
<h2 class="author-name">${author}</h2>
<img class="user-img" src=${image} alt="${author} avatar" />
<div class="purple-divider"></div>
<p class="bio">${bio.length > 50 ? bio.slice(0,50) + ("...") : bio}</p>
<a class="author-link" href=${url} target="_blank">${author}'s author page</a>
</div>
`;
  });
};

// Load more author's card
const fetchMoreAuthors = () => {
  startingIndex += 8;
  endingIndex += 8;
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  if(authorDataArr.length <= endingIndex){
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'No more data to load';
    loadMoreBtn.style.cursor = 'not-allowed';
  }
}

loadMoreBtn.addEventListener('click',fetchMoreAuthors);
