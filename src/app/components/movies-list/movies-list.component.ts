import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { MovieCardComponent } from '../../movie-card/movie-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MovieCardComponent
  ],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'] 
})

export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  searchQuery = ''; 
  watchlist: any[] = [];  

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.getMoviesByPage(this.currentPage);  
    this.loadWatchlist();  
  }

  getMoviesByPage(page: number): void {
    this.movieService.getPaginatedMovies(page).subscribe((data: any) => {
      this.movies = data.results;
    });
  }
 
  searchMovies(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

 

  loadWatchlist(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlist = watchlist;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.getMoviesByPage(this.currentPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMoviesByPage(this.currentPage);
    }
  }
}
