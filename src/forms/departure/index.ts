import template from './template.html';
import './style.scss';

const form = Object.assign(document.createElement('div'), { className: 'form departure show' });
form.innerHTML = template;

const makeInputViewAsSquares = (element: HTMLInputElement) => {
  const length = element.maxLength;
  // const input = document.createElement('input');
  // input.maxLength = length;

  const charsWrapper = document.createElement('div');
  charsWrapper.className = 'charsWrapper';

  for (let i = 1; i <= length; i++) {
    const charBox = document.createElement('div');
    charBox.className = 'charBox';
    charsWrapper.append(charBox);
  }

  element.replaceWith(charsWrapper);
};

form.querySelectorAll('input').forEach(element => {
  makeInputViewAsSquares(element);
});

export { form };
