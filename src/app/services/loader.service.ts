import { inject, Injectable } from '@angular/core';
import { UpdateLogoStore } from '../../store/update-logo.store';

@Injectable({
    providedIn: 'root',
})

export class LoaderService {
    readonly updateLogoStore = inject(UpdateLogoStore);
    private loading = false;
  
    show() {
      this.updateLogoStore.updateIsLoading(true)
    }
  
    hide() {
        this.updateLogoStore.updateIsLoading(false)
    }

    isLoading(): boolean {
        return this.loading;
    }
}