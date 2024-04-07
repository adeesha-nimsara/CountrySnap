import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from 'src/app/services/country/country.service';
import { Observable } from 'rxjs';
import { createClient } from 'pexels';
import { IonRow, IonCol, IonCard, IonCardTitle, IonCardHeader, IonGrid, IonSearchbar, IonText, IonHeader, IonContent, IonTitle, IonToolbar, IonCardContent, IonCardSubtitle, IonButtons, IonBackButton, IonProgressBar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [HttpClientModule, IonRow, IonCol, IonCard, IonCardTitle, IonCardHeader, IonGrid, IonText, IonHeader, IonContent, IonTitle, IonSearchbar, IonToolbar, IonCardContent, IonCardSubtitle, IonButtons, IonBackButton, IonProgressBar, CommonModule]
})

export class DetailsComponent implements OnInit {
  @Input() id: String = '';
  singleCountry: any[] = [];
  pexelPhoto: any[] = [];
  loaded = false;

  constructor(private countryService: CountryService) {

  }

  ngOnInit(): void {
    console.log(this.id + 'oninit');
    this.getCountryDetailById(this.id);
  }

  getCountryDetailById(id: any): void {
    this.countryService.getCountryById(id).subscribe(
      (country: any) => {
        console.log(country); // Handle the country detail response as needed
        this.singleCountry = country;
        const client = createClient('kPAzH9isE2w2wrfLjpEHG2fpkJkRXPlLtTnxxCliTEIZu5FdEpev9iql');
        const query = country[0]?.name.common;
        client.photos.search({ query, per_page: 1 }).then((photos: any) => {
          this.pexelPhoto = photos.photos;
          console.log(photos.photos);
          this.loaded = true;
        });
        console.log(query)
      },
      (error) => {
        console.error('Error fetching country detail:', error);
      }
    );
  }

}
