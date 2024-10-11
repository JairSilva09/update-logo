import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoUpdateComponent } from './logo-update.component';

describe('LogoUpdateComponent', () => {
  let component: LogoUpdateComponent;
  let fixture: ComponentFixture<LogoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
