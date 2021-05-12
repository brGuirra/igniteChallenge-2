import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import { api } from '../services/api';

interface AppContextProps {
  genres: GenreResponseProps[];
  selectedGenre: GenreResponseProps;
  selectedGenreId: number;
  movies: MovieProps[];
  setSelectedGenreId: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export const AppContext = createContext({} as AppContextProps);

interface GenreContextProviderProps {
  children: ReactNode;
}

export function GenreContextProvider({ children }: GenreContextProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
      console.log(response);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <AppContext.Provider
      value={{
        genres,
        selectedGenre,
        selectedGenreId,
        movies,
        setSelectedGenreId,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
