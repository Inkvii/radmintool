import {PaletteColorOptions, unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core'
import {blue, cyan, deepPurple, red} from "@material-ui/core/colors"
import {PaletteColor} from "@material-ui/core/styles/createPalette"

// Adding new "root" variables can be done in these interfaces
declare module "@material-ui/core/styles/createMuiTheme" {
	interface Theme {
		lubosExperimental: {
			color: string
		}
	}

	interface ThemeOptions {
		lubosExperimental?: {
			color: string

		}
	}
}
// Defining custom palette colors must be done on two places - by extending the interface
declare module "@material-ui/core/styles/createPalette" {
	interface PaletteOptions {
		tertiary?: PaletteColorOptions,
		quartiery?: PaletteColorOptions
	}

	interface Palette {
		tertiary: PaletteColor,
		quartiery: PaletteColorOptions

	}
}

/**
 * Example of extended theme
 */
const commonTheme = createMuiTheme({
	palette: {
		primary: {
			main: blue[700],
		},
		secondary: {
			main: blue[300]
		},
		tertiary: {
			main: deepPurple[800]
		},
		error: {
			main: red["700"]
		},
		contrastThreshold: 3,
		tonalOffset: 0.2
	},
	lubosExperimental: {
		color: cyan[100]
	},
})

/**
 * Example of editing InputProps of the Material UI components. In this case we want every button to be "contained" with primary color
 * as default.
 * The following two buttons will be equal if light theme is used:
 *    <Button variant="contained" color="primary">my button</Button>
 *    <Button>my button</Button>
 *
 */
const lightTheme = createMuiTheme({
	props: {
		MuiButton: {
			variant: "contained",
			color: "primary",
		}
	}
}, commonTheme)

export default lightTheme
