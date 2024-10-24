import { Component, inject } from '@angular/core';
import { UpdateLogoStore } from '../../../store/update-logo.store';
import { LoaderService } from '../../services/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [MatProgressSpinnerModule,CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  readonly loaderService = inject(LoaderService);
  readonly updateLogoStore = inject(UpdateLogoStore);
}
