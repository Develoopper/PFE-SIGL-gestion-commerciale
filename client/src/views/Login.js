import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Axios from '../helpers/AxiosInstance';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Container,
  // LinearProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png';
import useForm from '../hooks/useForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const userState = useSelector(state => state.userState);
  const dispatch = useDispatch();

  const history = useHistory();
  const classes = useStyles();
  // const [formState, setForm] = useState({});

  // const handleChange = (e, field) => {
  //   const { value } = e.target;
  //   setForm(state => ({ ...state, [field]: value }));
  // };

  const { handleChange, handleSubmit } = useForm({ username: '', password: '' }, submit);

  async function submit(values) {
    try {
      console.log(values);
      const { data: { username, accessToken, refreshToken } } = await Axios.post('/auth/login', values);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      history.push('caisse');
      dispatch({ type: 'user/set', payload: username });
    } catch (error) {
      console.log('*', error);
      dispatch({ type: 'snack/set', payload: { 
        type: 'warning', 
        msg: error.response.data, 
        open: true
      } });
    }
  }

  useEffect(() => {
    if (userState)
      history.push('caisse');
  }, [])

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline/>
      <div className={classes.paper}>
        <img src={logo} alt='Avatar' className='pppLogo' style={{ marginTop: 70 }}/>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            // required
            fullWidth
            id='username'
            label='Utilisateur'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            // required
            fullWidth
            name='password'
            label='Mot de passe'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleChange}
          />
          <FormControlLabel
            style={{ marginTop: 10 }}
            control={<Checkbox value='remember' color='primary'/>}
            label='Rester connecté'
          />
          <Button
            fullWidth
            variant='contained'
            color='secondary'
            style={{ color: 'white' }}
            className={classes.submit}
            type='submit'
          >
            Se connecter
          </Button>
        </form>
      </div>
      {/* <LinearProgress/> */}

      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}