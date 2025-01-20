import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Breed } from '../models/breed.model';
import { BreedImage } from '../models/breed-image.model';
import { catchError, forkJoin, map, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${environment.apiUrl}${environment.versionUrl}breeds?limit=10`);
  }

  getBreedImage(id: string): Observable<BreedImage> {
    return this.http.get<BreedImage>(`${environment.apiUrl}${environment.versionUrl}images/${id}`);
  }

  getBreedsWithImages(): Observable<Breed[]> {
    const storedBreeds = localStorage.getItem('breedsWithImages');
    if (storedBreeds) {
      return of(JSON.parse(storedBreeds));
    }

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
                ...breed
              });
            }
            return this.getBreedImage(breed.reference_image_id)
              .pipe(
                // The map operator is used to transform the response by adding the image field
                // to the breed object. The spread operator (...breed) is used to keep all existing
                // breed properties and add the new image property.
                map(image => {
                  return {
                    ...breed,
                    image
                  }
                }), catchError(error => {
                  if (error.status === 400) {
                    return of({ ...breed });
                  } return throwError(() => error);
                })
              );
          });
          // The forkJoin operator combines all the observables in breedObservables
          // into a single observable. This observable emits an array when all inner observables
          // (i.e., the individual image requests) have completed.
          return forkJoin(breedObservables);
        }),
        map(breedsWithImages => {
          // The map operator is used to store the array of breeds with images in localStorage
          // so that it can be retrieved later without making another API call since these are limited.
          localStorage.setItem('breedsWithImages', JSON.stringify(breedsWithImages));
          return breedsWithImages;
        })
      );
  }

  searchBreeds(query: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${environment.apiUrl}${environment.versionUrl}breeds/search?q=${query}&attach_image=1`);
  }
}
