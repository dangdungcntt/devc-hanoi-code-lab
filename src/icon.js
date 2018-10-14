const ROOT_URL = "https://staticv2-4.rottentomatoes.com/static/images";

function url(type) {
	return `${ROOT_URL}/icons/${type}`; 
}

const icons = {
	      certified: url("CF_16x16.png"),
	      fresh: url("fresh-16.png"),
	      upright: url("popcorn-16.png"),
	      rotten: url("splat-16.png"),
	      spilled: url("badpopcorn-16.png"),
	      wts: url("wts-16.png")
}

export default {
	getUrl(type) {
		return icons[type]; 
	}
}