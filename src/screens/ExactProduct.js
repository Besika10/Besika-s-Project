import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 30
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    display: {
        marginRight: 30
    },
    background: {
        backgroundColor: '#2c387e',
        color: 'white',
        marginBottom: 20
    }
});

export default function ExactProduct() {

    const params = useParams();
    const [exactPosts, setExactPosts] = useState({});
    const [review, setReview] = useState([]);

    useEffect(() => {
        axios.get('https://us-central1-js04-b4877.cloudfunctions.net/api/products/' + params.id)
            .then(response => {
                setExactPosts(response.data);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        axios.get(`https://us-central1-js04-b4877.cloudfunctions.net/api/products/${params.id}/reviews`)
            .then(response => {
                setReview(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    const classes = useStyles();
    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12} direction="row" >
                    <Card key={exactPosts.id} className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="bold" gutterBottom>
                                {exactPosts.id + ' ' + exactPosts.title}
                            </Typography>
                            <Typography gutterBottom>
                                <img src={exactPosts.image} alt={exactPosts.title}></img>
                            </Typography>
                            <Typography component="h2" color="textSecondary">
                                Item Description: <br></br>{exactPosts.description}
                            </Typography>
                            <Typography className={classes.pos} color="black">
                                Price: {exactPosts.price}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Product Seller: {exactPosts.seller}
                            </Typography>
                            <Typography variant="body2" component="p">
                                item review: <br></br>
                                {
                                    review.map(item => (
                                        <Card key={item.id} className={classes.root, classes.background} >
                                            <Typography variant='body2' component="p">
                                                {item.body}
                                            </Typography>
                                        </Card>
                                    ))
                                }
                            </Typography>

                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
            <Grid container spacing={3} >
                <Grid item xs={12} direction="row" >

                </Grid>
            </Grid>
        </Container>
    )

}