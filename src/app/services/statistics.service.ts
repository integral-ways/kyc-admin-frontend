import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DashboardStats {
  totalApplications: number;
  submittedApplications: number;
  underReviewApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  draftApplications: number;
  pendingInfoApplications: number;
  todaySubmissions: number;
  weekSubmissions: number;
  monthSubmissions: number;
}

export interface Statistics {
  statusDistribution: { [key: string]: number };
  typeDistribution: { [key: string]: number };
  dailySubmissions: { [key: string]: number };
  monthlySubmissions: { [key: string]: number };
  averageCompletionPercentage: number;
  totalApplications: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.apiUrl}/statistics`);
  }
}
