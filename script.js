const ApiKey = `67ff23580a84450cadb02746795f26b8`;
const blogcontainer = document.getElementById("blog-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

function displayblogs(articles) {
  blogcontainer.innerHTML = "";
  if (!articles || articles.length === 0) {
    console.error("No articles found");
    return;
  }
  articles.forEach((article) => {
    const blogcard = document.createElement("div");
    blogcard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.urlToImage || 'default-image-url.jpg'; // Fallback image
    img.alt = article.title;

    const title = document.createElement("h2");
    const trunctitle = article.title.length > 30 ? 
       article.title.slice(0, 30) + "..." : article.title;
    title.textContent = trunctitle;

    const description = document.createElement("p");
    const truncdesc = article.description && article.description.length > 45 ? 
       article.description.slice(0, 45) + "...Read More" : article.description || '';
    description.textContent = truncdesc;

    blogcard.appendChild(img);
    blogcard.appendChild(title);
    blogcard.appendChild(description);
    blogcard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogcontainer.appendChild(blogcard);
  });
}

async function fetchNews() {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${ApiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
}

searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchequery(query);
      displayblogs(articles);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
});

async function fetchequery(query) {
  try {
    const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=18&apiKey=${ApiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
}

(async () => {
  try {
    const articles = await fetchNews();
    displayblogs(articles);
  } catch (error) {
    console.error("Error: ", error);
  }
})();
