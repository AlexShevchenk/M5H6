import React, {ReactElement, FC, useEffect} from "react";
import {Box, CircularProgress, Container, Grid, Pagination} from '@mui/material'
import ResourceStore from "./ResourceStore";
import ResourceCard from "./components";
import {observer} from "mobx-react-lite";

const store = new ResourceStore();

const Resources: FC<any> = (): ReactElement => {
    return (
        <Container>
            <Grid container spacing={4} justifyContent="center" my={4}>
                {store.isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {store.resources?.map((item) => (
                            <Grid key={item.id} item lg={2} md={3} xs={6}>
                                <ResourceCard {...item} />
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Pagination count={store.totalPages}
                            page={store.currentPage}
                            onChange={ async (event, page)=> await store.changePage(page)} />
            </Box>
        </Container>
    );

};

export default observer(Resources);