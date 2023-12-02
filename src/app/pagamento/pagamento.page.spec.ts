import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PagamentoPage } from './pagamento.page';

describe('ParticipantePagouPage', () => {
  let component: PagamentoPage;
  let fixture: ComponentFixture<PagamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
