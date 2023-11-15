import { PHP_BASE_URL } from '@config';
import axios, { type AxiosInstance } from 'axios';

export interface SearchFilmsOption {
  query?: string;
  page?: number;
  take?: number;
  filmIds?: number[];
}
class PhpApi {
  private BASE_URL = PHP_BASE_URL;
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: this.BASE_URL,
    });
  }

  searchFilms = async (options: SearchFilmsOption) => {
    const res = await this.api.get(`/films?search=${options.query}&page=${options.page}&take=${options.take}`);
    return res.data.films.map(film => {
      return {
        id: film.id,
        title: film.title,
      };
    });
  };

  searchFilmTitlesById = async (option: SearchFilmsOption) => {
    const res = await this.api.get(`/films?&filmIds=${option.filmIds.join(',')}`);
    return res.data.films.reduce((acc, film) => {
      acc[film.id] = {
        title: film.title,
        imagePath: film.image_path,
      };
      return acc;
    }, {});
  };
}

export default PhpApi;
