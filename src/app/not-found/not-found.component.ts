import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MoviesListComponent } from '../components/movies-list/movies-list.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MoviesListComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
constructor(private router :Router){}
}
