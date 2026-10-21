import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './app/routes'

export const createRoot = ViteReactSSG({ routes })
