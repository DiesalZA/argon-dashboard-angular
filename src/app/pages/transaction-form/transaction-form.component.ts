import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction, Portfolio } from '../../models';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  public isEditMode: boolean = false;
  public transactionId: string | null = null;

  // Form data
  public transaction: Partial<Transaction> = {
    type: 'BUY',
    date: new Date(),
    shares: 0,
    price: 0,
    fees: 0,
    total: 0
  };

  // Available portfolios (mock data - will be replaced with API call)
  public portfolios: Portfolio[] = [
    {
      id: 'port-1',
      userId: 'user-1',
      name: 'Main Portfolio',
      description: 'Primary investment portfolio',
      totalValue: 57962.75,
      cashBalance: 8500.00,
      totalReturn: 6812.75,
      totalReturnPercent: 13.32,
      dayChange: 325.50,
      dayChangePercent: 0.56,
      createdDate: new Date('2023-01-15')
    },
    {
      id: 'port-2',
      userId: 'user-1',
      name: 'Retirement Portfolio',
      description: 'Long-term retirement investments',
      totalValue: 125000.00,
      cashBalance: 5000.00,
      totalReturn: 25000.00,
      totalReturnPercent: 25.00,
      dayChange: 450.00,
      dayChangePercent: 0.36,
      createdDate: new Date('2022-06-01')
    }
  ];

  public transactionTypes = [
    { value: 'BUY', label: 'Buy', icon: 'fas fa-arrow-down text-success' },
    { value: 'SELL', label: 'Sell', icon: 'fas fa-arrow-up text-danger' },
    { value: 'DIVIDEND', label: 'Dividend', icon: 'fas fa-dollar-sign text-info' }
  ];

  // Popular symbols for quick selection
  public popularSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'AMD'];

  // Form validation
  public formErrors: { [key: string]: string } = {};
  public isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Check if we're editing an existing transaction
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.transactionId = params['id'];
        this.loadTransaction(params['id']);
      }
    });

    // Set default portfolio
    if (this.portfolios.length > 0) {
      this.transaction.portfolioId = this.portfolios[0].id;
    }

    // Calculate total when price, shares, or fees change
    this.calculateTotal();
  }

  loadTransaction(id: string) {
    // TODO: Load transaction from API
    console.log('Loading transaction:', id);

    // Mock data for demonstration
    this.transaction = {
      id: id,
      portfolioId: 'port-1',
      type: 'BUY',
      symbol: 'AAPL',
      date: new Date('2024-10-15'),
      shares: 10,
      price: 178.50,
      fees: 4.95,
      total: 1789.95
    };
  }

  calculateTotal() {
    const shares = this.transaction.shares || 0;
    const price = this.transaction.price || 0;
    const fees = this.transaction.fees || 0;

    if (this.transaction.type === 'DIVIDEND') {
      // For dividends, total is just the dividend amount per share * shares
      this.transaction.total = shares * price;
    } else if (this.transaction.type === 'BUY') {
      // For buys, add fees to total
      this.transaction.total = (shares * price) + fees;
    } else if (this.transaction.type === 'SELL') {
      // For sells, subtract fees from total
      this.transaction.total = (shares * price) - fees;
    }

    // Round to 2 decimal places
    this.transaction.total = Math.round((this.transaction.total || 0) * 100) / 100;
  }

  onTypeChange() {
    this.calculateTotal();
  }

  onSharesChange() {
    this.calculateTotal();
  }

  onPriceChange() {
    this.calculateTotal();
  }

  onFeesChange() {
    this.calculateTotal();
  }

  onDateChange(dateString: string) {
    this.transaction.date = new Date(dateString);
  }

  selectSymbol(symbol: string) {
    this.transaction.symbol = symbol;
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.transaction.portfolioId) {
      this.formErrors['portfolio'] = 'Please select a portfolio';
      isValid = false;
    }

    if (!this.transaction.symbol || this.transaction.symbol.trim() === '') {
      this.formErrors['symbol'] = 'Stock symbol is required';
      isValid = false;
    }

    if (!this.transaction.shares || this.transaction.shares <= 0) {
      this.formErrors['shares'] = 'Shares must be greater than 0';
      isValid = false;
    }

    if (!this.transaction.price || this.transaction.price <= 0) {
      this.formErrors['price'] = this.transaction.type === 'DIVIDEND'
        ? 'Dividend per share must be greater than 0'
        : 'Price must be greater than 0';
      isValid = false;
    }

    if (this.transaction.fees && this.transaction.fees < 0) {
      this.formErrors['fees'] = 'Fees cannot be negative';
      isValid = false;
    }

    if (!this.transaction.date) {
      this.formErrors['date'] = 'Transaction date is required';
      isValid = false;
    }

    return isValid;
  }

  saveTransaction() {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    // TODO: Submit to API
    console.log('Saving transaction:', this.transaction);

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;

      if (this.isEditMode) {
        alert('Transaction updated successfully!');
      } else {
        alert('Transaction added successfully!');
      }

      // Navigate back to holdings/transactions page
      this.router.navigate(['/tables']);
    }, 500);
  }

  cancel() {
    // Navigate back to holdings/transactions page
    this.router.navigate(['/tables']);
  }

  getTypeIcon(type: string): string {
    const typeObj = this.transactionTypes.find(t => t.value === type);
    return typeObj ? typeObj.icon : '';
  }

  formatCurrency(value: number): string {
    return '$' + value.toFixed(2);
  }

}
