import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';

const Navigation = ({ isLoaded }) => {
  const user = useSelector(state => state.session.user);

  let content;

  if (user) {
    content = (
      <li><ProfileButton user={user} /></li>
    )
  } else {
    content = (
      <div className='registrations'>
        <li><OpenModalButton buttonText='Log In' modalComponent={<LoginFormModal />}/></li>
        <li><NavLink activeClassName='active' to='/signup' exact>Sign Up</NavLink></li>
      </div>
    )
  }

  return (
    <nav>
      <ul>
        <li><NavLink activeClassName='active' to='/' exact>Home</NavLink></li>
        {isLoaded && content}
      </ul>
    </nav>
  )
}

export default Navigation;
