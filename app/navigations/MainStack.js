import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../screens/Detail Screen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainBottomTab from "./MainBottomTab";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getValueFor } from "../helpers/secureStore";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    getValueFor("access_token").then((result) => {
      if (result) {
        auth.setIsSignedIn(true);
      }
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Test" component={TestScreen} /> */}
      {auth.isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={MainBottomTab} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
