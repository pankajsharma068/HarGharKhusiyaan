import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  // Form data
  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  // UI states
  isSubmitting = false;
  showSuccessModal = false;
  showErrorModal = false;
  errorMessage = '';

  // Contact information
  contactInfo = {
    address: 'Ward No-20 Buchar Gali, Mahabir Chowk Upper Bazar, Ranchi, Jharkhand',
    phone: '+91 9334011565',
    email: 'hargharkhushiyan@gmail.com',
    whatsapp: '919334011565',
    workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM'
  };

  // Quick contact reasons
  contactReasons = [
    { icon: '🤝', title: 'Volunteer', description: 'Join our team of changemakers' },
    { icon: '💰', title: 'Donate', description: 'Support our mission financially' },
    { icon: '🤔', title: 'Partner', description: 'Collaborate with us' },
    { icon: '❓', title: 'General Inquiry', description: 'Ask us anything' }
  ];

  // Social media
  socialMedia = [
    { name: 'Facebook', url: 'https://www.facebook.com/share/18eucdWkE4/', icon: '📘' },
    { name: 'Instagram', url: 'https://www.instagram.com/har_ghar_khushiyan?igsh=MTZ3NWZqNG0xZWtiZA==', icon: '📷' },
    { name: 'WhatsApp', url: 'https://wa.me/919334011565', icon: '💬' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xqalqjed', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        this.showSuccessModal = true;
        this.resetForm();
        form.reset();
      } else {
        const err = await res.json();
        console.error(err);
        this.errorMessage = 'Failed to send message. Please try again.';
        this.showErrorModal = true;
      }
    } catch (e) {
      console.error(e);
      this.errorMessage = 'Network error. Please check your connection and try again.';
      this.showErrorModal = true;
    } finally {
      this.isSubmitting = false;
    }
  }

  validateForm(): boolean {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.errorMessage = 'Please fill in all required fields.';
      this.showErrorModal = true;
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      this.showErrorModal = true;
      return false;
    }

    return true;
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }

  closeModal() {
    this.showSuccessModal = false;
    this.showErrorModal = false;
  }

  selectReason(reason: string) {
    this.formData.subject = reason;
  }

  openWhatsApp() {
    if (isPlatformBrowser(this.platformId)) {
      window.open(`https://wa.me/${this.contactInfo.whatsapp}`, '_blank');
    }
  }

  callPhone() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = `tel:${this.contactInfo.phone}`;
    }
  }

  sendEmail() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = `mailto:${this.contactInfo.email}`;
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