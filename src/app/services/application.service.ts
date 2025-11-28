import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface KycApplication {
  id: string;
  userId: string;
  mobileNumber: string;
  email: string;
  fullName: string;
  applicationStatus: string; // DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, PENDING_INFO
  entityType: string; // INDIVIDUAL, ENTITY
  currentStep: number;
  completionPercentage: number;
  assignedTo?: string;
  reviewNotes?: string;
  createdAt?: number;
  reviewedAt?: string;
  updatedAt: string;
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
export class ApplicationService {
  private apiUrl = 'http://localhost:8081/api/admin/applications';

  constructor(private http: HttpClient) {}

  getApplications(page: number = 0, size: number = 10): Observable<PageResponse<KycApplication>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<KycApplication>>(this.apiUrl, { params });
  }

  getApplicationsByStatus(status: string, page: number = 0, size: number = 10): Observable<PageResponse<KycApplication>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<KycApplication>>(`${this.apiUrl}/status/${status}`, { params });
  }

  getApplicationById(id: string): Observable<KycApplication> {
    return this.http.get<KycApplication>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, status: string, reviewNotes?: string): Observable<KycApplication> {
    let params = new HttpParams().set('status', status);
    if (reviewNotes) {
      params = params.set('reviewNotes', reviewNotes);
    }
    return this.http.put<KycApplication>(`${this.apiUrl}/${id}/status`, null, { params });
  }

  assignApplication(id: string, assignedTo: string): Observable<KycApplication> {
    const params = new HttpParams().set('assignedTo', assignedTo);
    return this.http.put<KycApplication>(`${this.apiUrl}/${id}/assign`, null, { params });
  }
}
