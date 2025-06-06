import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import './styles.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  //Fetch photos of the user
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photoResponse = await fetch(`http://localhost:8081/api/photo/photosOfUser/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!photoResponse.ok) {
          return;
        }
        const data = await photoResponse.json();
        setPhotos(data.photos);
      } catch (error) {
        setMessage(error);
      }
    };

    const fetchUser = async () => {
      try {
        const userResponse = await fetch(`http://localhost:8081/api/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!userResponse.ok){
          return;
        }
        const user = await userResponse.json();
        setUser(user);
      } catch (error) {
        setMessage(error);
      }
    };

    fetchUser();
    fetchPhotos();
  }, [userId]);

  

  return (
    <div>
      <h2>Photos of User {user.last_name}</h2>
      {photos.map((photo, photo_index) => (
        <div key={photo_index}>
          <img
            src={`https://q9zp2l-8081.csb.app/images/${photo.file_name}`}
            alt=""
          />
          <h6>Created: {photo.date_time}</h6>
          <div>
            {photo.comments?.map((comment, comment_index) => {
              return (
                <div key={comment_index}>
                  <p>
                    <b>{comment.user && comment.user.last_name}:</b>
                    {comment.comment}
                  </p>
                  <h6>{comment.date_time}</h6>
                </div>
              );
            })}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
