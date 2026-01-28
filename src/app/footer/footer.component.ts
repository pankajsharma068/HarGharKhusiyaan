import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  showBackToTop = false;
  newsletterEmail = '';

  quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ];

  importantLinks = [
    { name: 'Donate Now', path: '/donate' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Annual Reports', path: '/reports' }
  ];

  socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/share/18eucdWkE4/',
      icon: 'fab fa-facebook-f',
      color: '#1877f2'
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/har_ghar_khushiyan?igsh=MTZ3NWZqNG0xZWtiZA==',
      icon: 'fab fa-instagram',
      color: '#e4405f'
    },
    { 
      name: 'Twitter', 
      url: '#',
      icon: 'fab fa-twitter',
      color: '#1da1f2'
    },
    { 
      name: 'LinkedIn', 
      url: '#',
      icon: 'fab fa-linkedin-in',
      color: '#0077b5'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showBackToTop = window.pageYOffset > 300;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  subscribeNewsletter() {
    if (this.newsletterEmail) {
      alert(`Thank you for subscribing! We'll send updates to ${this.newsletterEmail}`);
      this.newsletterEmail = '';
    }
  }
}