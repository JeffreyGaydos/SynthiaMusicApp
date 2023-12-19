import { NavigationContainer, NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NotificationFooter from './components/NotificationFooter';
//super useful for getting your types right: https://github.com/react-navigation/react-navigation/blob/968840cb4f98303562de9e29fae7fbfda9c8d2fa/packages/core/src/types.tsx
function HomeScreen({ navigation }: {navigation: any}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text style={app.text}>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
      <Text>I am the home screen!!</Text>
      <Button title="Go to details" onPress={() => navigation.navigate("Details", { myText: "cool beans!!"})}></Button>
      <Button title="Use Initial Params" onPress={() => navigation.navigate("Details")}></Button>
    </View>
  )
}

function DetailsScreen({ navigation, route }: { navigation: any, route: any }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={app.text}>Details Screen</Text>
      <Text style={app.text}>{route.params.myText}</Text>
      <Button title="Go to details" onPress={() => navigation.push("Details")}></Button>
      <Button title="Back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function LogoTitle({ title }: { title: string }) {
  if(title == "Home") {
    return (
      <View style={{width: "100%"}}>
        <Text style={app.titleText}>{title}</Text>
        <Image
          style={app.titleImageHome}
          source={require("./Synthia4.png")}
          />
      </View>
    );
  } else {
    return (
      <View style={{width: "100%"}}>
        <Text style={app.titleText}>{title}</Text>
        <Image
          style={app.titleImage}
          source={require("./Synthia4.png")}
          />
      </View>
    ) ;
  }
}

function App(): React.JSX.Element {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "black"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold"
          },
          headerTitle: (props) => <LogoTitle title={props.children} {...props} />
        }}>
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{headerTitle: (props) => <LogoTitle title={props.children} {...props} />}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ myText: "Initial Params"}}
          />
      </Stack.Navigator>
      <NotificationFooter />
    </NavigationContainer>
  );
}

const app = StyleSheet.create({
  text: {
    color: 'black'
  },
  titleText: {
    textAlign: "left",
    color: "white",
    fontSize: 23
  },
  titleImage: {
    position: "absolute",
    right: 60,
    height: 50,
    width: 200,
    paddingTop: 0,
    marginTop: -10,
  },
  titleImageHome: {
    position: "absolute",
    right: 5,
    height: 50,
    width: 200,
    paddingTop: 0,
    marginTop: -10,
  }
});

export default App;