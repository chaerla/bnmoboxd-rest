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

  searchFilms = async (option: SearchFilmsOption) => {
    const res = await this.api.get(`/films?search=${option.query}&page=${option.page}&take=${option.take}`);
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
      acc[film.id] = film.title;
      return acc;
    }, {});
  };
}

export default PhpApi;
