import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { BookDto } from '../dto/book.dto';
import { OmitType } from '@nestjs/mapped-types';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD read', () => {
    it('should return all of the books', () => {
      if (service.BookData.length === 0) {
        expect(service.getAllBooks()).toThrowError('The array is empty!')
      } else {
        expect(service.getAllBooks()).toEqual(service.BookData);
      }
    });

    it('should return one book by its id', () => {
      for (let i = 0; i < service.BookData.length; i++) {
        expect(service.getOneBook(service.BookData[i].id))
          .toEqual(service.BookData.find(book => book.id === service.BookData[i].id));
      }
    });

    it("should return an exception if the book doesn't exist", () => {
      try {
        service.getOneBook('4')
      } catch (error: any) {
        expect(error.message).toBe("Book with this id doesn't exist!");
        return;
      }
      throw new Error("Expected findOneBook to throw an exception.");
    });
  });

  describe('CRUD create', () => {
    it('should create a book', () => {
      const created = service.createBook({
        title: 'test',
        author: 'testAuthor',
        publish: 2024
      });

      expect(service.BookData.find(book => book.id === created.id)).toEqual({
        id: expect.any(String),
        title: 'test',
        author: 'testAuthor',
        publish: 2024
      });
    });

  });

  describe('CRUD update', () => {
    it('should return an updated book', () => {
      const created = service.createBook({
        title: 'UpdateTest',
        author: 'Author',
        publish: 2024
      });

      const bookById = service.BookData.find(book => book.id === created.id)!.id;

      const updated = service.updateBook(bookById, {
        title: 'updated',
        author: 'updated',
        publish: 1999
      })

      expect(service.BookData[service.BookData.length - 1]).toEqual({
        id: expect.any(String),
        title: updated.title,
        author: updated.author,
        publish: updated.publish
      })
    });

    it("should return an exception if the book doesn't exist", () => {
      try {
        service.updateBook('4', {
          title: 'updated',
          author: 'updated',
          publish: 1999
        })
      } catch (error: any) {
        expect(error.message).toBe("Book with this id doesn't exist!");
        return;
      }
      throw new Error("Expected deleteBook to throw an exception.");
    });
  });

  describe('CRUD delete', () => {
    it('should delete an already existing book', () => {
      const book = service.deleteBook('1')
      expect(service.BookData).toEqual(book)
    });

    it("should return an exception if the book doesn't exist", () => {
      try {
        service.deleteBook('4')
      } catch (error: any) {
        expect(error.message).toBe("Book with this id doesn't exist.");
        return;
      }
      throw new Error("Expected deleteBook to throw an exception.");
    });
  });
});
