import { Image } from "react-native";
import { Text, View } from "react-native";
import { timeConverter } from "../helpers/timeConverter";

export default function CommentCard({ comment }) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 6,
        paddingVertical: 10,
        margin: 10,
        alignItems: "flex-start",
      }}
    >
      <Image
        style={{ width: 40, height: 40, borderRadius: 20 }}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cuDQi3zPLO_ja9IfewUdYZpSpIeYvbCPJg&usqp=CAU",
        }}
      />
      <View>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Text
            style={{
              color: "white",
              fontWeight: "200",
              fontSize: 12,
            }}
          >
            {comment.username}
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "200",
              fontSize: 12,
            }}
          >
            {timeConverter(comment.createdAt)}
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            width: 280,
          }}
        >
          {comment.content}
        </Text>
      </View>
    </View>
  );
}
