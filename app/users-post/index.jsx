import { View, Text, Pressable, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { collection, getDocs, doc, query, where, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/Config/FirebaseConfigs';
import { FlatList } from "react-native";
import PetListItem from './../../components/Home/PetListItem';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function UserPost() {
  const { user } = useUser();
  const [loader, setLoader] = useState(false);
  const [userPostList, setUserPostList] = useState([]);

  useEffect(() => {
    user && GetUserPost();
  }, [user]);

  /**
   * Fetch user posts
   */
  const GetUserPost = async () => {
    setLoader(true);
    setUserPostList([]); // Clear existing data before fetching new ones
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUserPostList(posts);
    setLoader(false);
  };

  const OnDeletePost = (docId) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePost(docId),
          style: "destructive",
        },
      ]
    );
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, "Pets", docId));
    GetUserPost();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Your Posts</Text>
      {loader ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={styles.loader} />
      ) : userPostList.length > 0 ? (
        <FlatList
          data={userPostList}
          numColumns={2}
          refreshing={loader}
          onRefresh={GetUserPost}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <PetListItem pet={item} />
              <Pressable
                onPress={() => OnDeletePost(item.id)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash" size={20} color="red" />
              </Pressable>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noPostText}>No posts found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 20,
    color: Colors.DARK_PRIMARY,
  },
  loader: {
    marginTop: 20,
  },
  noPostText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.GRAY,
    marginTop: 50,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: Colors.LIGHT_BACKGROUND,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButton: {
    position: "absolute",
    top: 153,
    right: 10,
    backgroundColor: Colors.DANGER,
    padding: 8,
    borderRadius: 20,
  },
});



// import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
// import React, { useEffect, useState } from 'react'
// import { useUser } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";
// import { collection, getDocs,doc, query, where ,setDoc, deleteDoc} from 'firebase/firestore';
// import { db, storage } from '@/Config/FirebaseConfigs';
// import { useNavigation } from "expo-router";
// import { FlatList } from "react-native";
// import PetListItem from  './../../components/Home/PetListItem'
// import { Colors } from '@/constants/Colors';
// import Ionicons from '@expo/vector-icons/Ionicons'


// export default function UserPost() {
//   const navigation = useNavigation();
//   const { user } = useUser();
//   const [loader, setLoader] = useState(false);
//   const [userPostList, setUserPostList] = useState([]);

//   useEffect(() => {
//     navigation.setOptions({
//       headerTitle: "User Post",
//     });
//     user && GetUserPost();
//   }, [user]);

//   /**
//    * Used to Get User Post
//    */
//   const GetUserPost = async () => {
//     setLoader(true);
//     const q = query(
//       collection(db, "Pets"),
//       where("email", "==", user?.primaryEmailAddress?.emailAddress)
//     );
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//       setUserPostList((prev) => [...prev, doc.data()]);
//     });
//     setLoader(false);
//   };

//   const OnDeletePost = (docId) => {
//     Alert.alert(
//       "Do you want to Delete ?",
//       "Do you really want to delete this post",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Click"),
//           styles: "cancel",
//         },
//         {
//           text: "Delete",
//           onPress: () => deletePost(docId),
//         },
//       ]
//     );
//   };
//   const deletePost = async (docId) => {
//     await deleteDoc(doc(db, "Pets", docId));
//     GetUserPost();
//   };
//   return (
//     <View style={{ padding: 20 }}>
//       <Text
//         style={{
//           //   fontFamily: "outfit-medium"
//           fontSize: 30,
//         }}
//       >
//         UserPost
//       </Text>
//       <FlatList
//         data={userPostList}
//         numColumns={2}
//         refreshing={loader}
//         onRefresh={GetUserPost}
//         renderItem={({ item, index }) => (
//           <View  >
//             <PetListItem pet={item} key={index} />
//             <Pressable
//               onPress={() => OnDeletePost(item?.id)}
//               style={styles.deleteButton}
//             >
//               <Ionicons name='trash' size={24} color="red"/>
//             </Pressable>
//           </View>
//         )}
//       />
//       {userPostList?.length == 0 && <Text>No Post Found</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   deleteButton: {
//     backgroundColor: Colors.LIGHT_PRIMARY,
//     padding: 5,
//     borderRadius: 7,
//     marginTop: 5,
//     marginRight: 10,
//   },
// });
