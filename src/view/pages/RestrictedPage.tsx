import {Container, Typography} from "@material-ui/core"

export default function RestrictedPage() {
	return (
		<Container>
			<div>
				<Typography variant={"h3"} align={"center"}>
					This is super secret restricted page where plebs should not walk
				</Typography>
			</div>
		</Container>
	)
}
