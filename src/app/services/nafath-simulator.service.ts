import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface NafathUserProfile {
  id?: string;
  nationalId: string;
  idType: string;
  fullNameAr: string;
  fullNameEn: string;
  gender: string;
  birthDateHijri: string;
  birthDateGregorian: string;
  mobile: string;
  country: string;
  region: string;
  city: string;
  district: string;
  street: string;
  buildingNumber: string;
  additionalNumber: string;
  postalCode: string;
  unitNumber: string;
  status: 'WAITING' | 'COMPLETED' | 'REJECTED' | 'EXPIRED' | 'ERROR';
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class NafathSimulatorService {
  private apiUrl = `${environment.apiUrl}/nafath-simulator`;

  constructor(private http: HttpClient) {}

  getAllProfiles(page: number = 0, size: number = 10): Observable<PageResponse<NafathUserProfile>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<NafathUserProfile>>(this.apiUrl, { params });
  }

  getActiveProfiles(): Observable<NafathUserProfile[]> {
    return this.http.get<NafathUserProfile[]>(`${this.apiUrl}/active`);
  }

  getProfileById(nationalId: string): Observable<NafathUserProfile> {
    return this.http.get<NafathUserProfile>(`${this.apiUrl}/${nationalId}`);
  }

  generateProfile(idType: string = 'NATIONAL_ID'): Observable<NafathUserProfile> {
    const params = new HttpParams().set('idType', idType);
    return this.http.post<NafathUserProfile>(`${this.apiUrl}/generate`, null, { params });
  }

  generateBulkProfiles(count: number = 5, idType: string = 'NATIONAL_ID'): Observable<NafathUserProfile[]> {
    const params = new HttpParams()
      .set('count', count.toString())
      .set('idType', idType);
    return this.http.post<NafathUserProfile[]>(`${this.apiUrl}/generate-bulk`, null, { params });
  }

  updateProfile(nationalId: string, profile: NafathUserProfile): Observable<NafathUserProfile> {
    return this.http.put<NafathUserProfile>(`${this.apiUrl}/${nationalId}`, profile);
  }

  deleteProfile(nationalId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${nationalId}`);
  }

  simulateAuth(nationalId: string): Observable<NafathUserProfile> {
    const params = new HttpParams().set('nationalId', nationalId);
    return this.http.post<NafathUserProfile>(`${this.apiUrl}/simulate-auth`, null, { params });
  }
}
