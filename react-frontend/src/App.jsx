import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home.jsx';
import Register from './views/Register.jsx';
import Login from './views/Login.jsx';
import LoggedIn from './views/LoggedIn.jsx'
import Analysis from './views/Analysis.jsx'
import FormAnalysis from './views/FormAnalysis.jsx'
import Keys from './views/Keys.jsx'
import AddKey from './views/AddKey.jsx'
import NotFound from './views/NotFound.jsx'
import Tags from './views/Tags.jsx'
import AddTag from './views/AddTag.jsx'
import FAQ from './views/FAQ.jsx'
import AuthProvider from './auth/authProvider.jsx';
import PrivateRoute from './auth/privateRoute.jsx';
import GuestRoute from './auth/guestRoute.jsx';
function App() {
  /*
  <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path='/notAuthorized' element={<NotAuthorized />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/notAuthorized' element={<NotAuthorized />} />
  */
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path='/' element={<Home />} />
            </Route>
            <Route element={<GuestRoute />}>
              <Route path='/login' element={<Login />} />
            </Route>
            <Route element={<GuestRoute />}>
              <Route path='/register' element={<Register />} />
            </Route>
            
            <Route path="/faq" element={<FAQ />} />
            
            <Route path='*' element={<NotFound />} />

            <Route element={<PrivateRoute />}>
              <Route path='/loggedin' element={<LoggedIn />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/analysis/:id' element={<Analysis />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/analysis/form' element={<FormAnalysis />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/keys' element={<Keys />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/keys/add' element={<AddKey />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/tags" element={<Tags />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/tags/add" element={<AddTag />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
export default App;
