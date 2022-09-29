import { Component, OnInit } from '@angular/core';
import { CarService } from '../cars/car.service';
import { Car } from '../models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) { } // Injected the car service into the car list component

  getCars(){
    this.carService.getCars().subscribe(data => this.cars = data)  // Receive cars from the service 
  }

  getCarsByPrice(){
    this.carService.getCarsByPrice().subscribe(data => this.cars = data);
  }

  ngOnInit(): void {
    // Call getCars() when component loads up
    this.getCars();
  }

}
