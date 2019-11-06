const endpoint =
	"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const $sortByPop = document.querySelector("#sPop");
const $sortByGrowth = document.querySelector("#sGrowth");
let order;

fetch(endpoint)
	.then(responseRAW => responseRAW.json())
	.then(responseJSON => cities.push(...responseJSON));

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
$sortByGrowth.addEventListener("click", displayMatches);
$sortByPop.addEventListener("click", displayMatches);
$sortByPop.addEventListener("click", sortPop);
$sortByGrowth.addEventListener("click", sortGrowth);

function sortGrowth() {
	if (order) {
		cities.sort((a, b) =>
			Number(a.growth_from_2000_to_2013.slice(0, -1)) > Number(b.growth_from_2000_to_2013.slice(0, -1)) ? -1 : 1
		);
		$sortByGrowth.innerHTML = "Growth &#9660";
		$sortByPop.innerHTML = "Population";
		displayMatches;
		order = false;
	} else {
		cities.sort((a, b) =>
			Number(a.growth_from_2000_to_2013.slice(0, -1)) < Number(b.growth_from_2000_to_2013.slice(0, -1)) ? -1 : 1
		);
		$sortByGrowth.innerHTML = "Growth &#9650";
		$sortByPop.innerHTML = "Population";
		displayMatches;
		order = true;
	}
}

function sortPop() {
	if (order) {
		cities.sort((a, b) => (Number(a.population) > Number(b.population) ? -1 : 1));
		$sortByPop.innerHTML = "Population &#9660";
		$sortByGrowth.innerHTML = "Growth";
		displayMatches;
		order = false;
	} else {
		cities.sort((a, b) => (Number(a.population) < Number(b.population) ? -1 : 1));
		$sortByPop.innerHTML = "Population &#9650";
		$sortByGrowth.innerHTML = "Growth";
		displayMatches;
		order = true;
	}
}

function findMatches(wordToMatch, cities) {
	return cities.filter(place => {
		const regex = new RegExp(wordToMatch, "gi");
		return place.city.match(regex) || place.state.match(regex);
	});
}

function numberWitchCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
	const matchArray = findMatches(searchInput.value, cities);
	const html = matchArray
		.map(place => {
			const regex = new RegExp(searchInput.value, "gi");
			const cityName = place.city.replace(regex, `<span class ="hl">${searchInput.value}</span>`);
			const stateName = place.state.replace(regex, `<span class ="hl">${searchInput.value}</span>`);
			return `
			         <li>
			           <span class="name">${cityName}, ${stateName}</span>
			           <span class="population">Pop: ${numberWitchCommas(place.population)}</span>
			         </li>
			       `;
		})
		.join("");
	suggestions.innerHTML = html;
}
