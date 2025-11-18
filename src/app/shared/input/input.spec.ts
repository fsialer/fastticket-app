import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputCustom } from './input';

describe('InputCustom', () => {
  let component: InputCustom;
  let fixture: ComponentFixture<InputCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCustom]
    }).compileComponents();

    fixture = TestBed.createComponent(InputCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value on input', () => {
    const spy = jest.fn();
    component.registerOnChange(spy);
    
    const event = { target: { value: 'test' } } as any;
    component.onInput(event);
    
    expect(spy).toHaveBeenCalledWith('test');
    expect(component.value).toBe('test');
  });
});