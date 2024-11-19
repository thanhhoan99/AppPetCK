// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
// import { useUser } from '@clerk/clerk-expo';
// import { Colors } from '@/constants/Colors';
// import PetInfo from '@/components/PetDetails/PetInfo';
// import PetSubinfo from '@/components/PetDetails/PetSubinfo';
// import AboutPet from '@/components/PetDetails/AboutPet';
// import OwnerInfo from '@/components/PetDetails/OwnerInfo';
// import { useRouter } from 'expo-router';
// import { collection, getDoc, doc ,getDocs} from 'firebase/firestore';
// import { db } from '@/Config/FirebaseConfigs';

// export default function PetDetails() {
//   const router = useRouter();
//   const petParams = useLocalSearchParams();
//   const { user } = useUser();
//   const navigation = useNavigation();

//   const [petDetails, setPetDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     navigation.setOptions({
//       headerTransparent: true,
//       headerStyle: {
//         backgroundColor: Colors.PRIMARY,
//       },
//     });

//     // Lấy dữ liệu từ Firebase
//     const fetchPetDetails = async () => {
//       try {
//         const petDoc = await getDoc(doc(db, 'Pets', petParams?.id)); // Thay 'Pets' bằng tên collection thực tế
//         if (petDoc.exists()) {
//           setPetDetails(petDoc.data());
//         } else {
//           console.log('Không tìm thấy dữ liệu con vật nuôi.');
//         }
//       } catch (error) {
//         console.error('Lỗi khi lấy dữ liệu:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPetDetails();
//   }, []);

//   if (loading) {
//     return <Text style={{ textAlign: 'center', marginTop: 20 }}>Đang tải...</Text>;
//   }

//   if (!petDetails) {
//     return <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có dữ liệu để hiển thị.</Text>;
//   }


//   const InitiateChat = async () => {
//     const docId1 = user?.primaryEmailAddress?.emailAddress + '_' + pet?.email;
//     const docId2 = pet?.email + '_' + user?.primaryEmailAddress?.emailAddress;
//     const q = query(collection(db, 'Chat'),where('id', 'in', [docId1, docId2]));
//     const querySnapshot = await getDocs(q);

//   querySnapshot.forEach(async (doc) => {
//     console.log(doc.data());
//     router.push({
//       pathname: '/chat',
//       params: { id: doc.id }})
//     });
//     if (querySnapshot.docs?.length == 0) {
//       await setDoc(doc(db, 'Chat', docId1), {
//         id: docId1,
//         users: [
//           {
//             email: user?.primaryEmailAddress?.emailAddress,
//             imageUrl: user?.imageUrl,
//             name: user?.fullName,
//           },
//           {
//             email: pet?.email,
//             imageUrl: pet?.userImage,
//             name: pet?.username,
//           },
//         ],
//         userIds: [user?.primaryEmailAddress?.emailAddress, pet?.email],
//       });
//       router.push({ pathname: '/chat', params: { id: docId1 } });
//      }

//   }

  
//   return (
//     <View>
//       <ScrollView>
//         <PetInfo pet={petDetails} />
//         <PetSubinfo pet={petDetails} />
//         <AboutPet pet={petDetails} />
//         <OwnerInfo pet={petDetails} />
//         <View style={{ height: 70 }}></View>
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity onPress={InitiateChat} style={styles.adoptBtn}>
//             <Text
//               style={{
//                 fontFamily: 'outfit-medium',
//                 textAlign: 'center',
//               }}
//             >
//               Adopt Me
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   adoptBtn: {
//     padding: 15,
//     backgroundColor: Colors.PRIMARY,
//   },
//   bottomContainer: {
//     position: 'absolute',
//     width: '100%',
//     bottom: 0,
//   },
// });


import { View, Text, ScrollView, TouchableOpacity ,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { Colors } from '@/constants/Colors';
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubinfo from '@/components/PetDetails/PetSubinfo';
import AboutPet from '@/components/PetDetails/AboutPet';
import OwnerInfo from '@/components/PetDetails/OwnerInfo';
import { useRouter } from "expo-router";
import { collection, getDocs,doc, query, where ,setDoc} from 'firebase/firestore';
import { db, storage } from '@/Config/FirebaseConfigs';

export default function PetDetails() {

  const router = useRouter();

  const pet =useLocalSearchParams();
  const {user}=useUser();
  const navigation=useNavigation();
  console.log("Imagess URL:", pet.imageUrl);

  useEffect(() => {
      navigation.setOptions({
        headerTransparent:true,     
          headerStyle:{
              backgroundColor:Colors.PRIMARY
          }
      });
  }, []);

  const InitiateChat = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress + '_' + pet?.email;
    const docId2 = pet?.email + '_' + user?.primaryEmailAddress?.emailAddress;
    const q = query(collection(db, 'Chat'),where('id', 'in', [docId1, docId2]));
    const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    console.log(doc.data());
    router.push({
      pathname: '/chat',
      params: { id: doc.id }})
    });
    if (querySnapshot.docs?.length == 0) {
      await setDoc(doc(db, 'Chat', docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.email,
            imageUrl: pet?.userImage,
            name: pet?.username,
          },
        ],
        userIds: [user?.primaryEmailAddress?.emailAddress, pet?.email],
      });
      router.push({ pathname: '/chat', params: { id: docId1 } });
     }
  // }
// );
  }

  return (
    <View>
      <ScrollView>
      <PetInfo pet={pet}/>
      <PetSubinfo pet={pet}/>
      <AboutPet pet={pet}/>
      <OwnerInfo pet={pet}/>
      <View style={{height:70}}></View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={InitiateChat} style={styles.adoptBtn}>
          <Text style={{ fontFamily: 'outfit-medium',
          textAlign:'center'
          }}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  adoptBtn: {
    padding:15,
    backgroundColor: Colors.PRIMARY,

  },
  bottomContainer:{
    position:'absolute',
    width:'100%',
    bottom:0
  }

});