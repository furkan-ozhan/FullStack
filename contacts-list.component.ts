import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { CommonModule } from '@angular/common'; 
import { error } from 'console';
import { response } from 'express';
import { HttpClientModule } from '@angular/common/http';
import { ContactsService } from '../../../services/contacts.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.services';


@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule,RouterModule,TranslateModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.css'
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[]=[];
  isDarkMode: boolean = false;
  constructor(private contactsService: ContactsService, private themeService:ThemeService){ }

  

  ngOnInit(): void {
  this.contactsService.getAllContacts().subscribe({
    next: (contacts: any)=>{
      this.contacts=contacts;
    },
    error: (response: any)=>{
      console.log(response);
    }
  })
  this.themeService.darkMode$.subscribe((isDarkMode) => {
    this.isDarkMode = isDarkMode;
  });
}
}
