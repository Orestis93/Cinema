import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscribable, Subscription } from 'rxjs';
import { Repertoire } from '../models/repertoire';
import { MapType, analyzeAndValidateNgModules } from '@angular/compiler';
import {map, tap} from 'rxjs/operators'
import { Showings } from '../models/showings';

@Injectable({
  providedIn: 'root'
})
export class SearchMoviesService {
  mainurl:"https://candidatetest.arpideas.pl/api/";
  repertoire:Observable<Repertoire>;
  showings:Observable<Showings>
  movieFormat:object;
  searchquery:string;
  private searchSubscription= new Subscription();
  constructor(private http:HttpClient) { }

  getRepertoire():Observable<Repertoire>{
    return this.http.get("https://candidatetest.arpideas.pl/api/repertoire/get")  as BehaviorSubject<Repertoire>;
  }
  getFormats(){
     return this.http.get("https://candidatetest.arpideas.pl/api/Movies/GetAvailableMovieFormats").pipe(
       tap( res=> this.movieFormat= res)
     );
  }
 
}
