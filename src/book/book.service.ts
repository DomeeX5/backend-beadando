import { Injectable, NotFoundException } from '@nestjs/common';
import { BookDto, UpdateBook } from './dto/book.dto';
import { isEmpty } from 'rxjs';

export type CreateBookDto = Omit<BookDto, 'id'>



@Injectable()
export class BookService {

   BookData = [
    {
      id: '1',
      title: 'Harry Potter and the Philosophers Stone',
      author: 'J.K. Rowling',
      publish: 1997
    },
    {
      id: '2',
      title: 'The Witcher',
      author: 'Andrzej Sapkowski',
      publish: 1994
    }
  ]

  createBook(createBookDto: CreateBookDto) {
    const book: BookDto = {
      id: Math.random().toString(),
      ...createBookDto
    }
    this.BookData.push(book)
    return book;
  }

  getAllBooks() {
     if (this.BookData.length === 0) {
       throw new NotFoundException('The array is empty!')
     }
    return this.BookData;
  }

  getOneBook(id: string) {
    const bookById = this.BookData.find(book => book.id === id)
    if (!bookById) {
      throw new NotFoundException("Book with this id doesn't exist!")
    }
    return bookById;
  }

  updateBook(id: string, updateBookDto: UpdateBook) {
    const bookById = this.getOneBook(id)
    if (!bookById) {
      throw new NotFoundException('Book not found!')
    } else {
      Object.assign(bookById, updateBookDto)
      return updateBookDto;
    }
  }

  deleteBook(id: string) {
    const bookById = this.BookData.findIndex(obj => obj.id === id)
    if (bookById > -1) {
      this.BookData.splice(bookById, 1)
      return this.BookData;
    } else {
      throw new NotFoundException("Book with this id doesn't exist.")
    }
  }
}
