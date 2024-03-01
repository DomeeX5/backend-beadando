import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from '../book.controller';
import { BookService, CreateBookDto } from '../book.service';
import { BookDto, UpdateBook } from '../dto/book.dto';
import { find } from 'rxjs';
import mock = jest.mock;

describe('BookController', () => {
  let controller: BookController;
  let mockBookService: BookService;

  beforeEach(async () => {
    mockBookService = {} as BookService
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService
        }
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the list of books returned by bookService.getAllBooks()', () => {
    mockBookService.getAllBooks = ()=> {
      return mockBookService.BookData;
    }

    expect(controller.getAllBooks()).toEqual(mockBookService.BookData)
  });

  it('should return a single book returned by bookService.getOneBook()', () => {
    mockBookService.getOneBook = (id: string) => {
      return {
        id,
        title: 'test',
        author: 'test',
        publish: 1999
      }
    }
    expect(controller.getOneBook('1')).toEqual(mockBookService.getOneBook('1'))
  });

  it('should create a single book returned by bookService.createBook()', () => {
    mockBookService.createBook = (createBookDto: CreateBookDto) => {
      return {
        id: '3',
        ...createBookDto
      }
    }
    const book = controller.createBook({
      id: Math.random().toString(),
      title: 'test',
      author: 'test',
      publish: 1999
    })

    expect(book).toEqual({
      title: 'test',
      author: 'test',
      publish: 1999,
      id: expect.any(String)
    });
  });

  it('should update a single book returned by bookService.updateBook()', () => {
    mockBookService.updateBook = (id: string, updateBookDto: UpdateBook) => {
      return {
        id,
        ...updateBookDto
      }
    }
    const updatedBook = controller.updateBook('1', {publish: 1999})
    expect(updatedBook).toEqual({
      id: '1',
      publish: 1999
    })
  });

  it('should call todoService.deleteTodo()', () => {
    mockBookService.deleteBook = jest.fn();
    controller.deleteBook('42');
    expect(mockBookService.deleteBook).toHaveBeenCalledWith('42');
  });
});
