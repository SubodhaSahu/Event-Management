import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import { NativeBaseProvider, Input, Stack, Icon, Button } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const image = {
  uri: "https://images.unsplash.com/photo-1454117096348-e4abbeba002c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
};

function Login(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        // source={image}
        //  source={require('../assets/background.png')}
        // imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.Middle}>
          <Text style={styles.LogoText}>Event Management System</Text>
        </View>
        <View style={styles.Middle}>
          <Text style={styles.LoginText}>Login</Text>
        </View>
        <View style={styles.text2}>
          <Text>Don't have an account? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}> Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.Middle}>
            <Stack
              space={4}
              w="100%"
              maxW="300px"
              mx="auto"
              alignItems="center"
            >
              <Input
                InputLeftElement={
                  <Icon
                    as={<FontAwesome5 name="user" />}
                    size="sm"
                    m={2}
                    _light={{
                      color: "black",
                    }}
                    _dark={{
                      color: "gray.300",
                    }}
                  />
                }
                variant="outline"
                placeholder="Username or Email"
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
              <Input
                InputLeftElement={
                  <Icon
                    as={<FontAwesome5 name="key" />}
                    size="sm"
                    m={2}
                    _light={{
                      color: "black",
                    }}
                    _dark={{
                      color: "gray.300",
                    }}
                  />
                }
                variant="outline"
                secureTextEntry={true}
                placeholder="Password"
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
            </Stack>
            <Button style={styles.buttonDesign} onPress={() => alert("Login")}>
              Login
            </Button>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
  },
  LogoText: {
    color: "#026ecd",
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
  },
  LoginText: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    width: 300,
    backgroundColor: "#026efd",
    marginTop: 10,
    borderRadius: 50,
  },
});
