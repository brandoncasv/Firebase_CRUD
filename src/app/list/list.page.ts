import { Component, OnInit } from '@angular/core';
import { Contacto} from "../Interface/contacto";
import  { ContactsService } from "../Services/FireStore/contacts.service";
import { ActivatedRoute } from "@angular/router";
import { NavController, LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  contact: Contacto = {
    Nombre: '',
    Apellidos: '',
    Apodo: '',
    Circulo: '',
    Correo: '',
    Prefijo: '',
    id: '',
  };
  contact_Id = null;

  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private contacts_Service: ContactsService,
              private  loadingController: LoadingController) {}

  ngOnInit() {
    this.contact_Id = this.route.snapshot.params['id'];
    if(this.contact_Id) {
      this.load_Contact();
    }
  }

  async load_Contact() {
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    await loading.present();
    this.contacts_Service.get_Contact(this.contact_Id).subscribe(res => {
      loading.dismiss();
      this.contact = res;
    });
  }

  async save_Contact() {
    const loading = await this.loadingController.create({
      message: 'Guardando.....'
    });
    await loading.present();
    if(this.contact_Id) {
      //UPDATE
      this.contacts_Service.update_Contact(this.contact, this.contact_Id).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    } else {
      this.contacts_Service.add_Contact(this.contact).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  delete_Contact(contact_Id: string) {
    this.contacts_Service.delete_Contact(contact_Id);
  }

}
