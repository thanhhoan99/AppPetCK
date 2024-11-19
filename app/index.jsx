// import { useUser } from "@clerk/clerk-expo";
// import { Link, Redirect } from "expo-router";
// import { Text, View } from "react-native";

// export default function Index() {

//   const {user}=useUser();
//   console.log("User Info:", user); // Kiểm tra thông tin trả về từ useUser
//   return (
//     <View
//       style={{
//         flex: 1,
//         // justifyContent: "center",
//         // alignItems: "center",
//       }}
//     > 
//      {/* <Text>{user?.fullName}</Text>
//       {user?
//       <Redirect href={'/(tabs)/home'} />
//       :<Redirect href={'/login'} />

//       } */}
//       {user ? <Redirect href={'/(tabs)/home'} /> : <Redirect href={'/(tabs)/home'} />}

    
    
     
//     </View>
//   );
// }
import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

export default function index() {
  return <Redirect href={'/home'}/>
}