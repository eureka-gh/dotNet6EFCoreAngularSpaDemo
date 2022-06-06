import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// external components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//
// clientApp's core services & components
//
import { LoadingScreenService } from './core/services/loading-screen.service';
import { LoadingScreenComponent } from './core/components/loading-screen/loading-screen.component';
import { InformationBoxService } from './core/services/information-box.service';
import { InformationBoxComponent } from './core/components/information-box/information-box.component';

//
// clientApp's internal services & components
//
import { ApiClientV1 } from './app.api.service.client';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DbDemoComponent } from './db-demo/db-demo.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

@NgModule({
  declarations: [
    LoadingScreenComponent,
    InformationBoxComponent,
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DbDemoComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'db-demo', component: DbDemoComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    LoadingScreenService,
    InformationBoxService,
    ApiClientV1
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
