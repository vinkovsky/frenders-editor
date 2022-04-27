import { addDecorator } from '@storybook/react'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'

import ThemeProvider, {themes} from '../store/providers/ThemeProvider'

addDecorator(withThemesProvider(themes, ThemeProvider))

export const parameters = {
  options: {
    storySort: (a, b) => {
      if (b[1].kind === 'Welcome') {
        return 1
      }
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true })
    },
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
}
