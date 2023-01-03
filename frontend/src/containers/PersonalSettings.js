import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Lock from "./images/Lock.jpg";
import { Form } from "react-router-dom"
import TextField from '@mui/material/TextField';
import "./css/buttons.css"
import { useApp } from '../hook';
import api from '../connection';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
const TOKEN_KEY ='token';

function PersonalSettings () {
    const [opassword,setOpassword]=React.useState('');
    const [npassword,setNpassword]=React.useState('');
    const [rpassword,setRpassword]=React.useState('');
    const {handleUpdateInfo,setMe,me}=useApp();
    const [e,setE]=React.useState('');
    const [success,setSuccess]=React.useState('');
    const [successopen,setSuccessopen]=React.useState('');
    const [eopen,setEopen]=React.useState(false);
    const handlesubmit=async(e)=>{
        e.preventDefault();
        if(npassword!==rpassword){
            setE('Reconfirm new password is not the same as new password!');
            setEopen(true);
            setTimeout(function () {
                setEopen(false)
                setE("")
            }, 3000);//10 Second delay 
           
        }
        // console.log('n: '+npassword+"o "+opassword);
        // handleUpdateInfo(null,null,opassword,npassword);
        console.log('me '+me.email);
        try{
            const {data:{user,token}}=await api.post('/users/change',{email:me.email,opassword:opassword,npassword:npassword});
            if(token){
                localStorage.setItem(TOKEN_KEY,token);
				setMe(user);
                setSuccess('Change password successfully!');
                setSuccessopen(true);
                setTimeout(function () {
                    setSuccessopen(false)
                    setSuccess("")
                }, 3000);//10 Second delay 
            }

        }catch(e){
            setE('Old password is wrong!');
            setEopen(true);
            setTimeout(function () {
                setEopen(false)
                setE("")
            }, 3000);//10 Second delay 
            
        }
    }
    return (
        <>
   
    <Box sx={{ width: '50%', position:"fixed", left: "50%", top:"12%", transform: "translate(-50%, 0)" }}>
        { e? <Collapse in={eopen}>
            <Alert severity='error'
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setEopen(false);
                    setE("");
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={{ mb: 2 }}
            >
            {e}
            </Alert>
        </Collapse> : <></>}
        {success? <Collapse in={successopen}>
                <Alert severity='success'
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setSuccessopen(false);
                        setSuccess("");
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                {success}
                </Alert>
            </Collapse> : <></>}
    </Box> 
    
        <Card sx={{ maxWidth: `calc(0.8*vw)` }}>
            
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    Personal Settings
                </Typography>
            </CardContent>
            <CardMedia
                sx={{ height: `280px`, marginLeft: "10px", marginRight: "10px", borderRadius: "10px"}}
                image={Lock}
                title="green iguana"
            />
            <CardContent> 
                <Typography variant="body2" color="text.secondary">
                </Typography>
                <TextField label="Old Password"  sx={{margin: '10px'}} onChange={(e)=>setOpassword(e.target.value)}/>
                <br></br>
                <TextField label="New Password" sx={{margin: '10px'}} onChange={(e)=>setNpassword(e.target.value)}/>
                <br></br>
                <TextField label="Reconfirm New Password" sx={{margin: '10px'}} onChange={(e)=>setRpassword(e.target.value)}/>
            </CardContent>
            <CardActions>
                <Form method="post" onSubmit={handlesubmit}> 
                    <button type='submit' className='button-19' >Set new password</button>
                </Form>
            </CardActions>
        </Card>
        </>
    )
}
export default PersonalSettings;