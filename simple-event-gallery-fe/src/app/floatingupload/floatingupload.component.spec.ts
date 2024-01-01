import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatinguploadComponent } from './floatingupload.component';

describe('FloatinguploadComponent', () => {
  let component: FloatinguploadComponent;
  let fixture: ComponentFixture<FloatinguploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatinguploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloatinguploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
