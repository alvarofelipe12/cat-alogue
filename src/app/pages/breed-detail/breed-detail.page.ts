import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breed } from 'src/app/models/breed.model';
import { BreedsService } from 'src/app/services/breeds.service';

@Component({
  selector: 'app-breed-detail',
  templateUrl: './breed-detail.page.html',
  styleUrls: ['./breed-detail.page.scss'],
  standalone: false,
})
export class BreedDetailPage {

  loadedBreed?: Breed;

  isLeaving = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breedsService: BreedsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('breedId')) {
        const breedId = paramMap.get('breedId')!;
        this.breedsService.getBreed(breedId).subscribe(breed => {
          this.loadedBreed = breed;
        });
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  ionViewWillLeave() {
    // hide the fixed ion-img item that might show during back navigation in iOS
    this.isLeaving = true;
    this.cdr.detectChanges();
  }

  setDefaultPic(event: Event) {
    const target = event.target as HTMLIonImgElement;
    if (target.src?.includes('jpg')) {
      target.src = target.src?.replace('jpg', 'png');
    } else {
      target.src = 'assets/images/placeholder.jpeg';
    }
  }
}
