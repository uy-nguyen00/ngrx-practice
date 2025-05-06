import { Component, input, output } from '@angular/core';
import { Book } from '../book-list/books.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-collection',
  imports: [CommonModule],
  templateUrl: './book-collection.component.html',
  styleUrl: './book-collection.component.css'
})
export class BookCollectionComponent {
  books = input<ReadonlyArray<Book>>([]);
  remove = output<string>();
}
