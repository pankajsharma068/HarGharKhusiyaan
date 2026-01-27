import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { NgFor, CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  autoPlayInterval: any;
  showFAB = false;
  newsletterEmail = '';
  
  images = [
    { 
      src: '/assets/front_img.jpeg', 
      caption: 'Spreading Happiness in Every Home',
      subtitle: 'Join us in making a difference'
    },
    { 
      src: '/assets/front_img2.jpeg', 
      caption: 'Empowering Communities Together',
      subtitle: 'Your support changes lives'
    },
    { 
      src: 'https://y4d.ngo/admin/uploads/banner/Landing_banner4.jpg', 
      caption: 'Building a Better Tomorrow',
      subtitle: 'Every contribution matters'
    }
  ];

  // Impact Stats with animation
  impactStats = [
    { icon: '❤️', count: 0, target: 1000, suffix: '+', label: 'Lives Touched' },
    { icon: '🤝', count: 0, target: 100, suffix: '+', label: 'Volunteers' },
    { icon: '🏘️', count: 0, target: 10, suffix: '+', label: 'Communities Served' },
    { icon: '🎯', count: 0, target: 10, suffix: '+', label: 'Projects Completed' }
  ];

  // Progress Goals
  progressGoals = [
    { title: 'Education Fund', current: 1000, target: 10000, icon: '📚' },
    { title: 'Healthcare Initiative', current: 10000, target: 80000, icon: '🏥' },
    { title: 'Community Help', current: 10000, target: 150000, icon: '🏠' }
  ];

  // Testimonials
  testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Beneficiary',
      image: '/assets/testimonial1.jpg',
      text: 'Har Ghar Khushiyan changed my family\'s life. Their education program helped my children continue their studies.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Volunteer',
      image: '/assets/testimonial2.jpg',
      text: 'Volunteering with this organization has been the most fulfilling experience. Making real change in communities.',
      rating: 5
    },
    {
      name: 'Amit Verma',
      role: 'Community Leader',
      image: '/assets/testimonial3.jpg',
      text: 'The healthcare initiatives brought much-needed support to our village. Grateful for their dedication.',
      rating: 5
    }
  ];

  currentTestimonial = 0;

  // Partners
  partners = [
    { name: 'Partner 1', logo: '/assets/partner1.png' },
    { name: 'Partner 2', logo: '/assets/partner2.png' },
    { name: 'Partner 3', logo: '/assets/partner3.png' },
    { name: 'Partner 4', logo: '/assets/partner4.png' }
  ];

  focusAreas = [
    {
      image: '/assets/education_img.jpeg',
      title: 'Education for All',
      description: 'To promote Art, Education, Science and Research, Charity, Commerce, Women and Child Development, Sports, Social Welfare, Religion and Animal Care and To protect Environment, Forests, and Nature.',
      icon: '📚'
    },
    {
      image: 'https://y4d.ngo/admin/uploads/widgets/Child_Upliftment_150x150px.png',
      title: 'Healthcare Initiatives',
      description: 'To organize different community–based health care programmes in the backward villages with a view to bring a lasting improvement in the health, hygiene, sanitary condition, safe drinking water of the poor villagers.',
      icon: '🏥'
    },
    {
      image: '/assets/hgk_img.jpg',
      title: 'Community Development',
      description: 'To improve the environment and ecology in the rural area by taking up different protection programmes. Tree plantation and renewable energy will be emphasized upon to bring sustainable change.',
      icon: '🌱'
    }
  ];

  services = [
    {
      image: '/assets/develop_img.jpeg',
      title: 'Nourishing Lives: Feeding the Homeless with Dignity and Care',
      description: 'We believe that no one should go to bed hungry. Our initiative, "Nourishing Lives", focuses on providing nutritious meals to homeless individuals in urban and rural areas. Through community kitchens and partnerships with local volunteers, we serve warm meals daily, ensuring that everyone has access to food with dignity and respect. Join us in our mission to fight hunger and bring hope to those in need.'
    },
    {
      image: '/assets/hgk-food.jpeg',
      title: 'Essential Aid & Relief',
      description: 'From hygiene kits to educational supplies, we identify what people need the most in times of crisis and deliver it with empathy and efficiency.'
    },
    {
      image: '/assets/hgk_img.jpg',
      title: 'Community Development Success Stories',
      description: 'Discover the success stories of communities we have helped build and sustain.'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoPlay();
      this.animateStats();
      this.startTestimonialRotation();
      this.setupScrollAnimations();
    } else {
      this.impactStats.forEach(stat => {
        stat.count = stat.target;
      });
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showFAB = window.pageYOffset > 300;
    }
  }

  startAutoPlay() {
    if (isPlatformBrowser(this.platformId)) {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  animateStats() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.impactStats.forEach((stat) => {
      const duration = 2000;
      const steps = 50;
      const increment = stat.target / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        stat.count = Math.min(Math.floor(increment * currentStep), stat.target);
        
        if (currentStep >= steps) {
          clearInterval(timer);
          stat.count = stat.target;
        }
      }, stepDuration);
    });
  }

  startTestimonialRotation() {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.nextTestimonial();
      }, 6000);
    }
  }

  nextTestimonial() {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }

  getProgressPercentage(current: number, target: number): number {
    return Math.min((current / target) * 100, 100);
  }

  subscribeNewsletter() {
    if (this.newsletterEmail) {
      alert(`Thank you for subscribing! We'll send updates to ${this.newsletterEmail}`);
      this.newsletterEmail = '';
    }
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