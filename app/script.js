'use strict';
import  '../node_modules/leaflet/dist/leaflet.js';

const overview = document.querySelector('.overview');

const searchBar = document.querySelector('.app__result-search-bar')
const resultSearchBar = document.querySelector('.result-search-bar__wrapper');

const countryContainer = document.querySelector('.countries__container');

const countryDetails = document.querySelector('.country__details');

const searchBarForm = document.querySelector('.app__search-bar');
const searchBarInput = document.querySelector('.search-bar__input');

const filterValue = document.querySelector('.wrapper__filter-select-value');
const filterSelect = document.querySelector('.filter__select');
const filterIcon = document.querySelector('.filter__icon');

const darkModeIwcon = document.querySelector('.header__icon');
const dakrmodeBtn = document.querySelector('.header__mode');
const darkmodeText = document.querySelector('.header__mode--text');

const formatNumber = (nmb) => new Intl.NumberFormat('en-US').format(nmb);

const getDataCountries = async function(){
	const randomNumber = () => Math.trunc(Math.random() * 248);

	try {
		const res = await	fetch('https://restcountries.com/v2/all');

		if (!res.ok) throw new Error(
			`Cannot get the countries data, please try later [${res.status}] `
		);

		const data = await res.json();
		// this little piece down here create a array of 8 randoms countries
		const randomArray = Array.from({ length : 8 }, () => data[randomNumber()]);

		console.log(randomArray);
		
		countryContainer.innerHTML = "";
		renderCountry(...randomArray);
		
		searchBarInput.addEventListener('input', () => handleSearchBar(data));
		documentEvent(data);
		
	} catch(err) {
		countryContainer.innerHTML = "";

		renderErrors(err);		
		console.error(`Something went wrong, ${err.message}`);
	}
}
getDataCountries();

const getLightMode = () => {
	if (!lightMode) return '';

	return 'light-mode--elements';
};

const renderCountry = function(...arr) {
	countryContainer.innerHTML= '';
	
	arr.forEach(country => {
		
		const HTML = `
			<div class="country drop-shadow-bottom ${getLightMode()}" data-country="${country.name}">
				<img class="country__flag" src="${country.flag}" alt="">
				<div class="country__wrapper">

				<div class="country__wrapper__titles">
					<h2 class="country__name text-max-length">${country.name}</h2>
					<span class="country__name--secondary">${country.name}</span>
				</div>

				<div class="country__overview__wrapper">
					<div class="country__population--wrapper country__overview">
						<span class="country__population bold">🧑‍🤝‍🧑Population:</span>
						<span class="country__population--name">${
							formatNumber(country.population)
						}</span>
					</div>
					<div class="country__region--wrapper country__overview">
						<span class="country__region bold">🗺️ Region:</span>
						<span class="country__region--name">${country.region}</span>
					</div>
					<div class="country__capital--wrapper country__overview">
						<span class="country__capital bold">📌 Capital:</span>
						<span class="country__capital--name">${
							!country.capital ? "Doesn't has any" : country.capital
						}</span>
					</div>
				</div>

				</div>
			</div>
		`
		countryContainer.insertAdjacentHTML('beforeend', HTML);
	})
}

