import {Slide} from './silde.model'

export interface AppState {
    slidesData: Slide[] | null,
    projectName: string | null,
    projectId: string | null,
}