import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from "reactstrap"
import './App.css';
import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";


function App() {
  return (
    <div className="App">
      <>
        <Navbar color='light' expand='md'>
          <Nav navbar>
            <NavbarBrand href='/'>💇 Hillary's Haircuts</NavbarBrand>
            <NavItem className='nav-it'>
              <NavLink className='nav-li nav-appointment' href='/appointments'>Appointments</NavLink>
            </NavItem>
            <NavItem className='nav-it'>
              <NavLink className='nav-li nav-customers' href='/customers'>Customers</NavLink>
            </NavItem>
            <NavItem className='nav-it'>
              <NavLink className='nav-li nav-stylists' href='/stylists'>Stylists</NavLink>
            </NavItem>
            <NavItem className='nav-it'>
              <NavLink className='nav-li nav-services' href='/services'>Services</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Outlet />
      </>
    </div>
  );
}

export default App;
