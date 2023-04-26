import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

import ProfileButton from './ProfileButton';

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
        <li><NavLink activeClassName='active' to='/login' exact>Log In</NavLink></li>
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
