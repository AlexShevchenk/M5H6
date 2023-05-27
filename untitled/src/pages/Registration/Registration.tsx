import React, {useContext} from 'react'
import {Box, Button, CircularProgress, TextField, Typography} from '@mui/material'
import RegistrationStore from "./RegistrationStore";
import {AppStoreContext} from "../../App";
import {observer} from "mobx-react-lite";

const Registration = () => {
    const appStore = useContext(AppStoreContext);
    const store = new RegistrationStore(appStore.registerStore);
    if (!!appStore.registerStore.token){
        return(
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    User is registered in! || Token is: ${appStore.registerStore.token}
                </Typography>
            </Box>
        )
    }
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Registration
            </Typography>
            <Box component="form"
                 onSubmit={async (event) =>
                 {
                     event.preventDefault()
                     await store.registration()
                 }}
                 noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => store.changeEmail(event.target.value)}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(event) => store.changePassword(event.target.value)}
                    autoComplete="current-password"
                />
                {!!store.error && (
                    <p style={{ color: 'red', fontSize: 14 }}>{store.error}</p>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>

                    {store.isLoading ? (
                        <CircularProgress />
                    ) : (
                        'Submit'
                    )}
                </Button>
                {!!appStore.registerStore.token && (
                    <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{`Success! Token is: ${appStore.registerStore.token}`}</p>
                )}
                {!!appStore.registerStore.error && (
                    <p className="mt-3 mb-3" style={{ color: 'red', fontSize: 14, fontWeight: 700 }}>{`Error!  ${appStore.registerStore.error}`}</p>
                )}
            </Box>
        </Box>
    )
}

export default observer(Registration)