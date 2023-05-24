import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    HousingLocationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
