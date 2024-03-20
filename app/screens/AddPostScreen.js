import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { ADD_POST, GET_POSTS } from "../helpers/queries";
import { useState } from "react";

export default function AddPostScreen({ navigation }) {
  const [addPost, { loading, error, data }] = useMutation(ADD_POST, {
    onCompleted: (data) => {
      if (data) {
        setContent("");
        setTags("");
        setImgUrl("");
        navigation.navigate("Feeds");
      }
    },
    refetchQueries: [GET_POSTS],
  });
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");

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
            Create a Tubeless Post
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
            editable
            multiline
            numberOfLines={3}
            style={{ padding: 10, borderRadius: 6, backgroundColor: "white" }}
            placeholder="Content"
            value={content}
            onChangeText={setContent}
          />
          <TextInput
            style={{ padding: 10, borderRadius: 6, backgroundColor: "white" }}
            placeholder="Tags"
            value={tags}
            onChangeText={setTags}
          />
          <TextInput
            style={{ padding: 10, borderRadius: 6, backgroundColor: "white" }}
            placeholder="Image Url"
            value={imgUrl}
            onChangeText={setImgUrl}
          />

          <TouchableOpacity
            onPress={() => {
              if (!loading) {
                addPost({
                  variables: {
                    newPost: {
                      content,
                      tags,
                      imgUrl,
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
              <Text style={{ color: "white" }}>Create Post</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
