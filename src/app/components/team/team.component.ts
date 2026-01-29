import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  flippedCards: { [key: string]: boolean } = {};

  ceo: TeamMember = {
    name: 'Shubham Sharma',
    position: 'CEO',
    imageUrl: '/assets/shub_new.jpeg',
    bio: 'Leading Har Ghar Khushiyan with vision and passion for social change.',
    email: 'shubham@hargharkhushiyan.co.in'
  };

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
      name: 'Narayan Sharma',
      position: 'Fundraising Manager',
      imageUrl: '/assets/narayan_sharma.jpeg',
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

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Browser-only debug (safe)
    console.log('=== TEAM COMPONENT VIEW INITIALIZED ===');

    const ceoSection = document.querySelector('.ceo-section');
    const ceoCard = document.querySelector('.ceo-card');
    const ceoImage = document.querySelector('.ceo-card img');

    console.log('CEO Section exists:', !!ceoSection);
    console.log('CEO Card exists:', !!ceoCard);
    console.log('CEO Image exists:', !!ceoImage);

    if (ceoImage) {
      const img = ceoImage as HTMLImageElement;
      console.log('Image src:', img.src);
      console.log('Image complete:', img.complete);
      console.log('Image naturalWidth:', img.naturalWidth);
    }
  }

  onImageError(event: any): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const img = event?.target as HTMLImageElement;
    if (!img || !img.src) return;

    console.error('❌ IMAGE LOAD FAILED:', img.src);

    // Fallback asset path
    if (img.src.includes('/assets/')) {
      img.src = img.src.replace('/assets/', 'assets/');
    }
  }

  toggleFlip(id: string): void {
    this.flippedCards[id] = !this.flippedCards[id];
  }

  isFlipped(id: string): boolean {
    return !!this.flippedCards[id];
  }
}
