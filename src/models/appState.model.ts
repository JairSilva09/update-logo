import {Slide} from './silde.model'

export interface AppState {
    slidesData: Slide[] | [],
    projectName: string | null,
    projectId: string | null,
}