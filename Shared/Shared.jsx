import { db } from "@/Config/FirebaseConfigs";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


 const GetFavList=async(user)=>{
    if (!user || !user.primaryEmailAddress) return null;
      const docSnap=await getDoc(doc(db, 'UserFavPet',user?.primaryEmailAddress?.emailAddress ));
      if(docSnap?.exists())
      {
        return docSnap.data();
      }
      else{
        await setDoc(doc(db,'UserFavPet', user?.primaryEmailAddress?.emailAddress),{
            email:user?.primaryEmailAddress?.emailAddress,
            favorites: []
        })
    }
    }

    const UpdateFav=async(user, favorites)=>{
        const docRef=doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress);
        try{
            await updateDoc(docRef,{
                favorites:favorites
            })
        }catch(e){
            console.error("Error updating favorites: ", e);
        }
    }

    export default{
        GetFavList
        ,UpdateFav

    }


