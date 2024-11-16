import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  // Method to fetch key performance indicators (KPIs) data
  getKPIData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpis`).pipe(
      map((response: any) => response.data), // Extract the relevant data from the response
      catchError((error) => {
        console.error('Error fetching KPI data:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  // Method to fetch historical data for charts or tables
  getHistoricalData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/historical-data`).pipe(
      map((response: any) => response.data),
      catchError((error) => {
        console.error('Error fetching historical data:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  // Method to update the dashboard configuration
  updateDashboardConfig(config: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-config`, config).pipe(
      map((response: any) => response.success), // Assuming a success status is returned
      catchError((error) => {
        console.error('Error updating dashboard config:', error);
        return of(false); // Return false in case of an error
      })
    );
  }
}
