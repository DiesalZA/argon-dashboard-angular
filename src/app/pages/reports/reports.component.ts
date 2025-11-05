import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { chartOptions, parseOptions } from '../../variables/charts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  // Active tab
  public activeTab: string = 'performance';

  // Date range filter
  public dateRange: string = '1Y';
  public dateRanges = [
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '6M', label: '6 Months' },
    { value: '1Y', label: '1 Year' },
    { value: 'YTD', label: 'Year to Date' },
    { value: 'ALL', label: 'All Time' }
  ];

  // Charts
  public performanceChart: any;
  public allocationChart: any;
  public sectorChart: any;

  // Portfolio performance data (mock)
  public performanceMetrics = {
    totalReturn: 6812.75,
    totalReturnPercent: 13.32,
    annualizedReturn: 15.8,
    sharpeRatio: 1.45,
    maxDrawdown: -8.2,
    volatility: 12.3,
    alpha: 2.1,
    beta: 1.05
  };

  // Holdings by sector
  public sectorAllocation = [
    { sector: 'Technology', value: 25000, percent: 43.1, color: '#5e72e4' },
    { sector: 'Healthcare', value: 8500, percent: 14.7, color: '#2dce89' },
    { sector: 'Financial', value: 9200, percent: 15.9, color: '#11cdef' },
    { sector: 'Consumer', value: 7500, percent: 12.9, color: '#f5365c' },
    { sector: 'Energy', value: 4200, percent: 7.2, color: '#fb6340' },
    { sector: 'Materials', value: 3562.75, percent: 6.2, color: '#ffd600' }
  ];

  // Top holdings
  public topHoldings = [
    { symbol: 'AAPL', companyName: 'Apple Inc.', value: 8925.00, percent: 15.4, returnPercent: 18.5 },
    { symbol: 'MSFT', companyName: 'Microsoft Corp.', value: 7300.00, percent: 12.6, returnPercent: 22.3 },
    { symbol: 'GOOGL', companyName: 'Alphabet Inc.', value: 6400.50, percent: 11.0, returnPercent: 15.7 },
    { symbol: 'NVDA', companyName: 'NVIDIA Corp.', value: 6237.50, percent: 10.8, returnPercent: 45.2 },
    { symbol: 'JPM', companyName: 'JPMorgan Chase', value: 4575.00, percent: 7.9, returnPercent: 8.9 }
  ];

  // Gains and losses
  public gainsLosses = {
    realizedGains: 3250.50,
    realizedLosses: -850.25,
    unrealizedGains: 7812.75,
    unrealizedLosses: -3400.25,
    netGains: 6812.75
  };

  // Monthly performance data
  public monthlyPerformance = [
    { month: 'Jan', return: 2.5, benchmark: 1.8 },
    { month: 'Feb', return: -1.2, benchmark: -0.8 },
    { month: 'Mar', return: 3.8, benchmark: 2.9 },
    { month: 'Apr', return: 1.9, benchmark: 1.5 },
    { month: 'May', return: -2.1, benchmark: -1.6 },
    { month: 'Jun', return: 4.2, benchmark: 3.1 },
    { month: 'Jul', return: 2.8, benchmark: 2.2 },
    { month: 'Aug', return: -0.5, benchmark: 0.2 },
    { month: 'Sep', return: 3.5, benchmark: 2.8 },
    { month: 'Oct', return: 1.7, benchmark: 1.3 },
    { month: 'Nov', return: 2.9, benchmark: 2.1 },
    { month: 'Dec', return: 1.8, benchmark: 1.4 }
  ];

  // Tax summary (mock data)
  public taxSummary = {
    shortTermGains: 1250.50,
    longTermGains: 2000.00,
    dividendIncome: 450.75,
    estimatedTaxLiability: 892.25
  };

  constructor() { }

  ngOnInit() {
    parseOptions(Chart, chartOptions());

    setTimeout(() => {
      this.initializePerformanceChart();
      this.initializeAllocationChart();
      this.initializeSectorChart();
    }, 100);
  }

  initializePerformanceChart() {
    const canvas = document.getElementById('performanceChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    this.performanceChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.monthlyPerformance.map(m => m.month),
        datasets: [
          {
            label: 'Portfolio',
            data: this.monthlyPerformance.map(m => m.return),
            borderColor: '#5e72e4',
            backgroundColor: 'rgba(94, 114, 228, 0.1)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#5e72e4',
            fill: true
          },
          {
            label: 'S&P 500',
            data: this.monthlyPerformance.map(m => m.benchmark),
            borderColor: '#2dce89',
            backgroundColor: 'rgba(45, 206, 137, 0.1)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#2dce89',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
            gridLines: {
              color: 'rgba(0, 0, 0, 0.05)',
              zeroLineColor: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.datasets[tooltipItem.datasetIndex].label || '';
              // Support both Chart.js 2.x (yLabel) and 3.x (parsed.y)
              const value = tooltipItem.parsed?.y ?? tooltipItem.yLabel;
              if (typeof value === 'number' && !isNaN(value)) {
                return label + ': ' + value + '%';
              }
              return label + ': 0%';
            }
          }
        }
      }
    });
  }

  initializeAllocationChart() {
    const canvas = document.getElementById('allocationChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    this.allocationChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.sectorAllocation.map(s => s.sector),
        datasets: [{
          data: this.sectorAllocation.map(s => s.percent),
          backgroundColor: this.sectorAllocation.map(s => s.color),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'bottom'
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.index] || '';
              const value = data.datasets[0].data[tooltipItem.index];
              return label + ': ' + value + '%';
            }
          }
        }
      }
    });
  }

  initializeSectorChart() {
    const canvas = document.getElementById('sectorChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    this.sectorChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.sectorAllocation.map(s => s.sector),
        datasets: [{
          label: 'Allocation',
          data: this.sectorAllocation.map(s => s.value),
          backgroundColor: this.sectorAllocation.map(s => s.color),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value) {
                return '$' + (value / 1000).toFixed(1) + 'K';
              }
            },
            gridLines: {
              color: 'rgba(0, 0, 0, 0.05)',
              zeroLineColor: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              // Support both Chart.js 2.x (yLabel) and 3.x (parsed.y)
              const value = tooltipItem.parsed?.y ?? tooltipItem.yLabel;
              if (typeof value === 'number' && !isNaN(value)) {
                return '$' + value.toLocaleString();
              }
              return '$0';
            }
          }
        }
      }
    });
  }

  changeDateRange(range: string) {
    this.dateRange = range;
    // TODO: Reload data based on date range
    console.log('Date range changed to:', range);
  }

  exportReport(format: string) {
    console.log('Exporting report as:', format);
    alert(`Exporting report as ${format}... (Feature coming soon)`);
  }

  formatCurrency(value: number): string {
    if (value == null || typeof value !== 'number' || isNaN(value)) {
      return '$0.00';
    }
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatPercent(value: number): string {
    if (value == null || typeof value !== 'number' || isNaN(value)) {
      return '0.00%';
    }
    return value.toFixed(2) + '%';
  }

}
