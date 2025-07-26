import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { log } from 'node:console';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import emailjs from 'emailjs-com';




@Component({
  selector: 'app-contact',
  imports: [FormsModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xqalqjed', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        alert('Message sent!');
        form.reset();
      } else {
        const err = await res.json();
        console.error(err);
        alert('Failed to send.');
      }
    } catch (e) {
      console.error(e);
      alert('Network error.');
    }
  }
}