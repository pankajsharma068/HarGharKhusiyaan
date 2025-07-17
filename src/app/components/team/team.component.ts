import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule, NgFor } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.component.html',
  imports:[ CommonModule],
  styleUrls: ['./team.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class TeamComponent {

  Ceo =[ {
    name: 'Shubham Sharma',
    position: 'CEO',
    imageUrl: 'assets/shubham.jpeg',
  }];

  teamMembers = [
    {
      name: 'Pankaj Sharma',
      position: 'CTO',
      imageUrl: 'assets/pankaj.jpeg',
    },
    {
      name: 'Shivam Sharma',
      position: 'CMO',
      imageUrl: 'assets/shivam_sharma.jpeg',
    }
  ];
  otherMembers = [
    {
      name: 'Jay Vasisht',
      position: 'Operation Head',
      imageUrl: 'assets/jai_vashist.jpeg',
    },
    {
      name: 'Sanjay Sharma',
      position: 'Fundraising Manager',
      imageUrl: 'assets/sanjay_sharma.jpeg',
    },
    {
      name: 'Chirag Sharma',
      position: 'Finance Officer',
      imageUrl: 'assets/chirag.jpeg',
    },
    {
      name: 'Shivam Singh',
      position: 'Project Coordinator',
      imageUrl: 'assets/shivam_singh.jpeg',
    }
  ];
}
