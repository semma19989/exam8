'use strict'

class Country{
    constructor(name,capital,flagImageURL,currencies,region) {
        this.name = name;
        this.capital = capital;
        this.flagImageURL = flagImageURL;
        this.currencies = currencies;
        this.region = region;
    }
}

function createCountry(country) {
    let elem = document.createElement(`div`);
    elem.innerHTML = `
    <br>
    <h1>${country.name}</h1>
    <p>Capital: ${country.capital}</p>
    <img class="d-block w-100 img" src="${country.flagImageURL}" alt="Flag image">
    <p>Region: ${country.region}</p>
    <p>Currencies: ${country.currencies}</p>
    <a href="https://www.google.com/search?q=${country.name}"  target="_blank">More</a>
    <br>`;
    let att = document.createAttribute("class");
    att.value = "card my-3";
    elem.setAttributeNode(att);
    return elem;
}

function addCountry(elem) {
    document.getElementById("countries").insertBefore(elem,document.getElementById("countries").firstChild);
}

async function getCountry(event) {
    event.preventDefault();
    const countryForm = document.getElementById("form");
    let data = new FormData(countryForm);
    let input = data.get("country");
    const response = await fetch('https://restcountries.eu/rest/v2/name/'+input);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let countryJson = await response.json();
        for (let i=0; i<countryJson.length; i++){
            let country = new Country(countryJson[i].name,countryJson[i].capital,countryJson[i].flag,
                countryJson[i].currencies[0].name, countryJson[i].region);
            let elem = createCountry(country);
            addCountry(elem);
        }
        countryForm.reset();
        document.getElementById("myInput").focus();
    } else {
        countryForm.reset();
        alert("Country not found, try again");
        document.getElementById("myInput").focus();
    }
}
window.addEventListener("load",function f(){
    document.getElementById("form").addEventListener("submit", getCountry);
})