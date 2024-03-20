import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigations/MainStack";
import AuthProvider from "./context/AuthContext";
import client from "./config/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
}
