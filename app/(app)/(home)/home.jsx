// import des packages
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

// import des styles
import homeStyles from "../../../style/home";

// import des images
import logo from "../../../assets/imgs/airbnb-logo.png";

// import d'icônes
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(
          "Error lors de la récupération des données",
          error.response.data
        );
      }
    };
    fetchRooms();
  }, []);

  const ratingValue = (value) => {
    if (value === 5) {
      return (
        <View style={homeStyles.stars}>
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
        </View>
      );
    } else if (value === 4) {
      return (
        <View style={homeStyles.stars}>
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
        </View>
      );
    } else if (value === 3) {
      return (
        <View style={homeStyles.stars}>
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
        </View>
      );
    } else if (value === 2) {
      return (
        <View style={homeStyles.stars}>
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
        </View>
      );
    } else {
      return (
        <View style={homeStyles.stars}>
          <FontAwesome name="star" size={24} color="#FFB000" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
          <FontAwesome name="star" size={24} color="#BBBBBB" />
        </View>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="FFBAC0"
          style={{ paddingTop: 10 }}
        />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={homeStyles.header}>
              <Image source={logo} style={homeStyles.logo} />
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={data}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => {
                  return (
                    <Link href={`/room?id=${item._id}`}>
                      <View style={homeStyles.content}>
                        <ImageBackground
                          source={{ uri: item.photos[0]["url"] }}
                          style={homeStyles.imageBackground}
                          resizeMode="cover"
                        >
                          <View style={homeStyles.price}>
                            <Text style={homeStyles.textPrice}>
                              {item.price} €
                            </Text>
                          </View>
                        </ImageBackground>
                        <View style={homeStyles.roomContent}>
                          <View style={homeStyles.bottomContent}>
                            <Text
                              style={homeStyles.title}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {item.title}
                            </Text>
                            <View style={homeStyles.ratingContent}>
                              {ratingValue(item.ratingValue)}
                              <Text style={homeStyles.reviews}>
                                {item.reviews} reviews
                              </Text>
                            </View>
                          </View>
                          <Image
                            source={{ uri: item.user.account.photo.url }}
                            style={{
                              height: 70,
                              width: 70,
                              borderRadius: "50%",
                              resizeMode: "cover",
                            }}
                          />
                        </View>
                      </View>
                    </Link>
                  );
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Home;
