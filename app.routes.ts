import { Routes, RouterModule } from '@angular/router';
import { NgModule, TransferState } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsListComponent } from './components/contacts/contacts-list/contacts-list.component';
import { AddContactComponent } from './components/contacts/add-contact/add-contact.component';
import { EditContactComponent } from './components/contacts/edit-contact/edit-contact.component';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }


export const routes: Routes=[
    {
        path:'',
        component:ContactsListComponent
    },
    {
        path:'contacts',
        component:ContactsListComponent 
    },
    {
        path:'contacts/add',
        component:AddContactComponent
    },
    {
        path:'contacts/edit/:id',
        component:EditContactComponent
    }
];
@NgModule(
{
    imports:[RouterModule.forRoot(routes),TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })],
    exports:[RouterModule,TranslateModule]
}
)

export class AppRoutingModule{}
