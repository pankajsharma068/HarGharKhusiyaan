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
  
  successMessage = false;
  errorMessage = false; // Flag to show error message

  onSubmitform(){

    console.log('Form submitted successfully!');
    
    // contactForm.reset(); // Clear the form fields
      setTimeout(() => this.successMessage = false, 3000); // Hide after 3 seconds


  }
  onSubmit(contactForm: any) {
    const serviceID = 'service_qarp3aj'; // Replace with your EmailJS service ID
    const templateID = 'your_template_id'; // Replace with your EmailJS template ID
    const userID = 'Hargharkhushiyan'; // Replace with your EmailJS user ID

    const templateParams = {
      name: contactForm.value.name,
      email: contactForm.value.email,
      message: contactForm.value.message
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      this.successMessage = true; // Show success message
      contactForm.reset(); // Clear the form fields
      setTimeout(() => this.successMessage = false, 3000); // Hide after 3 seconds
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      alert('Failed to send your message. Please try again later.');
    });
  }

}
