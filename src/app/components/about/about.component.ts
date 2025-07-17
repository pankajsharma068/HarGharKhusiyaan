import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  // founders = [
  //   { name: 'Shubham Sharma', image: 'assets/founders/shubham.jpg' },
  //   { name: 'Pankaj Sharma', image: 'assets/founders/pankaj.jpg' },
  //   { name: 'Shivam Sharma', image: 'assets/founders/shivam.jpg' }
  // ];
}
