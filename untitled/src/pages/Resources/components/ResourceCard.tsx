import {Card, CardActionArea, CardContent, Typography} from "@mui/material"
import {FC, ReactElement} from "react";
import {IResource} from "../../../interface/resources";
import {useNavigate} from "react-router-dom";

const ResourceCard: FC<IResource> = (props): ReactElement => {

    const navigate = useNavigate()

    return (
        <Card sx={{ maxWidth: 250, backgroundColor: props.color }}>
            <CardActionArea onClick={() => navigate(`/resource/${props.id}`)}>

                <CardContent>
                    <Typography noWrap gutterBottom variant="h6" component="div" align="center">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {props?.year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {props?.pantone_value}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ResourceCard