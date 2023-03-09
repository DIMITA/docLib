import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../connect/Firebase';
import Header from '../header/header';
import styles from './home.module.scss';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Meetings from '../meetings/meetings';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        localStorage.setItem('uid', user.uid);
        console.log('uid', uid);
      } else {
        console.log('user is logged out');
        navigate('/');
      }
    });
  });
  return (
    <div className={styles['container']}>
      <Header />
      <Meetings />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Add" icon={<AddIcon />} />
          <BottomNavigationAction label="List" icon={<FilterListIcon />} />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default Home;
