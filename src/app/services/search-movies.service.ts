import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Repertoire } from '../models/repertoire';
import { Showings } from '../models/showings';

@Injectable({
  providedIn: 'root'
})
export class SearchMoviesService {
  mainurl: "https://candidatetest.arpideas.pl/api/";
  repertoire: Observable<Repertoire>;
  showings: Observable<Showings>
  movieFormat: object;
  searchquery: string;
  private searchSubscription = new Subscription();
  constructor(private http: HttpClient) { }

  getRepertoire(): Observable<Repertoire[]> {
    return this.http.get("https://candidatetest.arpideas.pl/api/repertoire/get") as Observable<Repertoire[]>;
  }
  getFormats() {
    return this.http.get("https://candidatetest.arpideas.pl/api/Movies/GetAvailableMovieFormats").pipe(
      tap(res => this.movieFormat = res)
    );
  }

}
