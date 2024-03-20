import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CommentCard from "../components/CommentCard";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_COMMENT,
  ADD_FOLLOW,
  ADD_LIKE,
  GET_POST_ID,
} from "../helpers/queries";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { timeConverter } from "../helpers/timeConverter";
import { useState } from "react";

export default function DetailScreen({ route }) {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const { loading, error, data } = useQuery(GET_POST_ID, {
    variables: { id: postId },
  });

  const [
    comments,
    { loading: loadingComments, error: errorComments, data: dataComments },
  ] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setComment("");
    },
    refetchQueries: [GET_POST_ID],
  });

  const [likes, { loading: loadingLikes, error: errorLikes, data: dataLikes }] =
    useMutation(ADD_LIKE, {
      refetchQueries: [GET_POST_ID],
    });

  const [
    follow,
    { loading: loadingFollow, error: errorFollow, data: dataFollow },
  ] = useMutation(ADD_FOLLOW, {
    onCompleted: () => {
      alert(`You are Following ${data.getPostById.author.username}`);
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (loadingLikes) return <Loading />;
  if (errorLikes) return <Error message={errorLikes.message} />;
  if (loadingComments) return <Loading />;
  if (errorComments) return <Error message={errorComments.message} />;
  if (loadingFollow) return <Loading />;
  if (errorFollow) return <Error message={errorFollow.message} />;

  function getHeader() {
    return (
      <View style={{ margin: 10, gap: 6 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {data.getPostById.content}
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "200",
            fontSize: 12,
          }}
        >
          {timeConverter(data.getPostById.createdAt)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
            gap: 6,
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
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cuDQi3zPLO_ja9IfewUdYZpSpIeYvbCPJg&usqp=CAU",
              }}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {data.getPostById.author.username}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <TouchableOpacity
              onPress={() => {
                follow({
                  variables: {
                    newFollow: {
                      followingId: data.getPostById.author._id,
                    },
                  },
                });
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: 80,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Follow
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!loading) {
                  likes({
                    variables: {
                      newLike: { postId },
                    },
                  });
                }
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {data.getPostById.likes.length}
                </Text>
                <AntDesign name="like2" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Comments:
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#282828" }}>
      {/* <Text style={{color: "white"}}>Detail Screen {name}</Text> */}
      <Image
        style={{ width: "100%", height: 200 }}
        source={{
          uri: data.getPostById.imgUrl,
        }}
      />

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 6,
          margin: 10,
          gap: 6,
          height: 40,
        }}
      >
        <FlatList
          data={data.getPostById.comments}
          renderItem={({ item, index }) => (
            <CommentCard key={index} comment={item} />
          )}
          ListHeaderComponent={getHeader}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            padding: 5,
            borderRadius: 6,
            flex: 1,
            borderWidth: 1,
            borderColor: "white",
            color: "white",
            marginLeft: 10,
          }}
          placeholder="Add a comment..."
          placeholderTextColor={"white"}
          value={comment}
          onChangeText={setComment}
        />
        <SimpleLineIcons
          onPress={() => {
            comments({
              variables: {
                newComment: {
                  postId,
                  content: comment,
                },
              },
            });
          }}
          style={{ padding: 15 }}
          name="paper-plane"
          size={24}
          color="white"
        />
      </View>
    </SafeAreaView>
  );
}
