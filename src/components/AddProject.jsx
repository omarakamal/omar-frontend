import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

import projectsService from "../services/projects.service";
function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);
  const [errorMessage,setErrorMessage] = useState(null)

  const [imageUrl, setImageUrl] = useState(null)
  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    axios.post('http://localhost:5005/api/upload',uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        //setImageUrl(response.data.fileUrl);
         console.log(response.data.fileUrl)
         setImageUrl(response.data.fileUrl)
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };


        <input type="file" onChange={(e)=>{handleFileUpload(e)}}/>




  

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, rating, imageUrl };

    projectsService.createProject(requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        props.refreshProjects();
      })
      .catch((error) => {console.log(error)
                        setErrorMessage(error.response.data.message)});
  };


  return (
    <div className="AddProject">
      <h3 id="add-project">Add Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h1></h1>

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <input type="file" onChange={(e)=>{handleFileUpload(e)}} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProject;