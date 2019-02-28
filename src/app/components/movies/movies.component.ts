import { Component, OnInit } from '@angular/core';
import { SearchMoviesService } from 'src/app/services/search-movies.service';
import { Repertoire } from 'src/app/models/repertoire';
import { Showings } from 'src/app/models/showings';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  repertoire$:Repertoire;
  title:string="Repertoire View";
  movieFormat:object;
  categoryfield = new FormControl;
  searchfield = new FormControl;
  constructor(private searchmovies:SearchMoviesService) { }
  form= FormGroup;
  
  ngOnInit() {
    this.searchmovies.getRepertoire().subscribe(res=>{
      this.repertoire$ = res});
    console.log();
    this.getFormats();
  
  }

   getFormats(){
    return this.searchmovies.getFormats().subscribe(res=>this.movieFormat=res );
    console.log(this.movieFormat)
   }
   searchmovie(){
      this.searchfield.valueChanges.pipe(
        debounceTime(700),
        distinctUntilChanged(),
       map(search => this.repertoire$.title.filter(value=> value == search))
      )
 }
}
