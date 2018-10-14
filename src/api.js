const CORS = `https://cors-anywhere.herokuapp.com`;

async function responseAsDOM(response) {
	const text = await response.text();
	const parser = new DOMParser();
    return parser.parseFromString(text, "text/html");
}

async function getPage(path) {
	let response = await fetch(`${CORS}/https://www.rottentomatoes.com/${path}`);
	return responseAsDOM(response);
}

export default {

	async fetchMovies() {
	  const document = await getPage("browse/in-theaters");
	  for (const script of document.querySelectorAll("script")) {
	    if (script.innerText.includes("loadPage")) {
	      const movieListMatch = script.innerText.match(/^\s+(\[\{.*\}\]),$/m);
	      if (movieListMatch) return JSON.parse(movieListMatch[1]);
	    }
	  }
	  throw new Error("Failed to fetch movies");
	}
}