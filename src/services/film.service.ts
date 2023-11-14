import PhpApi, { SearchFilmsOption } from '@/clients/php-api';
import redis from '@utils/redis';

class FilmService {
  private cacheKey = 'films';
  constructor(private readonly phpApi: PhpApi) {}

  getFilms = async (options: SearchFilmsOption) => {
    const cacheKey = `${this.cacheKey}:${JSON.stringify(options)}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const films = await this.phpApi.searchFilms(options);
    await redis.setex(cacheKey, 3600, JSON.stringify(films));

    return films;
  };
}

export default FilmService;
