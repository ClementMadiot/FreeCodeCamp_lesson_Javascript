// url
const forumLatest =
  "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

// get elements
const postsContainer = document.getElementById("posts-container");

const timeAgo = (time) => {
  const currentTime = new Date(); // current date and time
  const lastPost = new Date(time); // date of the last activity on the topic

  let minutes = Math.floor((currentTime - lastPost) / 60000); // difference in minutes
  let hours = Math.floor((currentTime - lastPost) / 3600000); // difference in hours
  let days = Math.floor((currentTime - lastPost) / 86400000); // difference in days
  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
};

const fetchData = async () => {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    // console.log(data)
    showLatestPosts(data);
  } catch (err) {
    console.log(err);
  }
};
fetchData();

// display post
const showLatestPosts = (data) => {
  const {
    topic_list: { topics },
    users,
  } = data;
  // const {topics} = topic_list
  postsContainer.innerHTML = topics
    .map((item) => {
      const {
        id,
        title,
        views,
        posts_count,
        slug,
        posters,
        category_id,
        bumped_at,
      } = item;
      return html`
        <tr>
          <td>
            <p class="post-title">${title}</p>
          </td>
          <td></td>
          <td>${posts_count - 1}</td>
          <td>${views}</td>
          <td>${timeAgo(bumped_at)}</td>
        </tr>
      `;
    })
    .join("");
};
