import template from './template.html';
import './style.scss';

const html = Object.assign(document.createElement('div'), { className: 'navbar' });
html.innerHTML = template;

const callbacks = {
  arrival: () => {},
  departure: () => {},
};

const setCallbacks = ({ arrival, departure }: { arrival: () => void; departure: () => void }) => {
  callbacks.arrival = arrival;
  callbacks.departure = departure;
};

const buttonArrival = <HTMLButtonElement>html.querySelector('button.arrival');
const buttonDeparture = <HTMLButtonElement>html.querySelector('button.departure');

const clickButton = (button: HTMLButtonElement, callback: () => void) => {
  [buttonArrival, buttonDeparture].forEach(btn => btn.classList.remove('active'));
  callback();
  button.classList.add('active');
};

buttonArrival.addEventListener('click', () => {
  clickButton(buttonArrival, callbacks.arrival);
});
buttonDeparture.addEventListener('click', () => {
  clickButton(buttonDeparture, callbacks.departure);
});

export const navbar = { html, setCallbacks };
