import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import UserCard from "../components/UserCard";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_NAME } from "../helpers/queries";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function SearchUser({ navigation }) {
  const [name, setName] = useState("");
  const { loading, error, data } = useQuery(GET_USER_NAME, {
    variables: { name: name },
  });

  // if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#282828" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            padding: 5,
            borderRadius: 6,
            flex: 1,
            borderBottomColor: "white",
            color: "white",
            margin: 10,
            backgroundColor: "grey",
          }}
          placeholder="  Search User by Name/Username..."
          placeholderTextColor={"white"}
          value={name}
          onChangeText={setName}
        />
        <EvilIcons
          style={{ padding: 10, paddingLeft: 0 }}
          name="search"
          size={40}
          color="white"
        />
      </View>
      <ScrollView style={{ margin: 10, gap: 6 }}>
        {data &&
          data.getUserbyName.map((el, i) => (
            <UserCard key={i} user={el} navigation={navigation} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
