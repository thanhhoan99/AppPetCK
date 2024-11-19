import { View, Text ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from './../../Config/FirebaseConfigs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Category from './Category';
import PetListItem from './PetListItem';
import PetInfo from '../PetDetails/PetInfo';


export default function PetListByCategory() {

    const [petList,setPetList]=useState([]);
    const [loader,setLoader]=useState(false);

    useEffect(()=>{
        GetPetList('Dogs')
    },[])

    /**
     * 
     * @param {*} category 
     */

    const GetPetList=async (category)=>{
      setLoader(true)
      setPetList([]);
      const q=query(collection(db,'Pets'),where('category','==',category));
      const querySnapshot=await getDocs(q);
    
      querySnapshot.forEach((doc)=>{
          console.log(doc.data());
          setPetList(prev=>[...prev,doc.data()])
          // setPetList(petList=>[[...petList,doc.data()]])
      })
      setLoader(false)
    };
  return (
    <View>
        <Category category={(value)=>GetPetList(value)}/>
        <FlatList
        data={petList}
        horizontal={true}
        refreshing={loader}
        onRefresh={()=>GetPetList('Dogs')}
        renderItem={({item,index})=>(
         <PetListItem pet={item}/>
        )}   />
          {/* <PetInfo pet={item}/> */}
    </View>
  )
}