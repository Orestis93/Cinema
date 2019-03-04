import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Repertoire } from 'src/app/models/repertoire';
import { SearchMoviesService } from 'src/app/services/search-movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit {
  repertoire$: BehaviorSubject<Repertoire[]> = new BehaviorSubject(null);
  categories: string[] = []
  initialRepertoires: Repertoire[] = []
  title: string = "Repertoire View";
  movieFormat: object;
  subscriptions: Subscription[] = []
  constructor(private searchmovies: SearchMoviesService) { }
  form = new FormGroup(
    {
      searchField: new FormControl(''),
      categoryField: new FormControl(''),
    }
  );

  ngOnInit() {
    this.searchmovies.getRepertoire().pipe(
      tap(
        (res) => {
          this.initialRepertoires = res;
          this.initialRepertoires.forEach(repertoire => repertoire.categories.forEach(category => this.categories.push(category)));
          this.categories = Array.from(new Set(this.categories));
          this.repertoire$.next(res)
          console.log(res);
        })).subscribe()
    this.subscriptions.push(this.getFormats(), this.filterMovies())
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
  getFormats() {
    return this.searchmovies.getFormats().subscribe(res => this.movieFormat = res);
  }
  filterMovies(): Subscription {
    return this.form.valueChanges.pipe(
      tap(({ searchField, categoryField }) => {
        let filteredValues = this.initialRepertoires;
        filteredValues = this.initialRepertoires.filter(repertoire => {
          return repertoire.title.toLowerCase().includes(searchField)
        })
        filteredValues = filteredValues.filter(repertoire => repertoire.categories.includes(categoryField))
        return this.repertoire$.next(filteredValues)
      })
    ).subscribe()
    // return this.form.get('searchField').valueChanges.pipe(
    //   tap(value => {
    //     const filteredValues = this.initialRepertoires.filter(repertoire => {
    //       return repertoire.title.toLowerCase().includes(value)
    //     })
    //     return this.repertoire$.next(filteredValues)
    //   })).subscribe()
  }
  // searchcategory() {
  //   return this.form.get('categoryField').valueChanges.pipe(
  //     tap(value => {
  //       const filteredValues = this.initialRepertoires.filter(repertoire => {
  //         return repertoire.title.toLowerCase().includes(value)
  //       })
  //       return this.repertoire$.next(filteredValues)
  //     }
  //     )
  //   ).subscribe()
}
