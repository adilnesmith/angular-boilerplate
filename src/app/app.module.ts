import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common//footer/footer.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { Page1Component } from './components/page1/page1.component';
import { Page2Component } from './components/page2/page2.component';
import { HousingLocationComponent } from './components/housing-location/housing-location.component';
import { SearchComponent } from './components/ui/search/search.component';
import { PaginationService } from './services/pagination.service';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LocalStorageService } from './services/localStorage.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainBodyComponent,
    ProfileComponent,
    HomeComponent,
    Page1Component,
    Page2Component,
    HousingLocationComponent,
    SearchComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [PaginationService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }