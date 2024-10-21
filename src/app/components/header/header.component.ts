import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  watchlistCount = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getWatchlist().subscribe((watchlist) => {
      this.watchlistCount = watchlist.length;
    });
  }


}
