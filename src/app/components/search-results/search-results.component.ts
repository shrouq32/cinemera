import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  searchQuery = '';  
  watchlist: any[] = [];  


  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.searchMovies(this.searchQuery); 
    });
  }

  searchMovies(query: string): void {
    if (query.trim()) {
      this.movieService.searchMovies(query).subscribe((data: any) => {
        this.searchResults = data.results;
      });
    }
  }

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movies', movieId]);  
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

  isInWatchlist(movieId: number): boolean {
    return this.watchlist.some((movie) => movie.id === movieId);
  }

  loadWatchlist(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlist = watchlist;
    });
  }

}
