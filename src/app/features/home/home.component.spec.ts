import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AppService } from '../../app.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;  

  // Create mock for AppService dependency
  let appServiceMock = {
    // Mocking method that returns an observable
    getForecast: jasmine.createSpy().and.returnValue(
      of("The weather is Sunny, expected for next hours is Clear")),
    // Mocking an async method
    getForecastFetchVersion: jasmine.createSpy().and.returnValue(
      Promise.resolve("The weather is Sunny, expected for next hours is Clear")
    ),
  };
  beforeEach(async () => {  
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{
        provide: AppService, useValue: appServiceMock
      }],
    })
    .overrideProvider(AppService, { useValue: appServiceMock }) // specific for standalone components
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    
  });

  it('should create', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have greetings text`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const greetings = compiled.querySelector('#greetings');
    expect(greetings.textContent).toBeTruthy();  
  });

  it('should get weather forecast on init', () => {
    expect(appServiceMock.getForecast).toHaveBeenCalled();
    const compiled = fixture.nativeElement as HTMLElement;
    const currentWeather = compiled.querySelector('#currentWeather');
    const expectedWeather = "The weather is Sunny, expected for next hours is Clear";
    expect(currentWeather.textContent).toBe(expectedWeather);  
  });   
  
  /*
  // Example to test functionality that depend on async method
  it('should get weather forecast on init (fetch version)', waitForAsync(()=> {
    fixture.whenStable().then(() =>{
      fixture.detectChanges();
      expect(appServiceMock.getForecastFetchVersion).toHaveBeenCalled();
      const compiled = fixture.nativeElement as HTMLElement;
      const currentWeather = compiled.querySelector('#currentWeather');
      const expectedWeather = "The weather is Sunny, expected for next hours is Clear";
      expect(currentWeather.textContent).toBe(expectedWeather);  
    });
  }));   
  */
});