import { Text, View } from "react-native";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#282828",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 50, color: "white" }}>Loading...</Text>
    </View>
  );
}
