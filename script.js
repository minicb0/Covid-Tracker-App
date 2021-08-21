// declaring variables
var searchBtn = document.getElementById('searchBtn');
var search = document.getElementById('search');
var countryContainer = document.getElementById('countryContainer')
var countryWrapper = document.getElementsByClassName('countryWrapper')

// event listener to search button
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fetchCountry(search.value);
})

async function fetchCountry(countryName) {
    try {
        var countryURL = `https://api.covid19api.com/total/dayone/country/${countryName}`
        let responseCountry = await fetch(countryURL);
        let countryData = await responseCountry.json();
        // console.log(countryData)
        var todayOrder = countryData.length - 1

        var element = `
            <div class="countryWrapper">
            <div class="contentDiv">
                <ul>
                    <li>
                        <i class="fas fa-flag"></i>
                        <strong>Country: </strong> ${countryData[todayOrder].Country}
                    </li>
                    <li>
                        <i class="fas fa-virus"></i>
                        <strong>Confirmed Cases: </strong> ${countryData[todayOrder].Confirmed}
                    </li>
                    <li>
                        <i class="fas fa-book-dead"></i>
                        <strong>Deaths: </strong> ${countryData[todayOrder].Deaths}
                    </li>
                    <li>
                        <i class="fas fa-shield-virus"></i>
                        <strong>Active Cases: </strong> ${countryData[todayOrder].Active}
                    </li>
                </ul>
            </div>
            </div>`

        countryContainer.insertAdjacentHTML('beforeend', element)
        countryContainer.removeChild(countryContainer.firstElementChild);
    } catch (err) {
        countryWrapper[0].innerHTML = "Sorry! We are unable to grab this country data from our API. Kindly search some other country."
    }
}
