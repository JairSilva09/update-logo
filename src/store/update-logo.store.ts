import { signalStore,
         withState,
         patchState,
         withMethods,
         withComputed,
         withHooks
         } from '@ngrx/signals';
import { AppState, Slide } from '../models';
import { withStorageSync } from './storage-ai-sync';

const initialState: AppState = {
  slidesData: [],
  projectName: null,
  projectId: null,
}

export const UpdateLogoStore = signalStore(
  { providedIn: 'root' },
  withStorageSync({
    key: 'updateLogo'
  }),
  withState(initialState),
  withMethods((store) => ({
    clearStore(){
      patchState(store, initialState);
    },
    updateSlidesData(slides: Slide[]): void {
      patchState(store, {slidesData: slides});
    },
    updateProjectName(name: string): void {
      patchState(store, {projectName: name});
    },
    updateProjectId(id: string): void {
      patchState(store, {projectId: id});
    },
    updateSlideLogoUrl(presentationIndex: number | string, newLogoUrl: string): void {
      const currentSlides = store.slidesData();
      if (!currentSlides || currentSlides.length === 0) return;
    
      const updatedSlides: Slide[] = currentSlides.map((slide: Slide, index) =>
        (typeof presentationIndex === 'string' && slide.SlideDescription === presentationIndex) ||
        (typeof presentationIndex === 'number' && index === presentationIndex)
          ? { ...slide, logoUrl: newLogoUrl }
          : slide
      );
    
      patchState(store, { slidesData: updatedSlides });
    },  
  })),
  withHooks({
    onInit(store) {
      // store.readFromStorage();
      // store.UpdateThemeStyles();
      // effect(() => {
      //   store.writeToStorage();
      // });
    }
  })
);
