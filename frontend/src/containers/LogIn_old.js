import Button from '@mui/material/Button';
import "./css/LogIn.css"

function LogIn ({ onLogin }) {
    return <div className='PageWrapper'> 
        <Button variant="contained" className='loginButton' onClick={onLogin}>Log in</Button>
    </div>
}
export default LogIn;