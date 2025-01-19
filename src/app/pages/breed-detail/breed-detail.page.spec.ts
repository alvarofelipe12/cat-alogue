import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedDetailPage } from './breed-detail.page';

describe('BreedDetailPage', () => {
  let component: BreedDetailPage;
  let fixture: ComponentFixture<BreedDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
