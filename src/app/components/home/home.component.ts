import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonSearchbar, IonText, IonGrid, IonCol, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSkeletonText, IonProgressBar } from '@ionic/angular/standalone';
import { debounceTime, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { CountryService } from 'src/app/services/country/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonProgressBar, IonSkeletonText, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonRow, IonCol, IonGrid, IonText, IonSearchbar, IonButtons, IonTitle, IonToolbar, IonHeader, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuButton, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
})
export class HomeComponent implements OnInit {
  allCountries: any[] = [];
  searchTerm$ = new Subject<string>();
  filteredCountries$: Observable<any[]>;
  loaded = false;

  constructor(private countryService: CountryService) {
    this.countryService.getAllCountries().subscribe(
      (countries: any[]) => {
        this.allCountries = countries;
        this.loaded = true
      }
    );

    this.filteredCountries$ = this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((term: string) => this.filterCountries(term)),
    );
  }

  ngOnInit() { }

  search(event: any): void {
    this.loaded = false
    const searchTerm = event.target.value;
    this.searchTerm$.next(searchTerm);
  }
  
  filterCountries(term: string): any[] {
    if (term === '') {
      this.loaded = true
      return this.allCountries; // Return all countries if search term is empty
    }
    return this.allCountries.filter(country =>
      country.name.common.toLowerCase().includes(term.toLowerCase()),
      this.loaded = true
    );
  }


}
