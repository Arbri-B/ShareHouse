import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../AuthContext';

const CreatePost = (props) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [preferedGender, setPreferedGender] =useState("");
    const [totalOccupants, setTotalOccupants] = useState(1);
    const [freeSpots, setFreeSpots] = useState(1);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const userId = localStorage.getItem('userId');
    const [errorMessage, setErrorMessage] = useState("");

    const navigateBack = () => {
        navigate(-1);
    };

    const createPost = async (e) => {
        e.preventDefault();

        try {
            if (title.length < 5 || address.length < 5 || description.length < 5) {
                setErrorMessage('Your form has some unsolved issues!');

                
            } else {
                console.log(
                    title,
                    preferedGender,
                    totalOccupants,
                    freeSpots,
                    address,
                    description,
                    imageUrl,
                    userId,
                )
                axios.post('http://localhost:8000/api/post', {
                    title,
                    preferedGender,
                    totalOccupants,
                    freeSpots,
                    address,
                    description,
                    imageUrl,
                    userId,
                }, {
                    withCredentials: true,
                });

                navigate('/posts');
            }
        } catch (error) {
            setErrorMessage("Your API has some problems!");
            console.log(error);
        }
    };

    return (
        <div className="px-3 create-main">
            
            <h1 className="text-center p-2">Create a Post</h1>
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            
            <form className="w-75 m-auto" onSubmit={(e) => createPost(e)}>
                <div>
                    <label className="form-label">Title :</label>
                    <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title" />
                    {title.length > 0 && title.length < 5 &&
                        <p className="text-danger">The title should be 5 characters or more</p>
                    }
                </div>

                <div>
                    <label className="form-label">Prefered Gender :</label>
                    <select value={preferedGender} onChange={(e) => setPreferedGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Coed">Coed</option>
                    </select>
                </div>
                
                <div>
                    <label className="form-label">Numer of occupants :</label>
                    <input className="form-control" type="number" min={1} max={5} value={totalOccupants} onChange={(e) => setTotalOccupants(e.target.value)} />
                </div>

                <div>
                    <label className="form-label">Numer of free spots :</label>
                    <input className="form-control" type="number" min={1} max={5} value={freeSpots} onChange={(e) => setFreeSpots(e.target.value)} />
                </div>

                <div>
                    <label className="form-label">Address :</label>
                    <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                    {address.length > 0 && address.length < 5 &&
                        <p className="text-danger">The address should be 5 characters or longer</p>
                    }
                </div>
                <div>
                    <label className="form-label">Description :</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                    {description.length > 0 && description.length < 5 &&
                        <p className="text-danger">The description should be 5 characters or longer</p>
                    }
                </div>
                <div>
                        <label className="form-label">Image URL: </label>
                        <input className="form-control" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL goes here" pattern="https?://.+"
                            title="Include http:// or https:// in the URL" />
                    </div>
                    <div className="d-flex justify-content-between btn-div-create">
                <button className="btn btn-outline-primary customColor mt-2 s-button">Create the post</button>
                <p className="s-button mt-2 btn-outline-primary " onClick={navigateBack}> Cancel </p>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
