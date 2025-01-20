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

  loadedBreeds: Breed[] = [
    {
      weight: {
        "imperial": "7  -  10",
        "metric": "3 - 5"
      },
      id: "abys",
      "name": "Abyssinian",
      "cfa_url": "http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx",
      "vetstreet_url": "http://www.vetstreet.com/cats/abyssinian",
      "vcahospitals_url": "https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian",
      "temperament": "Active, Energetic, Independent, Intelligent, Gentle",
      "origin": "Egypt",
      "country_codes": "EG",
      "country_code": "EG",
      "description": "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
      "life_span": "14 - 15",
      "indoor": 0,
      "lap": 1,
      "alt_names": "",
      "adaptability": 5,
      "affection_level": 5,
      "child_friendly": 3,
      "dog_friendly": 4,
      "energy_level": 5,
      "grooming": 1,
      "health_issues": 2,
      "intelligence": 5,
      "shedding_level": 2,
      "social_needs": 5,
      "stranger_friendly": 5,
      "vocalisation": 1,
      "experimental": 0,
      "hairless": 0,
      "natural": 1,
      "rare": 0,
      "rex": 0,
      "suppressed_tail": 0,
      "short_legs": 0,
      "wikipedia_url": "https://en.wikipedia.org/wiki/Abyssinian_(cat)",
      "hypoallergenic": 0,
      "reference_image_id": "0XYvRd7oD",
      image: {
        "id": "0XYvRd7oD",
        "url": "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
        "width": 1204, "height": 1445
      }
    },
  ];

  constructor(private breedsService: BreedsService) { }

  ngOnInit(): void {
    this.breedsService.getBreedsWithImages().subscribe(breeds => {
      this.loadedBreeds = breeds;
    });
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    if (!query) {
      this.breedsService.getBreedsWithImages().subscribe(breeds => {
        this.loadedBreeds = breeds;
      });
    }
    this.loadedBreeds = this.loadedBreeds.filter((d) => d.name.toLowerCase().includes(query));
    if (!this.loadedBreeds.length) {
      this.breedsService.searchBreeds(query).subscribe(breeds => {
        this.loadedBreeds = breeds;
      });
    }
  }
}
