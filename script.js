'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

navigator.geolocation.getCurrentPosition(
    function(position){
        const {latitude, longitude} = position.coords;
        const coords = [latitude, longitude];

        map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker(coords).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

        //Handling clicks on map
        map.on('click', function(mapE){
            mapEvent = mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
        });
        
    },
    function(){ 
        alert('Could not get your position! 😞')
    }
);

//CLEAR INPUT FIELDS
function cleanInputFields(){
     inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
}

//After insert data, when press "Enter", put marker and popup on de map
form.addEventListener('submit', function(e){
    e.preventDefault();
    //console.log(mapEvent);
    const pointCoords = [mapEvent.latlng.lat, mapEvent.latlng.lng];

    L.marker(pointCoords).addTo(map)
    .bindPopup(
        L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup'
        })
    )
    .setPopupContent('Workout!')
    .openPopup();

    cleanInputFields();
});


inputType.addEventListener('change', (e) => {
    // if(e.target.value==='running'){
    //     inputElevation.closest('div.form__row').classList.add('form__row--hidden');
    //     inputCadence.closest('div.form__row').classList.remove('form__row--hidden');
    // } 
    // else if(e.target.value==='cycling') {
    //     inputCadence.closest('div.form__row').classList.add('form__row--hidden');
    //     inputElevation.closest('div.form__row').classList.remove('form__row--hidden');
    // }
    inputElevation.closest('div.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('div.form__row').classList.toggle('form__row--hidden');
});


