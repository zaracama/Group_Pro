import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../helpers/queries";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { save } from "../helpers/secureStore";

export default function LoginScreen({ navigation }) {
  const auth = useContext(AuthContext);
  const [login, { loading, error, data }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      save("access_token", data.login.access_token).then(() => {
        auth.setIsSignedIn(true);
      });
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#282828" }}>
      <View
        style={{
          flex: 1,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginBottom: 50,
          }}
        >
          <FontAwesome5 name="video-slash" size={40} color="#FF0000" />
          <Text style={{ color: "white", fontSize: 40, fontWeight: "600" }}>
            Tubeless
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, color: "white" }}>
            Login to Tubeless Account
          </Text>
        </View>
        <View
          style={{
            width: "80%",
            padding: 20,
            gap: 20,
            backgroundColor: "grey",
            borderRadius: 6,
            marginBottom: 20,
          }}
        >
          <TextInput
            style={{ padding: 10, borderRadius: 6, backgroundColor: "white" }}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            secureTextEntry
            style={{ padding: 10, borderRadius: 6, backgroundColor: "white" }}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => {
              if (!loading) {
                login({
                  variables: {
                    login: {
                      username,
                      password,
                    },
                  },
                });
              }
            }}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "#282828",
                borderRadius: 6,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ color: "white" }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Don't have an account? Click here to Sign Up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
