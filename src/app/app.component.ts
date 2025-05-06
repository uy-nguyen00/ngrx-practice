import { Component, inject, OnInit } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { GoogleBooksService } from './book-list/books.service';
import { Store } from '@ngrx/store';
import { selectBookCollection, selectBooks } from './state/books.selectors';
import { BooksActions, BooksApiActions } from './state/books.actions';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Book } from './book-list/books.model';

@Component({
  selector: 'app-root',
  imports: [BookListComponent, BookCollectionComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private bookService = inject(GoogleBooksService);
  private store = inject(Store);

  books$: Observable<ReadonlyArray<Book>>;
  bookCollection$: Observable<Book[]>;

  constructor() {
    this.books$ = this.store.select(selectBooks);
    this.bookCollection$ = this.store.select(selectBookCollection);
  }

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }

  ngOnInit() {
    this.bookService
      .getBooks()
      .subscribe((books) =>
        this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
      )
  }
}
