import { Component, OnInit } from '@angular/core';
import { BreedsService } from '../services/breeds.service';
import { Breed } from '../models/breed.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  loadedBreeds: Breed[] = [];
  isLoadingBreeds = false;

  constructor(private breedsService: BreedsService) { }

  ngOnInit(): void {
    this.isLoadingBreeds = true;
    this.breedsService.getBreedsWithImages().subscribe({
      next: breeds => {
        this.loadedBreeds = breeds;
      },
      complete: () => {
        this.isLoadingBreeds = false
      }
    });
  }

  handleInput(event: Event): void {
    console.log('input Changed');
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    if (!query) {
      this.breedsService.getBreedsWithImages().subscribe(breeds => {
        this.loadedBreeds = breeds;
      });
    }
    this.loadedBreeds = this.loadedBreeds.filter((d) => d.name.toLowerCase().includes(query));
    if (!this.loadedBreeds.length) {
      this.isLoadingBreeds = true;
      this.breedsService.searchBreeds(query).subscribe({
        next: breeds => {
          this.loadedBreeds = breeds;
        },
        complete: () => {
          this.isLoadingBreeds = false
        }
      });
    }
  }
}
