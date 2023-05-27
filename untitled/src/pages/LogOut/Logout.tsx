import React, {useContext} from 'react'
import {Box, Button, CircularProgress, TextField, Typography} from '@mui/material'
import LoginStore from "../Login/LoginStore";
import {AppStoreContext} from "../../App";
import {observer} from "mobx-react-lite";
import RegistrationStore from '../Registration/RegistrationStore';
import { Navigate } from 'react-router-dom';
const Logout = () => {
    const appStore = useContext(AppStoreContext);
    const store = new LoginStore(appStore.authStore);
    const store2 = new RegistrationStore(appStore.registerStore)
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {!!appStore.authStore.token  && (
                <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{`You are logged in! Token is: ${appStore.authStore.token}`}</p>
            )}
            {!!appStore.registerStore.token  && (
                <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>{`You are registered! Token is: ${appStore.registerStore.token}`}</p>
            )}
            {!!appStore.authStore.token  && (
                <Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick = {async (event) =>
                        {
                            event.preventDefault()
                            await store.logout()
                        }}
                    >
                        {store.isLoading ? (
                            <CircularProgress />
                        ) : (
                            'LOGOUT'
                        )}

                    </Button>
                </Box>

            )}
            {!!appStore.registerStore.token&& (
                <Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick = {async (event) =>
                        {
                            event.preventDefault();
                            await store2.logout();
                        }}
                    >
                        {store.isLoading ? (
                            <CircularProgress />
                        ) : (
                            'LOGOUT'
                        )}

                    </Button>

                </Box>
            )}

        </Box>
    )
}

export default observer(Logout)