import { Image, Text, TouchableOpacity, View } from "react-native";

export default function UserCard({ user, navigation }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(`Profile`, { userId: user._id });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            gap: 6,
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
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {user.username}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
