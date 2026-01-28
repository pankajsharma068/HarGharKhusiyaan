import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  
  // Impact Statistics
  stats = [
    { icon: '❤️', value: 0, target: 1000, suffix: '+', label: 'Lives Impacted' },
    { icon: '🏘️', value: 0, target: 10, suffix: '+', label: 'Communities Served' },
    { icon: '🎯', value: 0, target: 10, suffix: '+', label: 'Projects Completed' },
    { icon: '🤝', value: 0, target: 100, suffix: '+', label: 'Active Volunteers' }
  ];

  // Journey Timeline
  timeline = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Har Ghar Khushiyan was founded with a vision to spread happiness in every home.',
      icon: '🌱'
    },
    {
      year: '2021',
      title: 'First Community Project',
      description: 'Launched our first community development program serving 500+ families.',
      icon: '🏘️'
    },
    {
      year: '2022',
      title: 'Education Initiative',
      description: 'Started education programs providing free schooling to 200+ children.',
      icon: '📚'
    },
    {
      year: '2023',
      title: 'Healthcare Programs',
      description: 'Initiated healthcare camps serving 1000+ people in rural areas.',
      icon: '🏥'
    },
    {
      year: '2024',
      title: 'Expansion',
      description: 'Expanded operations to 50+ communities across Jharkhand.',
      icon: '🚀'
    }
  ];

  // Core Values
  values = [
    {
      icon: '💙',
      title: 'Compassion',
      description: 'We lead with empathy and care for every individual we serve.'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'Transparency and honesty guide all our actions and decisions.'
    },
    {
      icon: '✨',
      title: 'Excellence',
      description: 'We strive for the highest quality in every program we deliver.'
    },
    {
      icon: '🌍',
      title: 'Community',
      description: 'Building stronger communities through collective action and support.'
    }
  ];

  // What We Do
  initiatives = [
    {
      icon: '🍽️',
      title: 'Food Security',
      description: 'Providing nutritious meals to homeless and underprivileged families through community kitchens.',
      image: '/assets/food-security.jpg'
    },
    {
      icon: '📚',
      title: 'Education Programs',
      description: 'Free education, school supplies, and scholarships for children from low-income families.',
      image: '/assets/education.jpg'
    },
    {
      icon: '🏥',
      title: 'Healthcare Access',
      description: 'Medical camps, health checkups, and awareness programs in underserved areas.',
      image: '/assets/healthcare.jpg'
    },
    {
      icon: '👕',
      title: 'Essential Supplies',
      description: 'Distribution of clothing, blankets, and basic necessities to those in need.',
      image: '/assets/supplies.jpg'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateStats();
      this.setupScrollAnimations();
    } else {
      // Set final values for SSR
      this.stats.forEach(stat => {
        stat.value = stat.target;
      });
    }
  }

  animateStats() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.stats.forEach((stat) => {
      const duration = 2000;
      const steps = 50;
      const increment = stat.target / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        stat.value = Math.min(Math.floor(increment * currentStep), stat.target);
        
        if (currentStep >= steps) {
          clearInterval(timer);
          stat.value = stat.target;
        }
      }, stepDuration);
    });
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