const CORS = `https://cors-anywhere.herokuapp.com`;

async function responseAsDOM(response) {
	const text = await response.text();
	const parser = new DOMParser();
    return parser.parseFromString(text, "text/html");
}

async function readBodyAndDecode(response) {
  const buffer = await response.arrayBuffer();

  const decoder = new TextDecoder("iso-8859-1");
  return decoder.decode(buffer);
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
	},

	async fetchMovie(id) {
  		const response = await fetch(
		    `https://www.rottentomatoes.com/api/private/v1.0/movies/${id}.json`
		);
		const text = await readBodyAndDecode(response);

    	return JSON.parse(text);
	}
}