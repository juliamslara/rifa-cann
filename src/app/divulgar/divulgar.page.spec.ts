import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DivulgarPage } from './divulgar.page';

describe('DivulgarPage', () => {
  let component: DivulgarPage;
  let fixture: ComponentFixture<DivulgarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DivulgarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
