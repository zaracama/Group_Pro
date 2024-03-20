import { Image, Text } from "react-native";
import { View } from "react-native";

export default function FollowerCard({ follow }) {
  return (
    <View
      style={{
        alignItems: "center",
        margin: 5,
        padding: 5,
      }}
    >
      <Image
        style={{ width: 60, height: 60, borderRadius: 30 }}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cuDQi3zPLO_ja9IfewUdYZpSpIeYvbCPJg&usqp=CAU",
        }}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "200",
          fontSize: 18,
        }}
      >
        {follow}
      </Text>
    </View>
  );
}
