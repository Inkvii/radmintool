import styled from "styled-components"
import {TextField} from "@material-ui/core"

export const StyledTextField = styled(TextField)`
	.MuiInput-root {
		padding-left: 10px;

	}
	.MuiInputBase-input {
		color: white;
	}

	.MuiOutlinedInput-root {
		background-color:  rgb(164,12,219);
    fieldset {
      border: none;
    }
  }

` as typeof TextField
