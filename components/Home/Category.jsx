// import { View, Text ,FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Colors } from '@/constants/Colors'
// import {db} from './../../Config/FirebaseConfigs'
// import { collection, getDocs, query } from 'firebase/firestore'
// import { useRouter } from 'expo-router'


// export default function Category({category}) {

//   const [categoryList,setCategoryList]=useState([]);
  
//   const [selectedCategory,setSelectedCategory]=useState('Dogs');
  
//   const router=useRouter();
//     useEffect(()=>{
//         GetCategories();
//     },[]);

//     const GetCategories=async()=>{
//         setCategoryList([]);
//         const q=query(collection(db,'Category'));
//         const querySnapshot=await getDocs(q);

//         querySnapshot.forEach((doc)=>{
//             console.log(doc.data());
//             setCategoryList(prev=>[...prev,doc.data()])
//         })
//     }
//     // const onCategoryPressHandler=(item)=>{
//     //   if(!explore){
//     //     router.push('/businesslist/'+item.name)
//     //   }else{
//     //     onCategorySelect(item.name)
//     //   }
//     // }
//   return (
    
//     <View>
//          <View style={{
//             display:'flex',
//             flexDirection:'row',
//             marginTop:10,  
//             padding:10,
//             justifyContent:'space-between'
//       }}>
//         <Text style={{
//                 fontFamily:'outfit-bold',
//                 fontSize:20,
                          
//       }}>   Category 
//         </Text>
//         <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-medium'}}>View All</Text>
//         </View>
//         <FlatList
//         data={categoryList}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({item,index})=>(
//           <TouchableOpacity onPress={()=>{setSelectedCategory(item.name); category(item.name)}}>
//           <View style={[style.container,selectedCategory==item.name&&style.selectedCategoryContainer]}>
//             <Image source={{uri:item?.imageUrl}} style={{width:50 ,height: 40}}/>   
//           </View>
//           <Text style={{fontFamily:'outfit-medium',textAlign:'center'}}>{item?.name}</Text>
//           </TouchableOpacity>
//         )}
//     />
//     </View>
//   )
// }

// const style= StyleSheet.create({
//   container:{
//     paddingLeft:10 , backgroundColor:Colors.VANG ,
//                         borderWidth:1,borderColor:Colors.PRIMARY,margin:5,
//                         alignItems:'center',
//                         padding:10,
//                         borderRadius:8
//   },
//   selectedCategoryContainer:{
//     backgroundColor:Colors.PRIMARY
//   }
// })
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { db } from './../../Config/FirebaseConfigs';
import { collection, getDocs, query } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dogs');

  const router = useRouter();

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Category</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>
      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              category(item.name);
            }}
            style={[
              styles.cardContainer,
              selectedCategory === item.name && styles.selectedCardContainer,
            ]}
          >
            <Image source={{ uri: item?.imageUrl }} style={styles.image} />
            <Text
              style={[
                styles.cardText,
                selectedCategory === item.name && styles.selectedCardText,
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: Colors.PRIMARY,
  },
  viewAllText: {
    fontFamily: 'outfit-medium',
    color: Colors.GRAY,
    fontSize: 14,
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
  cardContainer: {
    marginRight: 10,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2, // Tạo hiệu ứng đổ bóng nhẹ
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCardContainer: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // Làm ảnh tròn nếu cần
    marginBottom: 5,
  },
  cardText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: Colors.GRAY,
    textAlign: 'center',
  },
  selectedCardText: {
    color: Colors.WHITE,
  },
});
