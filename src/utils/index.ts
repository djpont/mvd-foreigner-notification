export const makeInputViewAsSquares = (element: HTMLInputElement) => {
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
