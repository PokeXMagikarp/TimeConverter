
const timeSlider = document.getElementById('time-slider');
const sliderTimeDisplay = document.getElementById('slider-time');
const sliderStateDisplay = document.getElementById('slider-state');
const baseCountrySelect = document.getElementById('base-country');
const convertedTimesDiv = document.getElementById('converted-times');
const newCountrySelect = document.getElementById('new-country');

let countries = [
    { name: 'New York (EST)', timezone: 'America/New_York' },
    { name: 'London (GMT)', timezone: 'Europe/London' },
    { name: 'Tokyo (JST)', timezone: 'Asia/Tokyo' },
    { name: 'Sydney (AEST)', timezone: 'Australia/Sydney' }
];

function updateTimeDisplay() {
    const minutes = parseInt(timeSlider.value, 10);
    const baseTimezone = baseCountrySelect.value;

    const baseDate = new Date();
    baseDate.setUTCHours(0, minutes, 0, 0);
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: baseTimezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const [time, period] = formatter.format(baseDate).split(' ');
    sliderTimeDisplay.textContent = time;
    sliderStateDisplay.textContent = period;

    convertTime(baseDate);
}

function convertTime(baseDate) {
    const baseTimezone = baseCountrySelect.value;

    const convertedTimes = countries.map(country => {
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: country.timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            const convertedTime = formatter.format(baseDate);
            return `<p>${country.name}: ${convertedTime}</p>`;
        } catch {
            return `<p>${country.name}: Invalid Timezone</p>`;
        }
    }).join('');

    convertedTimesDiv.innerHTML = convertedTimes;
}

function updateBaseCountry() {
    const minutes = parseInt(timeSlider.value, 10);
    const baseTimezone = baseCountrySelect.value;

    const utcDate = new Date(Date.UTC(1970, 0, 1, 0, minutes));
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: baseTimezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const [time, period] = formatter.format(utcDate).split(' ');
    sliderTimeDisplay.textContent = time;
    sliderStateDisplay.textContent = period;

    updateTimeDisplay();
}

function addCountry() {
    const newCountryValue = newCountrySelect.value;
    const newCountryName = newCountrySelect.options[newCountrySelect.selectedIndex].text;
    countries.push({ name: newCountryName, timezone: newCountryValue });
    alert(`${newCountryName} has been added.`);
    updateTimeDisplay();
}

timeSlider.addEventListener('input', updateTimeDisplay);

// Initialize the display
updateTimeDisplay();


