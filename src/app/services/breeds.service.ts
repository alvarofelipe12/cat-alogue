import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Breed } from '../models/breed.model';
import { BreedImage } from '../models/breed-image.model';
import { forkJoin, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${environment.apiUrl}${environment.versionUrl}breeds`);
  }

  getBreedImage(id: string): Observable<BreedImage> {
    return this.http.get<BreedImage>(`${environment.apiUrl}${environment.versionUrl}images/${id}`);
  }

  getBreedsWithImages(): Observable<Breed[]> {
    return this.getBreeds()
      .pipe(
        // The switchMap operator is used to take the array of breeds returned from the first API call and
        // switch to a new observable. This allows us to perform further operations on each breed.
        switchMap(breeds => {
          // This block creates an array of observables.
          // Each observable makes an HTTP GET request to the
          // getBreedImage endpoint using the reference_image_id from the breed object.
          const breedObservables = breeds.map(breed => {
            if (!breed.reference_image_id) {
              return of({
                ...breed,
                image: {
                  id: '',
                  url: 'assets/images/placeholder.jpeg'
                }
              });
            }
            return of({
              ...breed,
              image: {
                id: breed.reference_image_id,
                url: `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
              }
            });
          });
          // The forkJoin operator combines all the observables in breedObservables
          // into a single observable. This observable emits an array when all inner observables
          // (i.e., the individual image requests) have completed.
          return forkJoin(breedObservables);
        })
      );
  }

  searchBreeds(query: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${environment.apiUrl}${environment.versionUrl}breeds/search?q=${query}&attach_image=1`);
  }

  getBreed(breedId: string): Observable<Breed> {
    return this.http.get<Breed>(`${environment.apiUrl}${environment.versionUrl}breeds/${breedId}`)
      .pipe(
        // The switchMap operator is used to take the array of breeds returned from the first API call and
        // switch to a new observable. This allows us to perform further operations on each breed.
        switchMap(breed => {
          if (!breed.reference_image_id) {
            return of({
              ...breed,
              image: {
                id: '',
                url: 'assets/images/placeholder.jpeg'
              }
            });
          }
          return of({
            ...breed,
            image: {
              id: breed.reference_image_id,
              url: `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
            }
          });
        })
      );
  }
}
