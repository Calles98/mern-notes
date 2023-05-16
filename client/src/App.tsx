import React, { useEffect, useState } from 'react';
import { Container} from 'react-bootstrap';
import styles from './styles/App.module.css'; 
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import { User } from './models/users';
import * as NotesApi from './network/notes_api'
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null); 
 
  const [showSignUpModal, setShowSignupModal ] = useState(false); 

  const [showLoginModal, setShowLoginModal ] = useState(false); 


  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser(); 
        setLoggedInUser(user); 
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchLoggedInUser();
  }, [])

  return (
    <BrowserRouter>
      <div>
          <NavBar 
          loggedInUser={loggedInUser}
          onLoggedInClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignupModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}

          /> 
          <Container className={styles.pageContainer}>
            <Routes>
              <Route 
                path='/'
                element={<NotesPage loggedInUser={loggedInUser} />}
              />
              <Route 
                path='/privacy'
                element={<PrivacyPage />}
              />
              <Route 
                path='/*'
                element={<NotFoundPage />}
              />
            </Routes>
          </Container>
  
        {
              showSignUpModal && 
              <SignUpModal 
              onDismiss={() => setShowSignupModal(false)}
              onSignUpSuccessful={(user) => {
                setLoggedInUser(user); 
                setShowSignupModal(false)
              }}
              />
            }
            {
              showLoginModal && 
              <LoginModal 
              onDismiss={() => setShowLoginModal(false)}
              onLoginSuccessful={(user) => {
                setLoggedInUser(user);
                setShowLoginModal(false); 
              }}
              />
            }
      </div>
    </BrowserRouter>
  );
}

export default App;
