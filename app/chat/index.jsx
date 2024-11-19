// import { View, Text , StyleSheet } from 'react-native'
// import React, { useEffect, useState } from "react";
// import { useLocalSearchParams } from "expo-router";
// import { useUser } from "@clerk/clerk-expo";
// import { collection, getDocs,doc, query, where,getDoc ,setDoc, addDoc, onSnapshot} from 'firebase/firestore';
// import { db, storage } from '@/Config/FirebaseConfigs';
// import moment from "moment";
// import { GiftedChat } from "react-native-gifted-chat";

// export default function ChatScreen() {
//   const params = useLocalSearchParams();
//   const navigation = useLocalSearchParams();
//   const { user } = useUser();
//   const [messages, setMessages] = useState([]);
//   useEffect(() => {
//     GetUserDitails();

//     const unsubscribe = onSnapshot(
//       collection(db, 'Chat', params?.id, 'Messages'),
//       (snapshot) => {
//         const messagesData = snapshot.docs.map((doc) => ({
//           _id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(messagesData);
//       }
//     );
//     return () => unsubscribe();
//   }, []);

//     const GetUserDitails = async () => {
//     const docRef = doc(db, "Chat", params?.id);
//     const docSnap = await getDoc(docRef);

//     const resuft = docSnap.data();
//     console.log(resuft);
//     const otherUser = resuft?.users.filter(item => item.email != user?.primaryEmailAddress?.emailAddress);
//     console.log(" Test "+otherUser[0]?.name );
//     navigation.setOptions({ headerTitle: otherUser[0]?.name });
//   };
//   const onSend = async (newMessage) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, newMessage));

//        newMessage[0].createdAt = moment().format("MM-DD-YYYY HH:mm:ss");

//     await addDoc(collection(db,'Chat',params.id, 'Messages'),newMessage[0])
//     };
 
//   return (
//        <GiftedChat
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       showUserAvatar={true}
//       user={{
//         _id: user?.primaryEmailAddress?.emailAddress,
//         name: user?.fullName,
//         avatar: user?.imageUrl,
//       }}
     
//     />
//   )
// }
import { View, Text , StyleSheet } from 'react-native'
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, doc, query, where, getDoc, setDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/Config/FirebaseConfigs';
import moment from "moment";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useLocalSearchParams();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetUserDetails();

    const unsubscribe = onSnapshot(
      collection(db, 'Chat', params?.id, 'Messages'),
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));

        // Sort messages by createdAt to display the most recent at the bottom
        const sortedMessages = messagesData.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });

        setMessages(sortedMessages); // Update state with sorted messages
      }
    );

    return () => unsubscribe(); // Cleanup when component unmounts
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, "Chat", params?.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log(result);
    const otherUser = result?.users.filter(
      (item) => item.email !== user?.primaryEmailAddress?.emailAddress
    );
    console.log("Test " + otherUser[0]?.name);
    navigation.setOptions({ headerTitle: otherUser[0]?.name });
  };

  const onSend = async (newMessage) => {
    // Add the current timestamp to the new message
    newMessage[0].createdAt = moment().format("MM-DD-YYYY HH:mm:ss");

    // Add the new message to Firestore
    await addDoc(collection(db, 'Chat', params.id, 'Messages'), newMessage[0]);

    // Update the state with the new message
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
  };

  return (
    <GiftedChat
      messages={messages} // Display messages sorted by createdAt
      onSend={(messages) => onSend(messages)} // Send new message
      showUserAvatar={true} // Show user's avatar
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
      inverted={false} // Set to false to display the most recent message at the bottom
    />
  );
}
