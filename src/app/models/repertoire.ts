import { Showings } from './showings';

export interface Repertoire {

    id: string;
    title: string;
    duration: number;
    ageLimit: number;
    categories: string[];
    showings: Showings;

}

// showings:[{
//     movieFormat:string
//     showingDates:[{id:string;date:string;}]
// }]