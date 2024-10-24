import {Component, inject, OnInit, output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {debounceTime, map, startWith, tap} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UpdateLogoStore } from '../../../store/update-logo.store';
import { UpdateLogoService } from '../../services/update-logo..service';
import { Slide } from '../../../models';

const PROJECTS = ['project 1','project 2','project 3','TEST_BI_ANCO','project 5','project 6','Test_WELL_PLATFORM','project 8','project 9','project 10']


@Component({
  selector: 'search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  readonly updateLogoStore = inject(UpdateLogoStore)
  readonly updateLogoService = inject(UpdateLogoService)
  myControl = new FormControl('');
  options: string[] = PROJECTS;
  filteredOptions: Observable<string[]> = of([]);
  projectChange = output<string>(); 

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(300),  
      startWith(''),
      tap(selected => {
        if(typeof selected === 'string' && selected !== ''){
          this.updateLogoStore.updateProjectName(selected);
          // debounceTime(200)
          // this.initializeProject()
        }else{
          this.updateLogoStore.updateProjectName('Test_WELL_PLATFORM');          
        }
        this.setProject('')
      }),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();    
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  setProject(name:string) { 
    this.projectChange.emit(name); 
  }

}
