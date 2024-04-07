import { Injectable } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) { }

  searchCountryByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${name}`).pipe(
      catchError((error: any) => {
        // Handle errors
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCountryById(id: any): Observable<any> {
    console.log(id);
    return this.http.get<any>(`https://restcountries.com/v3.1/alpha/${id}`);
  }

  getCurrencyForCountry(countryCode: string): string {
    // You need to implement the logic to get the currency code for the provided country code
    // For simplicity, let's assume countryCode is 'LKA' for Sri Lanka
    if (countryCode === 'LKA') {
      return 'LKR - Sri Lankan rupee (Rs රු)';
    } else {
      return 'Currency data not available';
    }
  }
}
