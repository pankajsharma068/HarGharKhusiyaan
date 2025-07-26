import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  currentIndex = 0;
  images = [
    { src:'assets/front_img.jpeg', caption: 'Welcome to Har Ghar Khushiyan' },
    { src: 'assets/front_img2.jpeg', caption: 'Welcome to Har Ghar Khushiyan' },
    { src: 'https://y4d.ngo/admin/uploads/banner/Landing_banner4.jpg', caption: 'Welcome to Har Ghar Khushiyan' }
  ];

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }


}
