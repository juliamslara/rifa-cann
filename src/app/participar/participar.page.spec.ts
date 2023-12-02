import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ParticiparPage } from './participar.page';

describe('ParticiparPage', () => {
  let component: ParticiparPage;
  let fixture: ComponentFixture<ParticiparPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ParticiparPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
