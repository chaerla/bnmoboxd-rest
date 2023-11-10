import PhpApi, { SearchFilmsOption } from '@/adapters/php-api';

class FilmService {
  constructor(private readonly phpApi: PhpApi) {}

  getFilms = async (options: SearchFilmsOption) => {
    return await this.phpApi.searchFilms(options);
  };
}

export default FilmService;
