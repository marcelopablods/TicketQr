import { Component, VERSION, OnInit, ViewChild } from '@angular/core';

import { ZXingScannerComponent } from './modules/zxing-scanner/zxing-scanner.module';
import { Observable } from "rxjs";
import { Result } from '@zxing/library';
import { DataserviceService} from '../app/services/dataservice.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    ngVersion = VERSION.full;

    @ViewChild('scanner')
    scanner: ZXingScannerComponent;

    hasDevices: boolean;
    hasPermission: boolean;
    qrResultString: string;
    qrResult: Result;
    dataRespuesta:any;
    estadoAbordar:boolean = false;

    availableDevices: MediaDeviceInfo[];
    currentDevice: MediaDeviceInfo;
    constructor(private service:DataserviceService){}
    ngOnInit(): void {

        // this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
        //     this.availableDevices = devices;

        //     // selects the devices's back camera by default
        //     for (const device of devices) {
        //         if (/back|rear|environment/gi.test(device.label)) {
        //             this.scanner.changeDevice(device);
        //             this.currentDevice = device;
        //             break;
        //         }
        //     }
        // });

        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => this.availableDevices = devices);
        this.scanner.hasDevices.subscribe((has: boolean) => this.hasDevices = has);
        this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
        this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);

        this.abordarPasajero();
    }

    displayCameras(cameras: MediaDeviceInfo[]) {
        console.debug('Devices: ', cameras);
        this.availableDevices = cameras;
    }

    handleQrCodeResult(resultString: any) {
        //let idVentaRegularPasajero
        this.qrResultString = resultString;
        console.log('Resultado Qr: '+ this.qrResultString);
        this.service.getInfoPasajero(this.qrResultString, 1 ).subscribe(data=>{
            this.dataRespuesta = data;
            console.log(this.dataRespuesta)
            console.log(this.dataRespuesta[0])
            console.log(this.dataRespuesta.mensaje)
            console.log(this.dataRespuesta[0].mensaje)
            if(this.dataRespuesta[0].mensaje == '0'){
                alert("Ticket ya ha sido Registrado");
            }if(this.dataRespuesta[0].mensaje == '1'){
                this.estadoAbordar = true;
            }

        })
    }

    onDeviceSelectChange(selectedValue: string) {
        console.debug('Selection changed: ', selectedValue);
        this.currentDevice = this.scanner.getDeviceById(selectedValue);
        console.log("Dispositivo seleccionado:" + this.currentDevice);
    }

    stateToEmoji(state: boolean): string {

        const states = {
            // not checked
            undefined: '❔',
            // failed to check
            null: '⭕',
            // success
            true: '✔',
            // can't touch that
            false: '❌'
        };

        return states['' + state];
    }
    abordarPasajero():void{
        console.log("aborda pasajero" + this.qrResultString)
        let resp = this.service.abordarPasajero('118','1')
        console.log("respuesta:" , resp);
    }
}
