import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedCardComponent } from './breed-card.component';
import { Breed } from 'src/app/models/breed.model';
import { By } from '@angular/platform-browser';

fdescribe('BreedCardComponent', () => {
  let component: BreedCardComponent;
  let fixture: ComponentFixture<BreedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreedCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty breedsList by default', () => {
    expect(component.breedsList).toEqual([]);
  });

  it('should track by id', () => {
    const breed: Breed = {
      id: '1',
      name: 'Breed 1',
      description: '',
      temperament: '',
      origin: '',
      life_span: '',
      adaptability: 0,
      affection_level: 0,
      child_friendly: 0,
      grooming: 0,
      intelligence: 0,
      health_issues: 0,
      social_needs: 0,
      stranger_friendly: 0,
      vocalisation: 0,
      experimental: 0,
      hairless: 0,
      natural: 0,
      rare: 0,
      rex: 0,
      suppressed_tail: 0,
      short_legs: 0,
      wikipedia_url: '',
      hypoallergenic: 0,
      reference_image_id: '',
      image: { url: '', id: '' },
      weight: {
        imperial: '',
        metric: ''
      },
      country_code: '',
      country_codes: '',
      alt_names: '',
      indoor: 0,
      dog_friendly: 0,
      energy_level: 0,
      shedding_level: 0,
      cfa_url: '',
    };
    expect(component.trackById(0, breed)).toBe('1');
  });

  it('should set default picture if image is not jpg', () => {
    const event = {
      target: {
        src: 'assets/images/placeholder.jpeg'
      }
    } as unknown as Event;
    component.setDefaultPic(event);
    expect((event.target as HTMLIonImgElement).src).toBe('assets/images/placeholder.jpeg');
  });

  it('should replace jpg with png in image src', () => {
    const event = {
      target: {
        src: 'assets/images/cat.jpg'
      }
    } as unknown as Event;
    component.setDefaultPic(event);
    expect((event.target as HTMLIonImgElement).src).toBe('assets/images/cat.png');
  });
});
