import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { Comment } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { FollowsEntity } from '../profile/follows.entity';

// `slug` is ESM-only from v6+, which Jest's CommonJS module registry can't
// load via dynamic import() without extra transform config. Mock it so the
// test exercises ArticleService's own logic against a stable stand-in.
jest.mock('slug', () => ({
  __esModule: true,
  default: (title: string) => title.toLowerCase().replace(/\s+/g, '-'),
}));

describe('ArticleService', () => {
  let articleService: ArticleService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ArticleService,
        { provide: getRepositoryToken(ArticleEntity), useValue: {} },
        { provide: getRepositoryToken(Comment), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
        { provide: getRepositoryToken(FollowsEntity), useValue: {} },
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
  });

  describe('slugify', () => {
    it('lowercases the title and appends a random suffix', async () => {
      const result = await articleService.slugify('Hello World');

      expect(result).toMatch(/^hello-world-[0-9a-z]+$/);
    });

    it('produces different suffixes across calls', async () => {
      const first = await articleService.slugify('Same Title');
      const second = await articleService.slugify('Same Title');

      expect(first).not.toBe(second);
    });
  });
});