const renderCountryDetails = function(country) {
	const firstLetterUpper = str => {
		return	str.slice(0, 1).toUpperCase() + str.slice(1)
	};
	
	const HTML = `
			<div class="container__details">

			<div class="country__details__back--btn style--button ${
				getLightMode()
			}">
				<div class="country__details__btn__wrapper">

					<span class="country__details__back-icon">
						<svg class="svg--icon " xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="rgb(235,235,235)">
							<path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
						</svg>
					</span>

					<span class="country__details__back">Back</span>
				</div>
			
			</div>
			<div class="country__details--flex">

				<!-- <div class="container__flag--details"> -->
					<img class="country__details__flag" src="${country.flag}" alt="">
				
				<div class="country__details__container">
					<div class="wrapper__titles">
						<h2 class="country__details__title text-max-length">${country.name}</h2>
						<span class="country__details__title--secondary">${country.name}</span>
					</div>
					<div class="wrapper__section--flex">

						<section class="country__details__section-one">
							<div class="country__details__nativename--wrapper country__details__wrapper">
								<span class="country__details__nativename bold">Native Name:</span>
								<span class="country__details__nativename--value country__details--name">${
									country.nativeName
								}</span>
							</div>
							<div class="country__details__population--wrapper country__details__wrapper">
								<span class="country__details__population bold">Population:</span>
								<span class="country__details__population--value country__details--name">${
									country.population === 0 ? 
										'uninhabited' : formatNumber(country.population)
									
								}</span>
							</div>
							<div class="country__details__region--wrapper country__details__wrapper">
								<span class="country__details__region bold">Region:</span>
								<span class="country__details__region--value country__details--name">${
									country.region
								}</span>
							</div>
							<div class="country__details__subregion--wrapper country__details__wrapper">
								<span class="country__details__subregion bold">Sub Region:</span>
								<span class="country__details__subregion--value country__details--name">${
									country.subregion
								}</span>
							</div>
							<div class="country__details__capital--wrapper country__details__wrapper">
								<span class="country__details__capital bold">Capital:</span>
								<span class="country__details__capital--value country__details--name text-max-length">${
									!country.capital ? "Doesn't has any" : country.capital
								}</span>
							</div>
						</section>
						
						<section class="country__details__section-two">
							<div class="country__details__domain--wrapper country__details__wrapper">
								<span class="country__details__domain bold">Top Level Domain:</span>
								<span class="country__details__domain--value country__details--name">${
									country.topLevelDomain[0]
								}</span>
							</div>
							<div class="country__details__currencies--wrapper country__details__wrapper">
								<span class="country__details__currencies bold">Currencies:</span>
								<span class="country__details__currencies--value country__details--name">${
									!country.currencies ? "Doesn't has any" : country.currencies[0].name
								}</span>
							</div>
							<div class="country__details__languages--wrapper country__details__wrapper">
								<span class="country__details__languages bold">Languages:</span>
								<span class="country__details__languages--value country__details--name">${
									firstLetterUpper(country.languages[0].nativeName)
								}
								(${
									firstLetterUpper(country.languages[0].name)
								})</span>
							</div>
						</section>

					</div>
					<div class="country__details__container--border">
						<p class="country__details__border-title">Border Countries:</p>
						<div class="country__details__wrapper__border-countries"></div>
					</div>
					<div class="container__map"><div id="map"></div></div>
				</div>
			</div>
		</div>
	`;

	countryDetails.insertAdjacentHTML('beforeend', HTML);

}

const getBorderCountry = async function(country) {
	try {

		if (!country.borders) return (
			document.querySelector('.country__details__border-title')
				.textContent += ' Any'
		);

		const bordersArr = country.borders;

		const getJSON = async function(url) {
			const res = await fetch(url);

			if (!res.ok) throw new Error(
				`Cannot get the borders countries please retry later.`
			);
			return await res.json();
		};
		
		let data;
		// this logic down here allow me to do mutiple call at the same time
		// was not required, but i wanna do like that for optimization

		if (bordersArr.length === 1) data = await getJSON(
			`https://restcountries.com/v2/alpha/${bordersArr[0]}`
		);
	
		if (bordersArr.length === 2) data = await Promise.all([
			getJSON(`https://restcountries.com/v2/alpha/${bordersArr[0]}`),
			getJSON(`https://restcountries.com/v2/alpha/${bordersArr[1]}`)
		]);
	
		if (bordersArr.length >= 3) data = await Promise.all([
			getJSON(`https://restcountries.com/v2/alpha/${bordersArr[0]}`),
			getJSON(`https://restcountries.com/v2/alpha/${bordersArr[1]}`),
			getJSON(`https://restcountries.com/v2/alpha/${bordersArr[2]}`)
		]);

		renderBordersCountry(data);

	} catch(err) {
		console.error(err.message);
		renderErrors(err);
		document
			.querySelector('.country__details__wrapper__border-countries')
			.innerHTML = '';
	}
}

const displaySkelettonBorders = function(length = 0) {
	// if a country doesn't have any borders countries
	if(!length || length === 0) return;

	const containerCountryBorders =
	 document.querySelector('.country__details__wrapper__border-countries');

	// the logic down here is not the best but it do the job...🙂

	if(length === 1){
		const HTML = `
			<span class="country__details__border style--button skeletton__borders">
			</span>
		`;

		containerCountryBorders.insertAdjacentHTML('beforeend', HTML)
	}

	if(length === 2){
		const HTML = `
			<span class="country__details__border style--button skeletton__borders">
			</span>
			<span class="country__details__border style--button skeletton__borders">
			</span>
		`;

		containerCountryBorders.insertAdjacentHTML('beforeend', HTML)
	}

	if(length >= 3){
		const HTML = `
			<span class="country__details__border style--button skeletton__borders">
			</span>
			<span class="country__details__border style--button skeletton__borders">
			</span>
			<span class="country__details__border style--button skeletton__borders">
			</span>
		`;

		containerCountryBorders.insertAdjacentHTML('beforeend', HTML)
	}
}

