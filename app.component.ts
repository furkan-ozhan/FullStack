import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateDialogComponent } from './update-dialog.component/update-dialog.component.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Injectable } from '@angular/core';
import { ThemeService } from './services/theme.services';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FullStack.UI';
  isDarkMode: boolean = false;
  

  constructor(public dialog: MatDialog,private translate: TranslateService, private snackBar: MatSnackBar, private themeService: ThemeService)
  { 
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    if(browserLang){
      this.translate.use(browserLang.match(/en|tr/) ? browserLang : 'en');
    }
    else{
      this.translate.use('en');
    }

    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('navbar')?.classList.remove('navbar-light');
        document.getElementById('navbar')?.classList.add('navbar-dark');
      } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('navbar')?.classList.remove('navbar-dark');
        document.getElementById('navbar')?.classList.add('navbar-light');
      }
    });


    }
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.themeService.toggleDarkMode(this.isDarkMode);
    }
  
    

  showMessage(message: string) {
    this.translate.get('CLOSE').subscribe((closeText: string) => {
      this.snackBar.open(message, closeText, {
        duration: 3000,
      });
    });
  }


  switchLanguage(language: string) {
    this.translate.use(language);
  }

  openUpdateDialog(person: any): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '250px',
      data: { ...person }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Güncelleme işlemini gerçekleştirin
        this.updateContact(result);
      }
    });
}
updateContact(contact: any) {
  // Güncelleme işlemini burada yapın
  // Örneğin, ContactsService.updateContact metodunu çağırabilirsiniz
  // Güncelleme başarılı olduktan sonra bildirim gösterin
  this.translate.get('CONTACT_UPDATED_SUCCESS').subscribe((res: string) => {
    this.snackBar.open(res, this.translate.instant('CLOSE'), {
      duration: 3000
    });
  });
}
getToggleButtonLabel() {
  return this.isDarkMode ? this.translate.instant('LIGHT_MODE') : this.translate.instant('DARK_MODE');
}

}