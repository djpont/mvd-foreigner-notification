const wrappers: HTMLDivElement[] = [];
const inputs: HTMLInputElement[] = [];

const squaring = (length: number, text: string = '') => {
  const charBoxes: HTMLDivElement[] = [];
  for (let i = 1; i <= length; i++) {
    const charBox = <HTMLDivElement>document.createElement('div');
    charBox.className = 'charBox';
    charBox.innerText = text.charAt(i - 1);
    charBoxes.push(charBox);
  }
  return charBoxes;
};

const save = () => {
  for (let i = 0; i < wrappers.length; i++) {
    const wrapper = wrappers[i];
    const input = inputs[i];
    const index = wrappers.indexOf(wrapper);
    if (wrapper.children[wrapper.children.length - 1] === input || input.type === 'checkbox') {
      const text = input.type === 'checkbox' ? (input.checked ? '✓' : ' ') : input.value;
      const charBoxes = squaring(input.maxLength, text);
      wrapper.replaceChildren(...charBoxes);
      localStorage.setItem(index.toString(), text);
    }
  }
};

const squaresClick = (e: PointerEvent) => {
  save();
  e.preventDefault();
  e.stopPropagation();
  const target = <HTMLDivElement>e.currentTarget;
  const index = wrappers.indexOf(target);
  const input = inputs[index];

  if (input.type === 'checkbox') {
    input.checked = !input.checked;
    save();
    return;
  }

  target.append(input);
  input.focus();

  const enterKeyPressed = (e: KeyboardEvent) => {
    if (e.code === 'Enter') save();
  };

  input.addEventListener('keypress', enterKeyPressed);
  document.addEventListener('click', save);
};

export const makeInputViewAsSquares = (element: HTMLInputElement) => {
  const length = element.maxLength;
  const type = element.type;
  const input = document.createElement('input');
  input.maxLength = length;
  input.type = type;

  const charsWrapper = document.createElement('div');
  charsWrapper.className = 'charsWrapper';
  charsWrapper.addEventListener('click', squaresClick);

  wrappers.push(charsWrapper);
  inputs.push(input);

  const index = inputs.indexOf(input);
  const value = localStorage.getItem(index.toString());
  input.value = value;
  if (value === '✓') input.checked = true;

  const charBoxes = squaring(length, value || '');

  charsWrapper.append(...charBoxes);

  element.replaceWith(charsWrapper);
};
