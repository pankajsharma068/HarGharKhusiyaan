import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  position: string;
  imageUrl: string;
  bio?: string;
  email?: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.component.html',
  imports: [CommonModule],
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements AfterViewInit {
  flippedCards: { [key: string]: boolean } = {};

  ceo: TeamMember = {
    name: 'Shubham Sharma',
    position: 'CEO',
    imageUrl: '/assets/shub_new.jpeg',
    bio: 'Leading Har Ghar Khushiyan with vision and passion for social change.',
    email: 'shubham@hargharkhushiyan.co.in'
  };

  constructor() {
    console.log('=== TEAM COMPONENT DEBUG ===');
    console.log('Component loaded successfully');
    console.log('CEO data:', this.ceo);
    console.log('CEO image path:', this.ceo.imageUrl);
    console.log('Window location:', window.location.href);
    
    // Check if assets folder is accessible
    const testImg = new Image();
    testImg.onload = () => console.log('✅ Test image loaded successfully');
    testImg.onerror = () => console.error('❌ Test image failed to load');
    testImg.src = this.ceo.imageUrl;
  }

  ngAfterViewInit(): void {
    console.log('=== VIEW INITIALIZED ===');
    const ceoSection = document.querySelector('.ceo-section');
    const ceoCard = document.querySelector('.ceo-card');
    const ceoImage = document.querySelector('.ceo-card img');
    
    console.log('CEO Section exists:', !!ceoSection);
    console.log('CEO Card exists:', !!ceoCard);
    console.log('CEO Image exists:', !!ceoImage);
    
    if (ceoImage) {
      console.log('Image src:', (ceoImage as HTMLImageElement).src);
      console.log('Image complete:', (ceoImage as HTMLImageElement).complete);
      console.log('Image naturalWidth:', (ceoImage as HTMLImageElement).naturalWidth);
    }
  }

  onImageError(event: any): void {
    console.error('❌ IMAGE LOAD FAILED');
    console.error('Failed URL:', event.target.src);
    console.error('Full error:', event);
    
    // Try alternative paths
    const originalSrc = event.target.src;
    if (originalSrc.includes('/assets/')) {
      console.log('Trying without leading slash...');
      event.target.src = originalSrc.replace('/assets/', 'assets/');
    } else if (originalSrc.includes('assets/')) {
      console.log('Trying with ./assets/...');
      event.target.src = './' + originalSrc.split('assets/')[1];
    }
  }

  teamMembers: TeamMember[] = [
    {
      name: 'Pankaj Sharma',
      position: 'CTO',
      imageUrl: '/assets/pankaj.jpeg',
      bio: 'Driving technology innovation for social impact.',
      email: 'pankaj@hargharkhushiyan.co.in'
    },
    {
      name: 'Shivam Sharma',
      position: 'CMO',
      imageUrl: '/assets/shivam_sharma.jpeg',
      bio: 'Spreading our mission through creative marketing strategies.',
      email: 'shivam@hargharkhushiyan.co.in'
    }
  ];

  otherMembers: TeamMember[] = [
    {
      name: 'Jay Vasisht',
      position: 'Operation Head',
      imageUrl: '/assets/jai_vashist.jpeg',
      bio: 'Ensuring smooth operations across all initiatives.'
    },
    {
      name: 'Sanjay Sharma',
      position: 'Fundraising Manager',
      imageUrl: '/assets/sanjay_sharma.jpeg',
      bio: 'Building partnerships to fund our mission.'
    },
    {
      name: 'Chirag Sharma',
      position: 'Finance Officer',
      imageUrl: '/assets/chirag.jpeg',
      bio: 'Managing finances with transparency and integrity.'
    },
    {
      name: 'Shivam Singh',
      position: 'Project Coordinator',
      imageUrl: '/assets/shivam_singh.jpeg',
      bio: 'Coordinating impactful community projects.'
    },
    {
      name: 'Shivam Sharma',
      position: 'HR Generalist',
      imageUrl: '/assets/shiv_sh.jpeg',
      bio: 'Building a passionate team of changemakers.'
    },
    {
      name: 'Devesh Sharma',
      position: 'Finance Manager',
      imageUrl: '/assets/Devesh_sharma.jpeg',
      bio: 'Strategic financial planning for sustainable growth.'
    },
    {
      name: 'Gourav Sharma',
      position: 'Community Outreach Coordinator',
      imageUrl: '/assets/gaurav_sharma.jpeg',
      bio: 'Connecting with communities to create lasting change.'
    },
    {
      name: 'Vivek Sharma',
      position: 'Event Manager',
      imageUrl: '/assets/vivek_sharma.jpeg',
      bio: 'Creating memorable events that inspire action.'
    }
  ];

  toggleFlip(id: string): void {
    this.flippedCards[id] = !this.flippedCards[id];
  }

  isFlipped(id: string): boolean {
    return this.flippedCards[id] || false;
  }
}