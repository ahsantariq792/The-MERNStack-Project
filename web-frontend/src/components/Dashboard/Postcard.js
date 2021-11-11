// import React from 'react';
// import ReactDOM from 'react-dom';
// import '../../index.css';
// import Avatar from '@mui/material/Avatar';
// import { red } from '@mui/material/colors';

// function Postcard(props) {

//     return (

//         <>
//             <div className="postcard">

//                 {/* <img alt={props.name}
//                     src={props.profile}
//                     className="profile" align="left" /> */}
//                 <span>
//                     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                         {/* {name[0]} */} "At"
//                     </Avatar>
//                 </span>

//                 <span className="name" > {props.name} </span>
//                 <br />

//                 <span className="date" > {props.date} </span>
//                 <p className="text" > {props.post} </p>


//                 <p className="buttonbox">
//                     <button className="btn1">Like</button>
//                     <button className="btn2">Comments</button>
//                     <button className="btn3">Shares</button>
//                 </p>
//             </div>
//         </>
//     )
// }

// export default Postcard;

// {/* <div className="main">
//     <Post name={posts?.name}
//         // profile={pro1}
//         date="2 months ago"
//         text={posts?.post}
//     />
// </div> */}


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import '../../App.css'

import ModeCommentIcon from '@mui/icons-material/ModeComment';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostCard(props) {
    const { post, email, name, time } = props;
    const [expanded, setExpanded] = React.useState(false);


    return (
        <div className="postcard">
            <Card sx={{ maxWidth: 800 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {name[0]}
                        </Avatar>
                    }

                    // action={
                    //     <IconButton aria-label="settings">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }


                    id="post-name"
                    title={name}
                    subheader={time}

                />
                <hr style={{width:"100%"}}/>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" id="post-item">
                        
                        {post}
                    </Typography>
                </CardContent>




                <CardActions>
                    <div className="cardfooter">    
                        <IconButton className="cardicon" aria-label="React">
                            <ThumbUpAltIcon style={{marginRight:"40px"}} />
                        </IconButton>
                        <IconButton className="cardicon" aria-label="Comment">
                            <ModeCommentIcon style={{marginRight:"40px"}} />
                        </IconButton>
                        <IconButton className="cardicon" aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </div>
                </CardActions>

            </Card>
        </div>
    );
}