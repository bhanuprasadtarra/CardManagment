import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface cardModel {
  Name: string;
  Number: number;
  Amount: number;
  Cvv: string;
  date: string;
  cardId: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularTest';
  ELEMENT_DATA: Array<cardModel> = [];
  formAddCard: FormGroup = new FormGroup({
    Number: new FormControl('', [Validators.required]),
    Name: new FormControl('', [Validators.required]),
    CVV: new FormControl('', [Validators.required]),
    Amount: new FormControl('', [Validators.required]),
    expiryMonth: new FormControl('', [Validators.required]),
    expiryYear: new FormControl('', [Validators.required])
  })

  displayedColumns: string[] = ['sno', 'Name', 'Number', 'date', 'Cvv', 'Amount'];
  addCardSection = false;
  date = new Date();
  currMonth: number;
  currYear: number;
  cardId = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.currMonth = this.date.getMonth() + 1;
    this.currYear = this.date.getFullYear();
  }
  addCard() {
    this.addCardSection = true;
  }
  addCardSubmit() {
    if (this.formAddCard.valid) {

      let cardObj: cardModel = {
        Number: this.formAddCard.value.Number,
        Name: this.formAddCard.value.Name,
        Amount: this.formAddCard.value.Amount,
        Cvv: this.formAddCard.value.CVV,
        date: this.formAddCard.value.expiryMonth + '/' + this.formAddCard.value.expiryYear,
        cardId: this.cardId
      }
      this.ELEMENT_DATA.push(cardObj);
      this.cardId += 1;
      this.addCardSection = false;
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  deleteCard(index: number){
    this.ELEMENT_DATA.splice(index, 1);
  }
}
