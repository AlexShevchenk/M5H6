import React, {useContext} from 'react'
import {Box, Button, CircularProgress, TextField, Typography} from '@mui/material'
import LoginStore from "./LoginStore";
import {AppStoreContext} from "../../App";
import {observer} from "mobx-react-lite";

const Login = () => {
    const appStore = useContext(AppStoreContext);
    const store = new LoginStore(appStore.authStore);
    if (!!appStore.authStore.token){
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
                    User is signed in! || Token is: ${appStore.authStore.token}
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
                Sign in
            </Typography>
            <Box component="form"
                 onSubmit={async (event) =>
                 {
                     event.preventDefault()
                     await store.login()
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
                    sx={{ mt: 3, mb: 2 }}
                >
                    {store.isLoading ? (
                        <CircularProgress />
                    ) : (
                        'Submit'
                    )}
                </Button>
                {!!appStore.authStore.error && (
                    <p className="mt-3 mb-3" style={{ color: 'red', fontSize: 14, fontWeight: 700 }}>{`Error! ${appStore.authStore.error}`}</p>
                )}
            </Box>
        </Box>
    )
}

export default observer(Login)