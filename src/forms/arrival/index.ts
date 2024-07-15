import template from './template.html';
import './style.scss';

const form = Object.assign(document.createElement('div'), { className: 'form arrival' });
form.innerHTML = template;

export { form };
