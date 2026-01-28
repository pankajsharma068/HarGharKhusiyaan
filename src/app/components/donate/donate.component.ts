import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent implements OnInit {
  selectedAmount: number = 1000;
  customAmount: number | null = null;
  isRecurring: boolean = false;
  donationType: 'one-time' | 'monthly' | 'yearly' = 'one-time';
  
  // Predefined donation amounts
  donationOptions = [
    { 
      amount: 500, 
      label: '₹500',
      impact: 'Feed 5 families for a day',
      icon: '🍽️',
      badge: 'Bronze'
    },
    { 
      amount: 1000, 
      label: '₹1,000',
      impact: 'Educate 1 child for a month',
      icon: '📚',
      badge: 'Silver'
    },
    { 
      amount: 2500, 
      label: '₹2,500',
      impact: 'Provide medical support for 10 people',
      icon: '🏥',
      badge: 'Gold'
    },
    { 
      amount: 5000, 
      label: '₹5,000',
      impact: 'Support a community program',
      icon: '🏘️',
      badge: 'Platinum'
    }
  ];

  // Payment methods
  paymentMethods = [
    { name: 'UPI', icon: '📱', available: true, id: 'upi' },
    { name: 'QR Code', icon: '📲', available: true, id: 'qr' },
    { name: 'Bank Transfer', icon: '🏛️', available: true, id: 'bank' },
    { name: 'Cards', icon: '💳', available: false, id: 'cards' },
    { name: 'Net Banking', icon: '🏦', available: false, id: 'netbanking' }
  ];

  // Modal states
  showUpiModal = false;
  showQrModal = false;
  showBankModal = false;
  showThankYouModal = false;

  // UPI IDs
  upiIds = [
    { 
      name: 'HDFC Bank UPI', 
      id: 'samajikhargharkhusiyanwelfarefoundation@hdfcbank', 
      icon: '🏦',
      app: 'Any UPI App'
    }
  ];

  // Bank details
  bankDetails = {
    accountName: 'SAMAJIK HAR GHAR KHUSIYAN W FOUNDATION',
    accountNumber: '50200111895365',
    ifscCode: 'HDFC0005189',
    branch: 'UPPER BAZAR',
    bankName: 'HDFC Bank'
  };

  // Progress tracking
  fundraisingGoal = {
    current: 30000,
    target: 150000,
    donors: 50
  };

  // Recent donors (anonymized)
  recentDonors = [
    { name: 'Anonymous', amount: 5000, time: '2 hours ago' },
    { name: 'Priya S.', amount: 1000, time: '5 hours ago' },
    { name: 'Anonymous', amount: 2500, time: '1 day ago' }
  ];

  // FAQs
  faqs = [
    {
      question: 'Is my donation tax deductible?',
      answer: 'Yes! All donations are eligible for 50% tax exemption under Section 80G of the Income Tax Act.',
      expanded: false
    },
    {
      question: 'How will my donation be used?',
      answer: 'Your donation directly supports our programs in education, healthcare, and community development. 20% goes directly to programs, 15% to operational costs.',
      expanded: false
    },
    {
      question: 'Can I get a receipt?',
      answer: 'Yes! After making a donation, you will receive an email receipt with 80G certificate details.',
      expanded: false
    },
    {
      question: 'Is recurring donation available?',
      answer: 'Yes! You can set up monthly or yearly recurring donations to provide sustained support.',
      expanded: false
    }
  ];

  copiedField: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
    }
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  setCustomAmount() {
    if (this.customAmount && this.customAmount > 0) {
      this.selectedAmount = this.customAmount;
    }
  }

  getImpactMessage(): string {
    const amount = this.customAmount || this.selectedAmount;
    
    if (amount >= 5000) {
      return `Your donation of ₹${amount.toLocaleString()} will support multiple community programs and make a lasting impact!`;
    } else if (amount >= 2500) {
      return `₹${amount.toLocaleString()} can provide medical support for ${Math.floor(amount / 250)} people.`;
    } else if (amount >= 1000) {
      return `₹${amount.toLocaleString()} can educate ${Math.floor(amount / 1000)} child for a month.`;
    } else if (amount >= 500) {
      return `₹${amount.toLocaleString()} can feed ${Math.floor(amount / 100)} families for a day.`;
    } else {
      return `Every rupee counts! Your ₹${amount} will help us spread happiness.`;
    }
  }

  getProgressPercentage(): number {
    return Math.min((this.fundraisingGoal.current / this.fundraisingGoal.target) * 100, 100);
  }

  copyToClipboard(text: string, field: string) {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(text).then(() => {
        this.copiedField = field;
        setTimeout(() => {
          this.copiedField = '';
        }, 2000);
      });
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }

  proceedToDonate() {
    const amount = this.customAmount || this.selectedAmount;
    alert(`Please select a payment method to donate ₹${amount.toLocaleString()}`);
    // Scroll to payment methods section
    if (isPlatformBrowser(this.platformId)) {
      const paymentSection = document.querySelector('.payment-methods');
      paymentSection?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  selectPaymentMethod(methodId: string) {
    switch(methodId) {
      case 'upi':
        this.showUpiModal = true;
        break;
      case 'qr':
        this.showQrModal = true;
        break;
      case 'bank':
        this.showBankModal = true;
        break;
      case 'cards':
      case 'netbanking':
        alert('Online payment gateway coming soon! Please use UPI, QR Code, or Bank Transfer.');
        break;
    }
  }

  closeModal() {
    this.showUpiModal = false;
    this.showQrModal = false;
    this.showBankModal = false;
    this.showThankYouModal = false;
  }

  copyUpiId(upiId: string) {
    this.copyToClipboard(upiId, 'upi-' + upiId);
    setTimeout(() => {
      alert('UPI ID copied! Open your UPI app to complete payment.');
    }, 100);
  }

  donationCompleted() {
    this.closeModal();
    this.showThankYouModal = true;
  }

  setupScrollAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in-on-scroll');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }
}