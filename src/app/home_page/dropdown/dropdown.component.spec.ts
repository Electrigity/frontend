import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMenuComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: PanelMenuComponent;
  let fixture: ComponentFixture<PanelMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
