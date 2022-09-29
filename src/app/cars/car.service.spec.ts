import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { CarService } from './car.service';
import { Car } from '../models/car';
import { HttpErrorResponse } from '@angular/common/http';

describe('CarService', () => {
  let service: CarService;
  let httpTestingController: HttpTestingController;
  let mockCars: Car[];
  const serviceUrl = 'http://localhost:8080/CarService/jaxrs/cars';

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
        HttpClientTestingModule
      ]});
    service = TestBed.inject(CarService);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockCars = [{
      doors: 4,
      make: "Lexus",
      model: "RX350",
      price: 35000,
      year: 2018
    }, {
      doors: 4,
      make: "Toyota",
      model: "Camry",
      price: 25000,
      year: 2019
    }];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cars', inject([CarService], fakeAsync((service: CarService) => {
    let cars: Car[] = [];
    service.getCars().subscribe(data => cars = data);
    const req = httpTestingController.expectOne('http://localhost:8080/CarService/jaxrs/cars');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCars);
    httpTestingController.verify();
    tick();
    expect(cars[0].make).toBe('Lexus');
  })));

  it('should handle a 404 error', inject([CarService], fakeAsync((service: CarService) => {
    let errorResp: HttpErrorResponse;
    let errorReply: string = "";
    const errorHandlerSpy = spyOn(service, 'handleError').and.callThrough();
    service.getCars()
      .subscribe({
        next: () => fail('Should not succeed'),
        error: (e) => errorReply = e
      });
    const req = httpTestingController.expectOne(serviceUrl);
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    // Respond with error
    req.flush('Forced 404', {
      status: 404,
      statusText: 'Not Found'
    });
    // Assert that there are no outstanding requests.
    httpTestingController.verify();
    // Cause all Observables to complete and check the results
    tick();
    expect(errorReply).toBe('Unable to contact service; please try again later.');
    expect(errorHandlerSpy).toHaveBeenCalled();
    errorResp = errorHandlerSpy.calls.argsFor(0)[0];
    expect(errorResp.status).toBe(404);
  })));
});
