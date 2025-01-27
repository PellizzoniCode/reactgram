import "./Profile.css";

import { uploads } from "../../utils/config";
import Message from "../../components/Message";

import { Link, useParams } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: authUser } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const photoData = {
      title,
      image,
    };

    const formData = new FormData();
    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");

    resetComponentMessage();
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleDelete = (id) => {
    console.log("Delete photo", id);
    dispatch(deletePhoto(id));
    resetComponentMessage();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === authUser._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}></div>
          <h3>Compartilhe algum momento seu:</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título para a foto:</span>
              <input
                type="text"
                placeholder="Insira um título"
                onChange={(e) => setTitle(e.target.value)}
                value={title || ""}
              />
            </label>
            <label>
              <span>Imagem:</span>
              <input type="file" onChange={handleFile} />
            </label>
            {!loadingPhoto && <input type="submit" value="Postar" />}
            {loadingPhoto && (
              <input type="submit" value="Aguarde..." disabled />
            )}
            {errorPhoto && <Message msg={errorPhoto} type="error" />}
            {messagePhoto && <Message msg={messagePhoto} type="success" />}
          </form>
        </>
      )}

      <div className="user-photos">
        <h2>Fotos Publicadas</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo, index) => {
              if (!photo || !photo._id || !photo.image) return null;
              return (
                <div className="photo" key={photo._id}>
                  {photo.image && (
                    <img
                      src={`${uploads}/photos/${photo.image}`}
                      alt={photo.title}
                    />
                  )}
                  {id === authUser._id ? (
                    <div className="actions">
                      <Link to={`/photo/${photo._id}`}>
                        <BsFillEyeFill />
                      </Link>
                      <BsPencilFill />
                      <BsXLg onClick={() => handleDelete(photo._id)} />
                    </div>
                  ) : (
                    <Link className="btn" to={`/photo/${photo._id}`}>
                      Ver
                    </Link>
                  )}
                </div>
              );
            })}
          {photos.length === 0 && <p>Nenhuma foto publicada</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
