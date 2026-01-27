import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

interface NavLink {
  name: string;
  path: string;
  isPrimary?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  isScrolled = false;

  readonly navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Team', path: '/team' },
    { name: 'Donate', path: '/donate', isPrimary: true },
  ];

  constructor(private router?: Router) {}

  ngOnInit(): void {
    // Auto-close menu when route changes
    if (this.router) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.menuOpen = false;
      });
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }

  // Add sticky navbar effect on scroll
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 20;
  }

  // Close menu with Escape key
  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }
}