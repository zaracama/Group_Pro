import { useQuery, gql } from "@apollo/client";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../helpers/queries";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function TestScreen() {
  const { loading, error, data } = useQuery(getUser);

  //   console.log(loading, error, data);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <SafeAreaView>
      {data.searchUser.map((el) => {
        return <Text>{el.name}</Text>;
      })}
    </SafeAreaView>
  );
}
