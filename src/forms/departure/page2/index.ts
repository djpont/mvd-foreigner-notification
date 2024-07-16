import { makeInputViewAsSquares } from '@/utils';
import template from './template.html';

const page = <HTMLDivElement>(
  Object.assign(document.createElement('div'), { className: 'form departure page2 ' })
);
page.innerHTML = template;

page.querySelectorAll('input').forEach(element => {
  makeInputViewAsSquares(element);
});

export { page };
