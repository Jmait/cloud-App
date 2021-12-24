
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';



export const downloadImageLocally = async(url,image)=>{
    try {
      /****TODO: uninstall expo-permissions library.... it has been deprecated ***/
      const gifDir = FileSystem.documentDirectory + `Haven/${image.fileName}`;
      const fileUri = gifDir +`Haven/${image.fileName}`
      const dirInfo = await FileSystem.getInfoAsync(gifDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
    }
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
     if (!fileInfo.exists) {
       const file = await FileSystem.downloadAsync(url,gifDir);
       const myfile = {
           location: file.uri,
           fileName: image.fileName,
           fileSize: image.fileSize,
           tag: image.tag
       }
       const SavedFiles = await AsyncStorage.getItem('local-files');
       if(!SavedFiles){
           await AsyncStorage.setItem('local-files',JSON.stringify([myfile]));
           Alert.alert("Success","File Successfully added to download folder");
       }else{
        const file = JSON.parse(SavedFiles)
        const newFile = [...file, myfile];
        await AsyncStorage.setItem('local-files',JSON.stringify(newFile));
        Alert.alert("Success","File Successfully added to download folder");
       }
     }
  
  }catch(e){
    Alert.alert("Error",e.message)
  }
  }


  export const deleteLocalFile =async(image)=>{
        try {
        const item = await AsyncStorage.getItem('local-files');
        const f = JSON.parse(item);
         const r = [...f];
        const g=   r.filter(r=>r.location!=image.location);
        await AsyncStorage.setItem('local-files', JSON.stringify(g));
        Alert.alert("success","File Successfully deleted")
        } catch (error) {
            Alert.alert(error.message);
        }
  }


  export const RenameTag=async(fileId)=>{
      try {
          
      } catch (error) {
          
      }
  }