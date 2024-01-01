import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryItemComponentComponent } from './gallery-item-component.component';

describe('GalleryItemComponentComponent', () => {
  let component: GalleryItemComponentComponent;
  let fixture: ComponentFixture<GalleryItemComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryItemComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
