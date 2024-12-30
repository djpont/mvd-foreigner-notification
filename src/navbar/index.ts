import { TPages } from '@/typing';
import template from './template.html';
import './style.scss';

type TCallbacks = {
  copy: () => void;
  paste: () => void;
};

export class Navbar {
  private readonly _html: HTMLDivElement;
  private readonly _pages: TPages;
  private readonly _buttons: HTMLButtonElement[] = [];

  constructor(pages: TPages, callbacks: TCallbacks) {
    this._html = Object.assign(document.createElement('div'), { className: 'navbar' });
    this._html.innerHTML = template;
    this._pages = pages;

    const arrivalButtons = Array.from(
      this._html.querySelectorAll('.arrival .buttons button'),
    ) as HTMLButtonElement[];
    const departureButtons = Array.from(
      this._html.querySelectorAll('.departure .buttons button'),
    ) as HTMLButtonElement[];

    arrivalButtons.forEach((btn, index) => {
      this._buttons.push(btn);
      btn.addEventListener('click', () => {
        this._buttons.forEach(b => b.classList.remove('active'));
        this.hideAllPages();
        this.showPage(this._pages.arrival[index + 1]);
        btn.classList.add('active');
      });
    });

    departureButtons.forEach((btn, index) => {
      this._buttons.push(btn);
      btn.addEventListener('click', () => {
        this._buttons.forEach(b => b.classList.remove('active'));
        this.hideAllPages();
        this.showPage(this._pages.departure[index + 1]);
        btn.classList.add('active');
      });
    });

    this._html.querySelector('.savedForms .buttons button.copy').addEventListener('click', () => {
      callbacks.copy();
    });
    this._html.querySelector('.savedForms .buttons button.paste').addEventListener('click', () => {
      callbacks.paste();
    });

    // Open first page
    this.showPage(this._pages.arrival[1]);
    arrivalButtons[0].classList.add('active');
  }

  get html() {
    return this._html;
  }

  private showPage = (page: HTMLDivElement) => {
    page.classList.add('show');
  };

  private hideAllPages = () => {
    Object.values(this._pages)
      .map(ps => Object.values(ps))
      .forEach(ps =>
        ps.forEach(p => {
          return p.classList.remove('show');
        }),
      );
  };
}
