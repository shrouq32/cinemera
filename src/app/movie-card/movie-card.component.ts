import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
   @Input() movie:any;
   watchlist: any[] = [];


   constructor(private movieService: MovieService, private router: Router) {}
   goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movies', movieId]); 
  }
  
  isInWatchlist(movieId: number): boolean {
    return this.watchlist.some((movie) => movie.id === movieId);
  }

  toggleWatchlist(movie: any): void {
    const movieExists = this.watchlist.some((item) => item.id === movie.id);
    if (movieExists) {
      this.movieService.removeFromWatchlist(movie);  
    } else {
      this.movieService.addToWatchlist(movie); 
    }
    this.loadWatchlist();  
  }
  loadWatchlist(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlist = watchlist;
    });
  }
}
