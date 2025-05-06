import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from './books.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  imports: [CommonModule]
})
export class BookListComponent {
  books = input<ReadonlyArray<Book>>([]);
  add = output<string>();
}
