import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { DataserviceService} from '../app/services/dataservice.service';

import { ZXingScannerModule } from './modules/zxing-scanner/zxing-scanner.module';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ZXingScannerModule.forRoot(),
        HttpClientModule,
    ],
    declarations: [AppComponent],
    providers:[
        DataserviceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
