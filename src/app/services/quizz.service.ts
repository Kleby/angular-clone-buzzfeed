import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  private dataBase: any;
  constructor() { }
  
  getData(){
    this.dataBase = environment.questionsAPIFake;
    return this.dataBase
  }
}
