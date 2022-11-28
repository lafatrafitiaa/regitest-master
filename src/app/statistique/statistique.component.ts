import { Component, OnInit } from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { LaravelserviceService } from '../laravelservice.service';
import { MicoService } from '../mico.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  constructor(private httpService: MicoService, private laravelService: LaravelserviceService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.createChart();
    this.getData();
    this.donnut();
  }

  public chart: any;
  dataStatistique: any;

  getData(){
    // this.httpService.getStatistique().subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.dataStatistique = data;
    //   }
    // )
    this.laravelService.statistiqueProduitprix().subscribe(
      (data: any) => {
        console.log(data);
        this.dataStatistique = data;
      }
    )
  }

  createChart(){
    this.laravelService.statistiqueProduitprix().subscribe(
      (valeur: any) => {
        const mydata = [];
        const produit = [];
        const prix = [];
        for (let i = 0; i < valeur.length; i++) {
          produit.push(valeur[i].designation);
          prix.push(valeur[i].prix);

      }
      this.chart = new Chart("MyChart", {

          type : 'bar',

          data: {
            labels: produit,
             datasets: [
              {
                label: "prix",
                data: prix,
                backgroundColor: 'blue'
              }
            ]
          },
          options: {
            aspectRatio:1.5
          }

        });
    })
  }


  donnut(){
      this.chart = new Chart("MyDonnut", {

          type : 'doughnut',

          data: {
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          }
        });
  }
}
