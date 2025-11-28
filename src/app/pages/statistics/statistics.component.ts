import { Component, OnInit } from '@angular/core';
import { StatisticsService, Statistics } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statistics: Statistics | null = null;
  loading = true;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (stats) => {
        this.statistics = stats;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getStatusKeys(): string[] {
    return this.statistics ? Object.keys(this.statistics.statusDistribution) : [];
  }

  getTypeKeys(): string[] {
    return this.statistics ? Object.keys(this.statistics.typeDistribution) : [];
  }

  getDailyKeys(): string[] {
    return this.statistics ? Object.keys(this.statistics.dailySubmissions) : [];
  }

  getMonthlyKeys(): string[] {
    return this.statistics ? Object.keys(this.statistics.monthlySubmissions) : [];
  }

  getStatusBadgeClass(status: string): string {
    const classes: any = {
      'SUBMITTED': 'bg-info',
      'UNDER_REVIEW': 'bg-warning',
      'APPROVED': 'bg-success',
      'REJECTED': 'bg-danger',
      'DRAFT': 'bg-secondary'
    };
    return classes[status] || 'bg-secondary';
  }
}
