import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderIoComponent } from './builder-io.component';

describe('BuilderIoComponent', () => {
  let component: BuilderIoComponent;
  let fixture: ComponentFixture<BuilderIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderIoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuilderIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
