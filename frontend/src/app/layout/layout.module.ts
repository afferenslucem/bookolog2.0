import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TuiSheetDialogModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TitleComponent } from './components/title/title.component';


@NgModule({
    declarations: [PageLayoutComponent, TitleComponent, SidebarComponent],
    imports: [
        RouterOutlet,
        RouterLink,
        CommonModule,
        TuiButtonModule,
        TuiActiveZoneModule,
        TuiSheetDialogModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
    ],
})
export class LayoutModule {
}
