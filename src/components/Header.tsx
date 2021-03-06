import { useAppContext } from '../contexts/GenreContext';

import '../styles/header.scss';

export function Header() {
  const { selectedGenre } = useAppContext();
  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
}
