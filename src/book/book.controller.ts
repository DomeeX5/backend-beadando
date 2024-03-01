import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto, UpdateBook } from './dto/book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('create')
  createBook(@Body() createBookDto: BookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Get('all')
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  getOneBook(@Param('id') id: string) {
    return this.bookService.getOneBook(id);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBook) {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
