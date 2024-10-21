import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];
  movies: any[] = [];
  recommendations: Movie[] = [];
  showPosterLoader: boolean = false;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadWatchlist();  
  }

  loadWatchlist(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlist = watchlist;  
    });
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

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }
  getStarRating(rating: number) {
    const fullStars = Math.floor(rating / 2); 
    const halfStar = rating % 2 >= 1 ? 1 : 0; 
    const emptyStars = 5 - fullStars - halfStar; 

    return { fullStars, halfStar, emptyStars };
  }

  getStars(rating: number): string[] {
    const maxStars = 5;
    const filledStars = Math.floor(rating / 2);  
    const halfStar = (rating % 2) >= 1 ? 1 : 0;
    const emptyStars = maxStars - filledStars - halfStar;

   
    return [
      ...Array(filledStars).fill('fa-solid fa-star'),
      ...Array(halfStar).fill('fa-solid fa-star-half-alt'),
      ...Array(emptyStars).fill('fa-regular fa-star')
    ];
  }
}
