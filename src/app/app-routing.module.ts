import { NgModule } from '@angular/core';
import {MoviesComponent} from './components/movies/movies.component'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path:"" , component:MoviesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
