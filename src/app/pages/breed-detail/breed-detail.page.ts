import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-breed-detail',
  templateUrl: './breed-detail.page.html',
  styleUrls: ['./breed-detail.page.scss'],
  standalone: false,
})
export class BreedDetailPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramsMap => {
      if (paramsMap.has('breedId')) {
        paramsMap.get('breedId');
      }
    });
  }

}
