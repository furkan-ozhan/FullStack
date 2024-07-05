import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../../services/contacts.service';
import { Contact } from '../../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [FormsModule,TranslateModule],
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactDetails:Contact={
    id:'',
    name:'',
    email:'',
    phone:0,
    city:''
    
  };
  errorMessage: string | null=null;
constructor(private route: ActivatedRoute, private contactService: ContactsService,
  private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar
) {
  
}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params)=>{
        const id= params.get('id');
        console.log('Retrieved id:', id);

        if(id){
          this.contactService.getContact(id)
          .subscribe({
            next:(response)=>{
              this.contactDetails=response;
            }
          });
        }
      }
    })
  }
  updateContact(){
    if(this.contactDetails.id)
      {
        this.contactService.updateContact(this.contactDetails.id,this.contactDetails)
        .subscribe({
          next:(response)=>{
            this.showMessage('Kişi başarıyla güncellendi.');
            this.router.navigate(['contacts']);
          }
        });
      }
  }
  deleteContact(){
    const id = this.contactDetails.id;

    if (id){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.contactService.deleteContact(id).subscribe({
            next:(response)=>{
              this.router.navigate(['contacts']);
              this.showMessage("Contact is deleted succesfully");
            }
          });
        }
    });
  }
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Kapat', {
      duration: 3000,
    });
  }
}
