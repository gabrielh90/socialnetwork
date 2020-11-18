import React, { useState, useEffect } from "react"; 
import axios from 'axios'

  const UploadFiles = () => {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
  
    const [fileInfos, setFileInfos] = useState([]);
  
    const instance = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
          "Content-type": "application/json"
        }
    })

    const uploadService = (file, onUploadProgress) => {
      let formData = new FormData();
    
      formData.append("file", file);
    
      return instance.post("/newacc", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    };
    
    const getFilesService = () => {
      return axios.get("http://localhost:5000/files");
    };


    const selectFile = (event) => {
      setSelectedFiles(event.target.files);
    };

    const upload = () => {
      let currentFile = selectedFiles[0];

      setProgress(0);
      setCurrentFile(currentFile);

      uploadService(currentFile, (event) => {
        // console.log(event)
        setProgress(Math.round((100 * event.loaded) / event.total));
      })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data);
        return getFilesService();
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

      setSelectedFiles(undefined);
    };

    useEffect(() => {
        getFilesService().then((response) => {
            // console.log(response.data)
            setFileInfos(response.data);
        });
    }, []);

    return (
        <div>
          {currentFile && (
            <div className="progress">
              <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progress + "%" }}
              >
                {progress}%
              </div>
            </div>
          )}
    
          <label className="btn btn-default">
            <input type="file" onChange={selectFile} />
          </label>
    
          <button
            className="btn btn-success"
            disabled={!selectedFiles}
            onClick={upload}
          >
            Upload
          </button>
    
          <div className="alert alert-light" role="alert">
            {message}
          </div>
    
          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {fileInfos &&
                fileInfos.map((file, index) => (
                  <li className="list-group-item" key={index}>
                    <a href={file.url}>{file.name}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );

  }
  
export default UploadFiles