import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISearchData } from '../../pages/search/ISearchData';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class ListingService {
  constructor(private readonly http: HttpClient) {}

  private serverUrl = environment.serverUrl;

  public getSavedListings(): Observable<any> {
    return this.http.get(`${this.serverUrl}/users/get-saved-data`);
  }

  public removeListing(id: number): Observable<any> {
    return this.http.delete(`${this.serverUrl}/users/delete-saved-data?id=${id}`);
  }

  public saveDeleteApartment(apartamentId: number): Observable<ISearchData> {
    const body = { listing_key: apartamentId };
    return this.http.post<ISearchData>(`${this.serverUrl}/users/save-delete-apartment`, body);
  }

  public saveDeleteBuilding(buildingId: string): Observable<ISearchData> {
    const body = { building_key: buildingId };
    return this.http.post<ISearchData>(`${this.serverUrl}/users/save-delete-building`, body);
  }
}
