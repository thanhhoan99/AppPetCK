import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/Config/FirebaseConfigs';
import UserItem from './../../components/Inbox/UserItem';
import { useUser } from '@clerk/clerk-expo';

export default function Inbox() {
  const { user } = useUser(); // Thông tin người dùng hiện tại
  const [userList, setUserList] = useState([]); // Danh sách cuộc trò chuyện
  const [loader, setLoader] = useState(false); // Trạng thái tải dữ liệu

  // Lắng nghe dữ liệu từ Firestore khi component được render
  useEffect(() => {
    const unsubscribe = user && listenToChats();
    return () => unsubscribe && unsubscribe(); // Hủy lắng nghe khi component unmount
  }, [user]);

  // Hàm lắng nghe thay đổi dữ liệu trên Firestore
  const listenToChats = () => {
    const currentUserEmail = user?.primaryEmailAddress?.emailAddress;
    const q = query(
      collection(db, "Chat"),
      where("userIds", "array-contains", currentUserEmail)
    );

    // Lắng nghe thay đổi dữ liệu
    return onSnapshot(q, (snapshot) => {
      const updatedList = snapshot.docs.map((doc) => doc.data());
      setUserList(updatedList); // Cập nhật danh sách chat
    });
  };

  // Lọc danh sách người dùng khác trong các cuộc trò chuyện
  const MapOtherUserList = () => {
    const list = [];
    const currentUserEmail = user?.primaryEmailAddress?.emailAddress;

    userList.forEach((record) => {
      const otherUser = record.users?.find(
        (u) => u.email !== currentUserEmail // Lấy email của người dùng khác
      );

      if (otherUser) {
        list.push({
          docId: record.id, // ID tài liệu của cuộc trò chuyện
          ...otherUser, // Thông tin người dùng khác
        });
      }
    });
    return list;
  };

  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold' }}>Inbox</Text>

      <FlatList
        data={MapOtherUserList()} // Danh sách người dùng khác
        refreshing={loader} // Hiển thị trạng thái tải lại
        onRefresh={listenToChats} // Làm mới dữ liệu
        keyExtractor={(item) => item.docId} // Đảm bảo mỗi mục có key duy nhất
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <UserItem userInfo={item} /> // Hiển thị mỗi người dùng
        )}
      />
    </View>
  );
}


// import { View, Text ,FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useRouter } from "expo-router";
// import { collection, getDocs,doc, query, where ,setDoc} from 'firebase/firestore';
// import { db, storage } from '@/Config/FirebaseConfigs';
// import UserItem from './../../components/Inbox/UserItem'
// import { useUser } from '@clerk/clerk-expo';

// export default function Inbox() {
//   //Get User List Depens on Current User Email
//   const { user } = useUser();
//   const [userList, setUserList] = useState([]);
//   const [loader, setLoader] = useState(false);

//   useEffect(() => {
//     user && GetUserList();
//   }, [user]);

//   const GetUserList = async () => {
//     setLoader(true);
//     setUserList(userList);
//     const q = query(
//       collection(db, "Chat"),
//       where(
//         "userIds",
//         "array-contains",
//         user?.primaryEmailAddress?.emailAddress
//       )
//     );
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//       setUserList((prevList) => [...prevList, doc.data()]);
//     });
//     setLoader(false);
//   };

//   //Filter the the list of other users in one state
//   const MapOtherUserList = () => {
//     const list = [];
//     userList.forEach((record) => {
//       const otherUser = record.users?.filter(user => user?.email != user?.primaryEmailAddress?.emailAddress);
//       const resuft = {
//         docId: record.id,
//         ...otherUser[0],
//       };
//       list.push(resuft);
//     });
//     return list;
//   };
//   return (
//     <View style={{ marginTop: 20, padding: 20 }}>
//       <Text style={{ fontSize: 30 }}>Inbox</Text>

//       <FlatList
//         data={MapOtherUserList()}
//         refreshing={loader}
//         onRefresh={GetUserList}
//         style={{ marginTop: 20 }}
//         renderItem={({ item, index }) => (
//           <UserItem userInfo={item} key={index} />
//         )}
//       />
//     </View>
//   );
// }
