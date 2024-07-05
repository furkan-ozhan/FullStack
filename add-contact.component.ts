import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../../models/contact.model';
import { ContactsService } from '../../../services/contacts.service';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule,TranslateModule,MatSnackBarModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent implements OnInit{
  [x: string]: any;
  addContactRequest: Omit<Contact,'id'>={
    name:'',
    email:'',
    phone:0,
    city:''
  };
 constructor(private contactService:ContactsService,
  private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
 ){
  
  }
 
  ngOnInit(): void {
    
  }
  addContact(){
    this.contactService.addContact(this.addContactRequest)
    .subscribe({
      next:(contact)=>{
        console.log(contact);
        this.translate.get('CONTACT_ADDED_SUCCESS').subscribe((res: string) =>{
          this.snackBar.open('Contact added successfully!', 'Close', {
            duration: 3000
          });
        });
        
        this.router.navigate(['contacts']);
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 400) {
          console.error('Validation errors:', error.error.errors);
        }
    }
  });
}}
  
 
  

