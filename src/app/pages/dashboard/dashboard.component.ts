import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

// Models
import { Portfolio, Holding, Transaction } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public portfolioChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  // Portfolio data (mock data for now, will be replaced with API calls)
  public portfolioSummary = {
    totalValue: 125847.32,
    dayChange: 2543.18,
    dayChangePercent: 2.06,
    totalReturn: 25847.32,
    totalReturnPercent: 25.84,
    cashBalance: 12500.00
  };

  // Top gainers/losers today
  public topMovers: Holding[] = [
    {
      id: '1',
      portfolioId: 'p1',
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      shares: 50,
      avgCostBasis: 150.00,
      currentPrice: 178.50,
      marketValue: 8925.00,
      unrealizedPL: 1425.00,
      unrealizedPLPercent: 19.00,
      sector: 'Technology'
    },
    {
      id: '2',
      portfolioId: 'p1',
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      shares: 35,
      avgCostBasis: 280.00,
      currentPrice: 365.25,
      marketValue: 12783.75,
      unrealizedPL: 2983.75,
      unrealizedPLPercent: 30.46,
      sector: 'Technology'
    },
    {
      id: '3',
      portfolioId: 'p1',
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      shares: 20,
      avgCostBasis: 245.00,
      currentPrice: 198.50,
      marketValue: 3970.00,
      unrealizedPL: -930.00,
      unrealizedPLPercent: -18.98,
      sector: 'Automotive'
    },
    {
      id: '4',
      portfolioId: 'p1',
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      shares: 25,
      avgCostBasis: 420.00,
      currentPrice: 485.60,
      marketValue: 12140.00,
      unrealizedPL: 1640.00,
      unrealizedPLPercent: 15.62,
      sector: 'Technology'
    },
    {
      id: '5',
      portfolioId: 'p1',
      symbol: 'AMZN',
      companyName: 'Amazon.com Inc.',
      shares: 40,
      avgCostBasis: 135.00,
      currentPrice: 152.75,
      marketValue: 6110.00,
      unrealizedPL: 710.00,
      unrealizedPLPercent: 13.15,
      sector: 'Consumer'
    }
  ];

  // Recent transactions
  public recentTransactions: Transaction[] = [
    {
      id: 't1',
      portfolioId: 'p1',
      date: new Date('2024-11-02'),
      type: 'BUY',
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      shares: 10,
      price: 178.50,
      fees: 5.00,
      total: 1790.00
    },
    {
      id: 't2',
      portfolioId: 'p1',
      date: new Date('2024-11-01'),
      type: 'SELL',
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      shares: 15,
      price: 142.30,
      fees: 5.00,
      total: 2129.50
    },
    {
      id: 't3',
      portfolioId: 'p1',
      date: new Date('2024-10-28'),
      type: 'BUY',
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      shares: 5,
      price: 485.60,
      fees: 5.00,
      total: 2433.00
    }
  ];

  // Sector allocation data
  public sectorAllocation = [
    { sector: 'Technology', percentage: 65, value: 81800.76 },
    { sector: 'Healthcare', percentage: 15, value: 18877.10 },
    { sector: 'Finance', percentage: 12, value: 15101.68 },
    { sector: 'Consumer', percentage: 8, value: 10067.78 }
  ];

  ngOnInit() {

    // Portfolio performance datasets (monthly and weekly views)
    this.datasets = [
      [95000, 97000, 96500, 98200, 102000, 108000, 115000, 120000, 125847], // Monthly
      [120000, 122000, 119500, 123000, 121000, 124500, 125847] // Weekly
    ];
    this.data = this.datasets[0];

    const chartSectorAllocation = document.getElementById('chart-sector-allocation') as HTMLCanvasElement;

    parseOptions(Chart, chartOptions());

    // Sector Allocation Bar Chart
    const ctxSector = chartSectorAllocation.getContext('2d');
    var sectorChart = new Chart(ctxSector, {
      type: 'bar',
      options: {
        ...chartExample2.options,
        scales: {
          yAxes: [{
            ticks: {
              callback: function(value) {
                return '$' + (value / 1000).toFixed(0) + 'k';
              }
            }
          }]
        }
      },
      data: {
        labels: this.sectorAllocation.map(s => s.sector),
        datasets: [{
          label: 'Allocation',
          data: this.sectorAllocation.map(s => s.value),
          maxBarThickness: 10
        }]
      }
    });

    const chartPortfolio = document.getElementById('chart-portfolio') as HTMLCanvasElement;

    // Portfolio Performance Line Chart
    const ctxPortfolio = chartPortfolio.getContext('2d');
    this.portfolioChart = new Chart(ctxPortfolio, {
      type: 'line',
      options: {
        ...chartExample1.options,
        scales: {
          yAxes: [{
            gridLines: {
              color: '#212529',
              zeroLineColor: '#212529',
              drawOnChartArea: false
            },
            ticks: {
              callback: function(value) {
                if (!(value % 10000)) {
                  return '$' + (value / 1000).toFixed(0) + 'k';
                }
              }
            }
          }]
        }
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Nov'],
        datasets: [{
          label: 'Portfolio Value',
          data: this.data
        }]
      }
    });
  }


  public updateOptions() {
    this.portfolioChart.data.datasets[0].data = this.data;
    this.portfolioChart.update();
  }

}
