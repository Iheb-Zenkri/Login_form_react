import React, { useState } from 'react'
import { MdCloudUpload , MdDelete} from 'react-icons/md'
import { AiFillFileImage } from'react-icons/ai'
const UploadFile = (props) => {

    const {label,image,setImage, name} = props
    const [fileName, setFileName] = useState("No selected file")
    
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          setFileName(files[0].name);
          setImage(files[0]);
        }
    }

    const handleDelete = () => {
        setFileName("No selected file");
        setImage(null);
      };
  return (
    <div  className='uploadFile'>
       <label>{label}</label>
        <form  onClick={() => document.getElementById(name).click()} >
            <input  id={name}
                    name={name}
                    type='file'
                    accept='image/*'
                    hidden
                    onChange={handleFileChange}
             />
            {image ? (
            <img src={URL.createObjectURL(image)} width={80} height={50} alt={fileName} />
            ) : (
            <>
            <MdCloudUpload  color='#ff4b2b' size={50} />
            </>
            ) }
        </form>
        <section className='uploaded-row'>
            <AiFillFileImage color='#ff4b2b' size={20} />
            <span> {fileName} </span>
            <MdDelete size={20} color='#ff416c' onClick={handleDelete} />
        </section>
        
    </div>
)}

export default UploadFile