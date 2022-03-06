import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { Themes, GlobalStyle } from "./styles";
import { ThemeProvider } from 'styled-components';

import Authoritaw from './pages/Authoritaw';
import Main from './pages/Main';

import Authentication from './utils/Authentication';
import { Spinner, SpinnerWrap } from './styles/Elements';

import { setAuthToken, resetAuthToken } from './utils/token';
import { getCurrentUser } from './redux/actions/authActions';

function App(props) {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(Themes.nightmode);
  const [currentTheme, setCurrentTheme] = useState('night');

  const { getUser } = props;

  useEffect(() => {
    (async function () {
      const token = localStorage.getItem('token');
      const theme = localStorage.getItem('theme');
      try {
        if (token) {
          setAuthToken(token);
          await getUser();
        }
        if (!theme || theme === 'bright') {
          setMode(Themes.brightmode);
          setCurrentTheme('bright');
        } else {
          setMode(Themes.nightmode);
          setCurrentTheme('night');
        }
      } catch (e) {
        console.log('e in App.jsx useEffect:::', e);
        if (token) resetAuthToken();
      } finally {
        setLoading(false);
      }
    })();
  }, [getUser]);

  function toggleMode(theme) {
    if (theme === 'night') {
      setMode(Themes.nightmode);
    } else {
      setMode(Themes.brightmode);
    }
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme)
  }

  return (
    <ThemeProvider theme={mode}>
      <GlobalStyle />
      {loading
        ? (
          <SpinnerWrap background={`linear-gradient(black, 88%, ${mode.mainRed})`}>
            <Spinner size="120" border="10" />
          </SpinnerWrap>
        ) : (
          <Router>
            <Switch>
              <Route exact path="/">
                {routeProps => (
                  <Main {...routeProps} toggleMode={toggleMode} mode={currentTheme} />
                )}
              </Route>

              <Route
                exact
                path="/login"
                component={Authentication(Authoritaw, { required: false, authenticated: props.authenticated })}
              />
            </Switch>
          </Router>
        )}
    </ThemeProvider>
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  }
}

const dispatchProps = {
  getUser: getCurrentUser
};

export default connect(mapStateToProps, dispatchProps)(App);
