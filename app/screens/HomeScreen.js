import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../helpers/queries";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#282828" }}>
      <Header />
      <View style={{ flex: 1 }}>
        <FlatList
          data={data.getPosts}
          renderItem={({ item, index }) => (
            <PostCard key={index} post={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
