import React, {ReactElement, FC, useEffect, useState, useContext} from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    Typography, TextField, Button, Link, Alert

} from '@mui/material'
import * as userApi from "../../api/modules/users"
import {IUser} from "../../interface/users";
import { useParams} from "react-router-dom";
import {AppStoreContext} from "../../App";
import UsrStore from "./UsrStore";
import {observer} from "mobx-react-lite";


const User: FC<any> = (): ReactElement => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { id } = useParams();
    const appStore = useContext(AppStoreContext);
    const store = new UsrStore(appStore.userStore);
    function alertUpdate( ){
        if(!!appStore.userStore.updatedAt)
            return (<Typography> User is updated at: ${appStore.userStore.updatedAt}</Typography>
            )
        return ( <Typography> User is not updated!</Typography>)
    }
    useEffect(() => {
        if (id) {
            const getUser = async () => {
                try {
                    setIsLoading(true)
                    const res = await userApi.getById(id)
                    setUser(res.data)
                } catch (e) {
                    if (e instanceof Error) {
                        console.error(e.message)
                    }
                }
                setIsLoading(false)
            }
            getUser()
        }
    }, [id])

    return (
        <Container>
            <Grid container spacing={4} justifyContent="center" m={4}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Card sx={{ maxWidth: 250 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={user?.avatar}
                                alt={user?.email}
                            />
                            <CardContent>
                                <Typography noWrap gutterBottom variant="h6" component="div">
                                    <Link type="mailto"> {user?.email}</Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user?.first_name} {user?.last_name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </>
                )}
            </Grid>

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Update User
                </Typography>
                <Box component="form"
                     onSubmit={async (event) =>
                     {
                         event.preventDefault()
                         await store.updating()
                     }}
                     noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        defaultValue = {user?.first_name}
                        onChange={(event) => store.changeName(event.target.value)}

                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="job"
                        label="Job"
                        type="job"
                        id="job"
                        onChange={(event) => store.changeJob(event.target.value)}
                        autoComplete="current-job"
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
                    {alertUpdate()}

                </Box>
            </Box>

        </Container>
    );
};

export default observer(User);