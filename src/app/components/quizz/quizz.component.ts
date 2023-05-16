import { Component, OnInit } from '@angular/core';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{

  quizz: any;

  title: string = '';
  questions : string | any;
  options : string [] = []
  
  
  answers: string[] = [];
  answersSelected: string = '';
  
  questionSelected: any;
  questionIndex: number = 0;
  finished: boolean = false;
  
  constructor( private service: QuizzService) {    
    this.quizz = service.getData()
  }
  
  getQuizz(){
   if(this.quizz){    
    this.title = this.quizz.title
    this.questions = this.quizz.questions;
    this.questionSelected = this.questions[this.questionIndex];   
    console.log(this.questionIndex);
         
   }
  }

  ngOnInit(): void{
    this.finished = false;
    this.getQuizz();  
  } 
  playerChoose(alias: string){
    this.answers.push(alias);
    this.nextQuestion();
  }   

  async nextQuestion(){
    this.questionIndex += 1;
    this.getQuizz();
    if (this.questionIndex === this.questions.length){
      this.questionIndex = 0
      this.questionSelected = this.questions[this.questionIndex]; 
      this.finished = true;
    }
    else{
      const finalAnswers = await this.checkResult(this.answers);
     this.answersSelected = this.quizz.results[finalAnswers as keyof typeof
                                              this.quizz.results] 

    }
  }

  async checkResult( answers: string[]){
    const result = answers.reduce( (acc, curr, i, arr) =>{
      return (arr.filter(item => item === acc).length > 
              arr.filter(item => item === curr).length ? acc : curr
      )
    })
    return result;
  }

  playerAgain(){
    this.ngOnInit();
  }

  
}
