import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
      }}
    >
      <FontAwesome5 name="video-slash" size={25} color="#FF0000" />
      <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>
        Tubeless
      </Text>
    </View>
  );
}
