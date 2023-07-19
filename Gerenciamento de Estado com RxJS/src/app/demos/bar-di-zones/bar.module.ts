import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { BarComponent } from "./bar-di-zones.component";
import { BarServices } from "./bar.service";
import { BAR_UNIDADE_CONFIG, BarUnidadeConfig } from "./bar.config";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BarComponent
    ],
    exports: [
        BarComponent
    ]
})
export class BarModule { 
    static forRoot(config: BarUnidadeConfig) : ModuleWithProviders {
        return {
            ngModule: BarModule,
            providers: [
                { provide: 'ConfigManualUnidade' , useValue: config },
                { provide: BAR_UNIDADE_CONFIG , useValue: config }
            ]
        }
    }
}