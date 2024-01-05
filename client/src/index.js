import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { AppointmentList } from './components/appointments/AppointmentList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<>Home</>} />

        <Route path='appointments'>

          <Route index element={<AppointmentList/>} />

          <Route path=':aptid' element={<>AppointmentDetails</>}/>
          <Route path='create' element={<>AppointmentCreate</>}/>
          <Route path='edit' element={<>AppointmentEdit</>}/>

        </Route>

        <Route path='services'>
          <Route index element={<>ServiceList</>} />
        </Route>

        <Route path='customers'>

          <Route index element={<>CustomerList</>} />

          <Route path='create' element={<>CustomerCreate</>} />

        </Route>

        <Route path='stylists'>
          
          <Route index element={<>StylistList</>} />

          <Route path='create' element={<>StylistCreate</>} />

        </Route>

      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
