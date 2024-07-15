import { navbar } from './navbar';
import { form as arrivalForm } from './forms/arrival';
import { form as departureForm } from './forms/departure';
import './style.scss';

const root = document.getElementById('root');

const pages = { arrival: arrivalForm, departure: departureForm };

const closeAllPages = () => Object.values(pages).forEach(page => page.classList.remove('show'));

const openArrival = () => {
  console.log('openArrival');
  closeAllPages();
  pages.arrival.classList.add('show');
};

const openDeparture = () => {
  console.log('openDeparture');
  closeAllPages();
  pages.departure.classList.add('show');
};

navbar.setCallbacks({ arrival: openArrival, departure: openDeparture });

root.append(navbar.html, arrivalForm, departureForm);
