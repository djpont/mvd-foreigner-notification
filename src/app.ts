import { TPages } from '@/typing';
import { Navbar } from './navbar';
import arrivalPages from '@/forms/arrival';
import departurePages from '@/forms/departure';
import './style.scss';

const root = document.getElementById('root');

const pages: TPages = {
  arrival: arrivalPages,
  departure: departurePages,
};

const navbarCallbacks = {
  copy: async () => {
    console.log('copy');
    const object: Record<number, string> = {};
    for (let i = 0; i < 9999; i++) {
      const v = localStorage.getItem(i.toString());
      if (v && v.trim()) {
        object[i] = v.trim();
      }
    }

    const jsonValue = '```' + JSON.stringify(object) + '```';

    try {
      await navigator.clipboard.writeText(jsonValue);
    } catch (error) {
      alert('ОШИБКА при копировании в буфер обмена: ' + error);
    }
  },

  paste: async () => {
    console.log('paste');
    try {
      const a = await navigator.clipboard.readText();
      const object: Record<number, string> = JSON.parse(a.replace(/^`+|`+$/g, ''));
      localStorage.clear();
      Object.keys(object).forEach((key: string) => {
        localStorage.setItem(key, object[+key]);
      });
      location.reload();
    } catch (error) {
      alert('ОШИБКА при чтении из буфера обмена: ' + error);
    }
  },
};

const navbar = new Navbar(pages, navbarCallbacks);

root.append(navbar.html);

Object.values(pages)
  .map(ps => Object.values(ps))
  .forEach(ps => {
    ps.forEach(p => root.append(p));
  });