const renderBordersCountry = async function(...bdrsCountry) {
	const containerCountryBorders = 
		document.querySelector('.country__details__wrapper__border-countries');

	containerCountryBorders.innerHTML = '';	
	bdrsCountry.flat().forEach(bdrCountry => {
		const HTML = `
			<span class="country__details__border style--button ${getLightMode()}">${
				bdrCountry.name
			}</span>
		`;
		containerCountryBorders.insertAdjacentHTML('beforeend', HTML);
	})
}

const renderCountryBorder = function(e, data) {
	if(!e.target.closest('.country__details__border')) return;

		console.log(e.target, e.target.textContent)

		const borderCountryToRender = data.find(country => {
			return country.name === e.target.textContent
		})
		countryDetails.innerHTML = '';
		window.scroll(0, 0);
		renderCountryDetails(borderCountryToRender);
		renderMap(borderCountryToRender);
		displaySkelettonBorders(borderCountryToRender?.borders?.length);
		getBorderCountry(borderCountryToRender);
}

const handleSearchBar = function(data) {
	const valueInpt = searchBarInput.value.toLowerCase().trim();

	// return true if no country find
	const noMatchFound = data.every(country => {
		return valueInpt !== country.name.toLowerCase().slice(0, valueInpt.length)
	})

	if (!valueInpt) return searchBar.classList.remove('display-result-search-bar');

	searchBar.classList.add('display-result-search-bar');
	resultSearchBar.innerHTML = '';

	// search for the country and display it
	data.forEach(country => {
		if (valueInpt === country.name.toLowerCase().slice(0, valueInpt.length)) {
		
			const HTML = `
				<div class="result-search-bar--country ${getLightMode()}" data-country="${
					country.name
				}">
					<div class="result__wrapper__country d-flex">
						<img class="result__country__flag" src="${country.flag}" alt="">
						<p class="result__country__name">${country.name}</p>
					</div>
				</div>
			`
			resultSearchBar.insertAdjacentHTML('beforeend', HTML);
		} 
	});

	if (noMatchFound) return resultSearchBar.textContent = 'No match found !';
} 

