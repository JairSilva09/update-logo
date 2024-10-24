import {Slide} from './silde.model'

export interface AppState {
    isLoading: boolean,
    slidesData: Slide[] | [],
    projectName: string | null,
    projectId: string | null,
}