import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../helpers/queries";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { loading, error, data }] = useMutation(ADD_USER, {
    onCompleted: () => {
      navigation.navigate("Login");
    },
  });

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
            Create a Tubeless Account
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
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={{ padding: 10, borderRadius: 6, backgroundColor: "white" }}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={{ padding: 10, borderRadius: 6, backgroundColor: "white" }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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
              register({
                variables: {
                  newUser: {
                    name,
                    username,
                    email,
                    password,
                  },
                },
              });
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
              <Text style={{ color: "white" }}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ color: "white" }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Already has an account? Click here to Sign In
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
