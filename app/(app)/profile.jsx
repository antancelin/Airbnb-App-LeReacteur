import { View, Text, SafeAreaView, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../_layout";

const Profile = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text>PROFILE</Text>
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
};

export default Profile;