const renderMap = function(country) {
	const map = L.map('map').setView(...[country.latlng], 1.5);
	const apiKey = '3d00aaca7f36466faeaf0f124a253778'

	L.tileLayer(`
		https://maps.geoapify.com/v1/tile/toner-grey/{z}/{x}/{y}.png?apiKey=${apiKey}`, 
	{
		attribution: 
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	L.marker(...[country.latlng]).addTo(map)
    .bindPopup(`${country.name}`)
    .openPopup();
}
let initialCoords;
const openCountryDetails = async function(e, data) {
	
	// idk why this guard clause work with '&&' and not with '||' 🤷‍♂️; 
	if(
		!e.target.closest('.result-search-bar--country') &&
		!e.target.closest('.country') 
		)return;
		
	// get the scroll bar position when you click on a country
	// to scroll to this position when you click on the 'back' button
	initialCoords = document.body.getBoundingClientRect();
	countryDetails.innerHTML = '';
	countryDetails.style.display = 'inline';
	
	const countryToRender = data.find(country => { 

		// get the country to render in the overview
		if (e.target.closest('.result-search-bar--country')) return (
			country.name === e.target.closest('.result-search-bar--country')
				.getAttribute('data-country')
		);

		// get the country to render in the searchbar
		if (e.target.closest('.country')) return (
			country.name === e.target.closest('.country').getAttribute('data-country')
		);
	
	});
	
	overview.style.display = 'none';
	renderCountryDetails(countryToRender);
	renderMap(countryToRender);

	displaySkelettonBorders(countryToRender?.borders?.length);

	window.scroll(0, 0);
	
	await getBorderCountry(countryToRender);
}

const closeCountryDetails = function(e) {

	if (!e.target.closest('.country__details__back--btn')) return;

	const containerDetails = document.querySelector('.container__details');

	containerDetails.style.animation = '150ms ease forwards hiddenCountryDetails';
	
	containerDetails.addEventListener('animationend', () => {
		containerDetails.innerHTML = ''
		overview.style.display = 'inline';
		overview.style.opacity = 0;
		overview.style.animation = '200ms ease forwards displayOverview';
		window.scroll({
			top : Math.abs(initialCoords.top),
			left : 0,
			behavior : 'auto'
		});
	})
	// overview.style.animation =''
}

const handleCountryDetails = function(e, data) {
	//all of the functions gonna be executed here. But inside 
	//all of functions there is a guard close who prevent code to be executed 
	// if i don't need the function.

	openCountryDetails(e, data);
	
	closeCountryDetails(e);
}

const renderErrors = function(err) {

	const HTML = `
		<div class="error">

			<div class="wrapper-left">
				<svg class="error__icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#f5f5f5" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>

			<p class="error__message">${err.message}</p>
		</div>
	`
	document.body.insertAdjacentHTML('beforeend', HTML)
	const error = document.querySelector('.error')

	setTimeout(() => {
		error.style.animation = '500ms ease forwards errorHidden';
		error.addEventListener('animationend', () => error.remove());
	}, 3500)
}

let lightMode;
const switchColorMode = function(){

	const country = document.querySelectorAll('.country');

	!document.body.classList.contains('light-mode') ? 
		lightMode = true : lightMode = false;

	document.body.classList.toggle('light-mode');

	// HEADER
	document.querySelector('.app__header').classList.toggle('light-mode');
	darkModeIcon.classList.toggle('light-mode--icon')
	
	// SEARCH-BAR
	searchBarForm.classList.toggle('light-mode--elements');
	document.querySelector('.app__result-search-bar')
		.classList.toggle('light-mode--elements');
	searchBarInput.style.color = "hsl(0, 0%, 52%)";
	document.querySelector('.search-bar--svg')
	.classList.toggle('light-mode--icon--search-bar');

	// FILTER
	document.querySelector('.wrapper__filter-default')
		.classList.toggle('light-mode--elements');
	document.querySelectorAll('.wrapper__filter-select-value').forEach(el => {
		el.classList.toggle('light-mode');
	});	

	// COUNTRY
	country.forEach(el => el.classList.toggle('light-mode--elements'))

	document.querySelectorAll('.svg--icon').forEach(el => {
		el.classList.toggle('light-mode--icon')
	});

	document.querySelectorAll('.style--button').forEach(el => {
		el.classList.toggle('light-mode--elements')
	});
	
	if (lightMode)  darkmodeText.textContent = 'Light mode';
	else darkmodeText.textContent = 'Dark mode';

	localStorage.setItem('colorMode', JSON.stringify(lightMode));
}

const colorModeLocaleStorage = () => {
	if (JSON.parse(localStorage.getItem('colorMode'))) switchColorMode();
}

colorModeLocaleStorage();

const searchBarCloseClickOutside = function(e){

	// if the user click outside of the searchbar close it
	if( 
		searchBar.classList.contains('display-result-search-bar') &&
		!e.target.closest('.app__search-bar')
	){
		searchBarInput.value = '';
		searchBar.classList.remove('display-result-search-bar');
	}
}

const filter = function(e, data){
	const filterClasslists = function(option) {
		if (option === 'add') return (
			filterIcon.classList.add('filter-icon-transform'),
			filterValue.classList.add('filter--hidden') 
		);
	
		if (option === 'remove') return (
			filterIcon.classList.remove('filter-icon-transform'),
			filterValue.classList.remove('filter--hidden') 
		);
	
		if (option === 'toggle') return (
			filterIcon.classList.toggle('filter-icon-transform'),
			filterValue.classList.toggle('filter--hidden') 
		);
	}

	if (!e.target.closest('#app__filter')) return filterClasslists('add');
			
	filterClasslists('toggle');
	if (!e.target.classList.contains('filter-value')) return;
	
	filterSelect.textContent = e.target.textContent;
	
	const dataByRegion = data.filter(country => {
		return country.region === filterSelect.textContent
	})
	renderCountry(...dataByRegion);
}

const documentEvent = function(data) {
	// a function who handle click on certain element in all the document
	document.addEventListener('click', (e) => {
		handleCountryDetails(e, data);
		searchBarCloseClickOutside(e);
		filter(e, data);

		renderCountryBorder(e, data)
		
		if (e.target.classList.contains('header__title')) return location.reload();
	});
}

searchBarForm.addEventListener('submit', e => e.preventDefault());

dakrmodeBtn.addEventListener('click', switchColorMode);
