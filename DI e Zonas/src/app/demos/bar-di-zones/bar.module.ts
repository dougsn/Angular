import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BarComponent } from "./bar-di-zones.component";


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
export class BarModule { }