import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
        marginBottom: 20
    },
    pos: {
        marginBottom: 12,
    },
    display: {
        marginRight: 30
    }
});

export default function ProductPageList() {
    const classes = useStyles();
    const params = useParams();
    let page = params.page || 1;
    const [posts, setPosts] = useState([]);
    const [totalPosts, settotalPosts] = useState()
    const limit = 8;
    const location = useLocation();

    page = parseInt(page);

    const totalPages = Math.ceil(totalPosts / limit);

    useEffect(() => {
        const locationParams = new URLSearchParams(location.search);
        const q = locationParams.get('s');
        console.log(locationParams)

        axios.get('https://us-central1-js04-b4877.cloudfunctions.net/api/products', {
            params: {
                _page: page,
                _limit: limit,
                q
            }
        }).then(response => {
            setPosts(response.data);
            settotalPosts(response.headers['x-total-count'])
        }).catch(error => {
            console.log(error);
        })
    }, [page, location.search])

    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    {
                        posts.map((item) => (

                            <Card key={item.id} className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} >
                                        {item.id + ' ' + item.title}
                                    </Typography>
                                    <Typography gutterBottom>
                                        <img src={item.image} alt={item.title}></img>
                                    </Typography>
                                    <Typography component="h2" color="textSecondary">
                                        Item Description: <br></br>{item.description.split(' ').splice(0, 40).join(' ') + '...'}
                                    </Typography>
                                    <Typography className={classes.pos}>
                                        Price: {item.price}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        Product Seller: {item.seller}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        component={Link}
                                        to={'/ExactProduct/show/' + item.id}
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                    }

                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={'/ProductPageList/' + (page - 1)}
                        className={classes.display}
                        disabled={page <= 1}
                    >
                        Prev Page
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={'/ProductPageList/' + (page + 1)}
                        disabled={page >= totalPages}
                    >
                        next page
                    </Button>

                </Grid>

            </Grid>
        </Container>
    )
} 