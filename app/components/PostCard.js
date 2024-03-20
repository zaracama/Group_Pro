import { Image, Text, TouchableOpacity, View } from "react-native";
import { timeConverter } from "../helpers/timeConverter";

export default function PostCard({ post, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detail", { postId: post._id });
      }}
    >
      <View style={{ marginBottom: 10, gap: 6 }}>
        <Image
          style={{ width: "100%", height: 200 }}
          source={{
            uri: post.imgUrl,
          }}
        />
        <View
          style={{
            width: "80%",
            flexDirection: "row",
            gap: 6,
            margin: 10,
          }}
        >
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cuDQi3zPLO_ja9IfewUdYZpSpIeYvbCPJg&usqp=CAU",
            }}
          />
          <View style={{ justifyContent: "space-between" }}>
            <Text
              numberOfLines={2}
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {post.content}
            </Text>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "200",
                  fontSize: 12,
                }}
              >
                {post.author.username}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "200",
                  fontSize: 12,
                }}
              >
                {timeConverter(post.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
