const API_KEY = "32069c37";
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    fetchMovies(query);
  } else {
    resultsContainer.innerHTML = "";
  }
});

async function fetchMovies(query) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(
        query
      )}&apikey=${API_KEY}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      resultsContainer.innerHTML = "<p>No results found</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsContainer.innerHTML = "<p>Error loading results</p>";
  }
}

function displayMovies(movies) {
  resultsContainer.innerHTML = movies
    .map(
      (movie) => `
        <div class="movie">
            <img src="${
              movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
            }" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year} - ${movie.Type}</p>
            </div>
        </div>
    `
    )
    .join("");
}
