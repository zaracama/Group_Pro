import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FollowerCard from "../components/FollowerCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteValueFor } from "../helpers/secureStore";
import { useQuery } from "@apollo/client";
import { GET_USER_ID } from "../helpers/queries";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function ProfileScreen({ route }) {
  const { userId } = route.params;

  const { loading, error, data } = useQuery(GET_USER_ID, {
    variables: { id: userId },
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const auth = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#282828" }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 12,
            margin: 10,
          }}
        >
          <MaterialIcons
            onPress={() => {
              deleteValueFor("access_token");
              auth.setIsSignedIn(false);
            }}
            name="logout"
            size={30}
            color="white"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 10,
            gap: 6,
          }}
        >
          <Image
            style={{ width: 80, height: 80, borderRadius: 40 }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cuDQi3zPLO_ja9IfewUdYZpSpIeYvbCPJg&usqp=CAU",
            }}
          />
          <View>
            <Text
              numberOfLines={1}
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {data && data.getUserbyId.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: "white",
                fontWeight: "200",
                fontSize: 18,
              }}
            >
              {data && data.getUserbyId.username}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: "white",
                fontWeight: "200",
                fontSize: 18,
              }}
            >
              {data && data.getUserbyId.email}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              margin: 10,
            }}
          >
            Followers: {data && data.getUserbyId.followerusers.length}
          </Text>
          <ScrollView horizontal>
            {data &&
              data.getUserbyId.followerusers.length > 0 &&
              data.getUserbyId.followerusers.map((el, i) => (
                <FollowerCard key={i} follow={el.username} />
              ))}
          </ScrollView>
        </View>
        <View>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              margin: 10,
            }}
          >
            Followings: {data && data.getUserbyId.followingusers.length}
          </Text>
          <ScrollView horizontal>
            {data &&
              data.getUserbyId.followingusers.length > 0 &&
              data.getUserbyId.followingusers.map((el, i) => (
                <FollowerCard key={i} follow={el.username} />
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
