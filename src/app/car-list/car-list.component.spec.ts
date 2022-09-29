import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CarService } from '../cars/car.service';
import { Car } from '../models/car';

import { CarListComponent } from './car-list.component';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;

  const mockCars: Car[] = [{
    doors: 4,
    make: "Audi",
    model: "A4",
    price: 15000,
    year: 2014
  }, {
    doors: 4,
    make: "Toyota",
    model: "Corolla",
    price: 20000,
    year: 2020
  }]

  let carService: any = jasmine.createSpyObj('CarService', ['getCars']);
  carService.getCars.and.returnValue(of(mockCars));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarListComponent ],
      providers: [
        { provide: CarService, useValue: carService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain car in table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const table = compiled.querySelector('tbody');
    expect(table?.rows.length).toBe(2);
    expect(table?.rows[0].cells[0].textContent).toBe("Audi");
  });
});
