import React, {ReactElement, FC, useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Typography
} from '@mui/material'
import * as resApi from "../../api/modules/resources"
import {IResource} from "../../interface/resources";
import {useParams} from "react-router-dom";

const Resource: FC<any> = (): ReactElement => {
    const [resources, setResource] = useState<IResource | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            const getResource = async () => {
                try {
                    setIsLoading(true)
                    const res = await resApi.getById(id)
                    setResource(res.data)
                } catch (e) {
                    if (e instanceof Error) {
                        console.error(e.message)
                    }
                }
                setIsLoading(false)
            }
            getResource()
        }
    }, [id])

    return (
        <Container>
            <Grid container spacing={4} justifyContent="center" m={4}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Card sx={{ maxWidth: 250, backgroundColor: resources?.color}}>

                            <CardContent>
                                <Typography noWrap gutterBottom variant="h6" component="div">
                                    {resources?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    {resources?.year}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    {resources?.pantone_value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </>
                )}
            </Grid>
        </Container>
    );

};

export default Resource;