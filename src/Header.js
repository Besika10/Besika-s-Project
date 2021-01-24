import { Button, fade, InputBase, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },

    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(0.5)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    color: {
        color: '#33eaff'
    }
}));


export default function Header() {
    let history = useHistory()
    const [search, setSearch] = useState()
    const classes = useStyles();

    function submitSearch(event) {
        event.preventDefault();
        history.push('/Home?s=' + search)
    }
    return (
        <nav>
            <div className="div">
                <div>
                    <Link to="/" className="style">Home</Link>
                </div>
                <div>
                    <Link to="/ProductPageList" className="style">Product Page List</Link>
                </div>

                <form onSubmit={submitSearch} className="div">
                    <div className="search">
                        <div className={classes.search}>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </div>
                    <Button
                        className={classes.color}
                        type="submit"
                    >Search
                </Button>
                </form>
            </div>
        </nav >
    )
}