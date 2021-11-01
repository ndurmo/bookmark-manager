import { Flex } from "@chakra-ui/react";
import { Router, Switch, Route } from "react-router";

import SignIn from "./auth/sign-in/components/sign-in";
import SignUp from "./auth/sign-up/components/sign-up";
import Homepage from "./homepage/components/homepage";
import Landing from "./landing/components/landing";
import history from "./routing/history";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Flex direction="column" minH="100vh">
      <Router history={history}>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={Homepage} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/" exact component={Landing} />
          </Switch>
        )}
      </Router>
    </Flex>
  );
}

export default App;
