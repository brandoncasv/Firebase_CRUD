import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
const { Camera } = Plugins;
import { ContactsService } from '../Services/FireStore/contacts.service';
import { Contacto } from '../Interface/contacto'
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  create_Form: FormGroup;
  contacts: Contacto[];

  constructor(
    private sanitizer: DomSanitizer,
    public builder: FormBuilder,
    private contactsService: ContactsService      
    ) {
     /*  this.create_Form = this.builder.group({
        nombre: ['', Validators.compose([Validators.maxLength(3),
          Validators.maxLength(40), Validators.required])],
        apellidos: ['', Validators.compose([Validators.minLength(4),
          Validators.maxLength(40)])],
        correo: ['', Validators.compose([Validators.email, Validators.required, 
          Validators.maxLength(3),Validators.maxLength(40)])],
        apodo: [''],
      }) */
    }

  show_Card() {
    alert('Working');
  }

  ngOnInit() {
    this.contactsService.get_Contacts().subscribe(res => {
      console.log('Contactos: ', res);
      this.contacts = res;
    });

  }

}
