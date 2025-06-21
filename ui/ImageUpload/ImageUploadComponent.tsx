'use client'
import { Alert, Button, Grow, IconButton, Snackbar } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import { ImageUpload, UploadResponse } from "@/lib/serverActions/ImageUploadAction";
import Image from "next/image";

interface ImageUploadProps {
  success:boolean | undefined,
  setImageUrl: (url:string) => void
  initialUrl?:string | null
}

export default function ImageUploadComponent({props}:{props:ImageUploadProps}){
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(props.initialUrl ?? null)
  const [imageReady, setImageReady] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [upload, setUpload] = useState(false)

  useEffect(()=>{
    if(props.success){
      setPreviewImage('')
    }
  }, [props.success])


  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;
  
      const file = e.target.files[0];
      if (file.type.split('/')[0] !== 'image' || file.size > 4300000) throw new Error("Image must be a valid image file and less than 5MB");
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.onload = () => {
          try {
            if (img.width !== img.height) throw new Error("Image must be square");
            
            setPreviewImage(reader.result);
            setUpload(true);
          } catch (error) {
            if (error instanceof Error) {
              setErrorMessage(error.message);
              setError(true);
            }
          }
        };
        img.src = reader.result as string;
      };
  
      reader.readAsDataURL(file);
      setImageReady(file);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setError(true);
      }
    }
  };



  const handleUpload = async () => {
    try {
      if(!imageReady) return
      setLoading(true)
      const url = await ImageUpload(imageReady)
      setLoading(false)
      props.setImageUrl(url)
      setSnackbar(true)
      setUpload(false)
      setPreviewImage(url)
      return
    } catch{
      setLoading(false)
      setError(true)
    }
  };


  return(
    <div className="flex flex-col items-center justify-center w-full">
      
      <div className="flex flex-col items-center justify-center w-64 h-64 rounded-lg overflow-hidden bg-neutral-900" style={{boxShadow: '0 0 30px #9607f5', border: '0.5px solid #9607f5'}}>
        {typeof previewImage === 'string' && !props.success && <Image src={previewImage} alt="Uploaded preview" height={300} width={300} unoptimized/>}
        {typeof previewImage !== 'string' && <IconButton size="large" disabled><ImageIcon sx={{width:"100px", height:"100px"}} /></IconButton>}
      </div>
      <label form="dropzone-file" className="flex flex-col items-center justify-center w-32 h-10 rounded-lg cursor-pointer hover:bg-purple-900 border my-5" style={{borderColor: '#9607f5'}}>
        <CloudUploadIcon color="primary"/>
        <input id="dropzone-file" type="file" className="hidden" onChange={(e)=>{ 
        handleImageUpload(e)
        }} />
      </label>

      {upload && <Button onClick={handleUpload} variant="contained" disabled={loading} color="primary">Upload Image</Button>}

      <Snackbar open={snackbar} TransitionComponent={Grow} autoHideDuration={3000} anchorOrigin={{vertical:'top', horizontal:'center'}} onClose={()=>setSnackbar(false)} message="Image uploaded successfully">
        <Alert
        onClose={()=>setSnackbar(false)}
        severity="success"
        variant="filled"
        >
          Image uploaded successfully
        </Alert>
      </Snackbar>
      <Snackbar open={error} TransitionComponent={Grow} autoHideDuration={5000} anchorOrigin={{vertical:'top', horizontal:'center'}} onClose={()=>setError(false)} message="Image uploaded successfully">
        <Alert
        onClose={()=>setError(false)}
        severity="error"
        variant="filled"
        >
          {errorMessage ?? "An error occurred uploading the image"}
        </Alert>
      </Snackbar>


      
    </div> 
  )
}