import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  
  images: GalleryImage[] = [
    {
      id: 1,
      url: 'https://drive.google.com/thumbnail?id=1iLbIo7etwKFVqYIcq1OA0nK_A_dJJ4jG&sz=w1000',
      title: 'Community Event',
      category: 'events'
    },
    {
      id: 2,
      url: 'https://drive.google.com/thumbnail?id=1sLAxmfsnJG-Me_HYfOm3ESnrPNfMTFr-&sz=w1000',
      title: 'Community Program',
      category: 'community'
    },
    {
      id: 3,
      url: 'https://drive.google.com/thumbnail?id=1fnhLJMcKUZ2nGCEQJD7lue903cT4nGyM&sz=w1000',
      title: 'Community Outreach',
      category: 'community'
    },
    {
      id: 4,
      url: 'https://drive.google.com/thumbnail?id=1k7O_baoIm8TvjG0Cuvqn5yaDpApnLiiu&sz=w1000',
      title: 'Volunteer Activities',
      category: 'volunteers'
    },
    {
      id: 5,
      url: 'https://drive.google.com/thumbnail?id=1u7zo3OsBWuMWusni5XVmAq-IALNoAe9-&sz=w1000',
      title: 'Community Initiative',
      category: 'community'
    },
    {
      id: 6,
      url: 'https://drive.google.com/thumbnail?id=1nu5XzPX4Tk8ryBBK9VawEou86OocKH6k&sz=w1000',
      title: 'Social Programs',
      category: 'community'
    },
    {
      id: 7,
      url: 'https://drive.google.com/thumbnail?id=1TDo2xDxj9mo0wEZRe8uWsdtG2qFo-D2i&sz=w1000',
      title: 'Fundraising Event',
      category: 'events'
    },
    {
      id: 8,
      url: 'https://drive.google.com/thumbnail?id=1IDPJQK2YJASc8GPgSt_1REx0RZRyrAmb&sz=w1000',
      title: 'Community Support',
      category: 'community'
    },
    {
      id: 9,
      url: 'https://drive.google.com/thumbnail?id=1yYK_8xHHW8NgphwG6SGxgYPAWAtCEjBM&sz=w1000',
      title: 'Tree Plantation Drive',
      category: 'environment'
    },
    {
      id: 10,
      url: 'https://drive.google.com/thumbnail?id=1myHdXfHk2qOYi26dbo8sr3nDYxDzY6hN&sz=w1000',
      title: 'Green Initiative',
      category: 'environment'
    },
    {
      id: 11,
      url: 'https://drive.google.com/thumbnail?id=1JZ3wHbf3yt_9C_ty8nJTLJx43ZZMhVse&sz=w1000',
      title: 'Environmental Campaign',
      category: 'environment'
    }
  ];

  selectedImage: GalleryImage | null = null;
  selectedFilter: string = 'all';

  get categories(): string[] {
    const cats = new Set(this.images.map(img => img.category));
    return ['all', ...Array.from(cats)];
  }

  get filteredImages(): GalleryImage[] {
    if (this.selectedFilter === 'all') {
      return this.images;
    }
    return this.images.filter(img => img.category === this.selectedFilter);
  }

  openLightbox(image: GalleryImage): void {
    this.selectedImage = image;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }

  navigateImage(direction: 'prev' | 'next'): void {
    if (!this.selectedImage) return;
    
    const currentIndex = this.filteredImages.findIndex(
      img => img.id === this.selectedImage!.id
    );
    
    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : this.filteredImages.length - 1;
    } else {
      newIndex = currentIndex < this.filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    this.selectedImage = this.filteredImages[newIndex];
  }

  filterGallery(category: string): void {
    this.selectedFilter = category;
  }
}