import { Component, OnInit } from '@angular/core';
import { User, UserPreferences } from '../../models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // Mock user data (will be replaced with API calls)
  public user: User = {
    id: 'user-1',
    email: 'investor@example.com',
    username: 'portfolioinvestor',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    address: '123 Wall Street',
    city: 'New York',
    country: 'United States',
    postalCode: '10005',
    about: 'Long-term value investor focused on technology and healthcare sectors.',
    avatarUrl: 'assets/img/theme/team-4-800x800.jpg',
    preferences: {
      defaultCurrency: 'USD',
      riskTolerance: 'moderate',
      notifications: {
        email: true,
        push: true,
        priceAlerts: true,
        newsAlerts: false
      },
      theme: 'light',
      language: 'en'
    }
  };

  // Form models
  public currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  public riskLevels = [
    { value: 'conservative', label: 'Conservative - Low risk, steady returns' },
    { value: 'moderate', label: 'Moderate - Balanced risk/reward' },
    { value: 'aggressive', label: 'Aggressive - High risk, high potential returns' }
  ];

  // Authentication info (for display purposes - managed by Authentik)
  public authInfo = {
    provider: 'Authentik',
    lastLogin: new Date('2024-11-03T10:30:00'),
    isConnected: true
  };

  // Portfolio summary stats (for display in profile card)
  public portfolioStats = {
    totalPositions: 7,
    totalValue: 125847.32,
    totalReturn: 25.84
  };

  constructor() { }

  ngOnInit() {
    // In production, load user data from API
  }

  saveProfile() {
    console.log('Saving profile:', this.user);
    // TODO: Implement API call to save user profile
    alert('Profile settings saved successfully!');
  }

  savePreferences() {
    console.log('Saving preferences:', this.user.preferences);
    // TODO: Implement API call to save preferences
    alert('Preferences saved successfully!');
  }

  disconnectAuth() {
    console.log('Disconnecting authentication...');
    // TODO: Implement Authentik disconnect logic
  }

}
