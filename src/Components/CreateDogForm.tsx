import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import toast from "react-hot-toast";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const [dogName, setDogName] = useState("");
    const [dogDescription, setDogDescription] = useState("");

    const handleSubmit = () => {
      const newDog = {
        name: dogName,
        description: dogDescription,
        picture: selectedImage,
      };

      if(!dogName || !dogDescription) return toast.error("Please fill out all fields");
      else console.log(newDog);
    }


    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input 
          id="name"
          type="text"
          value={dogName}
          onChange={(e) => {
            setDogName(e.target.value);
          }} 
        />

        <label htmlFor="description">Dog Description</label>
        <textarea  
          id="description" 
          cols={80} 
          rows={10}
          value={dogDescription}
          onChange={(e) => {
            setDogDescription(e.target.value);
          }}
        ></textarea>
        
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
