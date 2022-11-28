import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaravelserviceService } from '../laravelservice.service';
import { MicoService } from '../mico.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-detailproduit',
  templateUrl: './detailproduit.component.html',
  styleUrls: ['./detailproduit.component.css']
})
export class DetailproduitComponent implements OnInit {

  constructor(private httpService: MicoService, private laravelService: LaravelserviceService, private route: ActivatedRoute) { }

  id = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.detailProduit(this.id);
  }

  ficheProduit: any;

  detailProduit(id: any){
    this.laravelService.getDetailProduit(id).subscribe(
      (data: any) => {
        console.log(data);
        this.ficheProduit = data;
      }
    )
  }

  valideeNotificationDetail(id: any, email: any){
    this.laravelService.validerCommandeProduit(id, email).subscribe(
      (data: any) => {
        console.log(data);
        window.location.href ="notification";
      }
    )
  }

}
