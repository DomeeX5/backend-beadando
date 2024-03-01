import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BookModule } from '../book.module';
import { BookController } from '../book.controller';
import { BookService, CreateBookDto } from '../book.service';
import { BookDto } from '../dto/book.dto';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let mockService: BookService;

  beforeEach(async () => {
    mockService = {} as BookService;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BookModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books/all (GET)', () => {
    return request(app.getHttpServer())
      .get('/books/all')
      .expect(200)
      .expect(
        mockService.getAllBooks = () => {
          return mockService.BookData
        }
      );
  });

  it('/books/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/books/1`)
      .expect(200)
      .expect(
        mockService.getOneBook = (id: string) => {
          return {
            id: id,
            title: 'test',
            author: 'test',
            publish: 1999
          }
        }
      )
  });

  it('/books/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/books/create')
      .expect(201)
      .expect(
        mockService.createBook = (createBookDto: CreateBookDto) => {
          return {
            id: Math.random().toString(),
            ...createBookDto
          }
        }
      )
  });

  it('/books/1 (PUT)', () => {
    return request(app.getHttpServer())
      .put('/books/1')
      .expect(200)
      .expect(
        mockService.updateBook = (id, updateBookDto) => {
          return {
            id,
            ...updateBookDto
          }
        }
      )
  });

  it('/books/1 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/books/1')
      .expect(200)
      .expect(
        mockService.deleteBook = (id: string) => {
          const rest: CreateBookDto = {
            title: 'test',
            author: 'test',
            publish: 1999
          }
          return [{...rest, id}]
        }
      )
  });
});
