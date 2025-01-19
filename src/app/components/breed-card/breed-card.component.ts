import { Component, Input, OnInit } from '@angular/core';
import { Breed } from 'src/app/models/breed.model';

@Component({
  selector: 'app-breed-card',
  templateUrl: './breed-card.component.html',
  styleUrls: ['./breed-card.component.scss'],
  standalone: false,
})
export class BreedCardComponent  implements OnInit {
  @Input() breedsList: Breed[] = [];

  constructor() { }

  ngOnInit() {}

  trackById(index: number, item: Breed) {
    return item.id;
  }

}
