import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import toast from "react-hot-toast";
import { useDogs } from "../Providers/Contexts";

const initialDogPicture = dogPictures.BlueHeeler;

export const CreateDogForm = () => {
  const [selectedImage, setSelectedImage] = useState(initialDogPicture);
  const [dogName, setDogName] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const { isLoading, createDog } = useDogs();

  const handleSubmit = () => {
    const newDog = {
      image: selectedImage,
      name: dogName,
      description: dogDescription,
      isFavorite: false,
    };

    if (!dogName || !dogDescription)
      return toast.error("Please fill out all fields");
    else {
      createDog(newDog);
      setDogName("");
      setDogDescription("");
      setSelectedImage(initialDogPicture);
    }
  };

  return (
    <form
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
        disabled={isLoading}
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
        disabled={isLoading}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setSelectedImage(e.target.value);
        }}
        value={selectedImage}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" disabled={isLoading} />
    </form>
  );
};
