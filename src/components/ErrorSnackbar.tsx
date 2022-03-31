import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NullableType, setErrorAC} from "../reducer/app-reducer";
import {AppRootStateType} from "../store";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar() {


	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(setErrorAC(null));
	};
	const error = useSelector<AppRootStateType, NullableType<string>>(state => state.app.error)
	const dispatch = useDispatch()

	const isOpen = error!==null
	return (
		<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error">
				{error}
			</Alert>
		</Snackbar>


	);
}