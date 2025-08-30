import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoVacinaComponent } from './cartao-vacina-component';


describe('CartaoVacinaComponent', () => {
  let component: CartaoVacinaComponent;
  let fixture: ComponentFixture<CartaoVacinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoVacinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
