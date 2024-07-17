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

const navbar = new Navbar(pages);

root.append(navbar.html);

Object.values(pages)
  .map(ps => Object.values(ps))
  .forEach(ps => {
    ps.forEach(p => root.append(p));
  });
