import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = (props) => {

    const [post, setPost] = useState({});
    const [postCreatorId, setPostCreatorId] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${id}`, { withCredentials: true })
            .then((res) => {

                setPost(res.data.post);
                setPostCreatorId(res.data.post.userId)
                setTitle(res.data.post.title)
                setAddress(res.data.post.address)
                setDescription(res.data.post.description)
                setImageUrl(res.data.post.imageUrl)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const updatePost = (e) => {
        const userId = localStorage.getItem('userId');
        //prevent default behavior of the submit
        e.preventDefault();
        if (title.length < 5 || description.length < 5 || address.length < 5) {
            setErrorMessage('Your form has some unsolved issues!')
        }
        else {
            if (userId == postCreatorId) {
                axios.put(`http://localhost:8000/api/post/${id}`, {
                    title,    // this is shortcut syntax for firstName: firstName,
                    address,
                    description,
                    imageUrl

                }, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res); // always console log to get used to tracking your data!
                        console.log(res.data);
                        setTitle("");
                        setAddress("");
                        setDescription("");
                        setImageUrl("")
                        navigate(-1)
                    })
                    .catch(err => {
                        setErrorMessage("Your api has some problems!")
                        console.log(err)
                    })
            }
            else {
                setErrorMessage('You are not the creator, cant update')
            }
        }
    }

    const deletePost = (postId) => {
        const userId = localStorage.getItem('userId');
        if (userId == postCreatorId) {
            axios.delete(`http://localhost:8000/api/post/${id}`, {
                withCredentials: true
            })
                .then(res => {
                    navigate('/posts')
                })
                .catch(err => console.log(err))
        }
        else {
            setErrorMessage('You are not the creator, cant delete')
        }
    }

    const navigateBack = () => {
        navigate(-1);
    };


    return (
        <div className="px-3 single-main">
            <h1 className="text-center p-2">Update Post</h1>
            {
                errorMessage ?
                    <p className="text-danger text-center">{errorMessage}</p> :
                    null
            }

            <form className="w-75 m-auto" encType="multipart/form-data" onSubmit={(e) => updatePost(e)}>
                <div>
                    <label className="form-label">Title :</label>
                    <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title" />
                </div>
                {title.length > 0 && title.length < 5 ?
                    <p className="text-danger">The title should be 5 characters or more</p> :
                    null
                }
                <div>
                    <label className="form-label">Address :</label>
                    <textarea className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                {address.length > 0 && address.length < 5 ?
                    <p className="text-danger">The address should be 5 characters or longer</p> :
                    null
                }
                <div>
                    <label className="form-label">Description :</label>
                    <textarea className="form-control" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                {description.length > 0 && description.length < 5 ?
                    <p className="text-danger">The description is required</p> :
                    null
                }
                <div>
                    <label className="form-label">Image URL: </label>
                    <input className="form-control" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL goes here" pattern="https?://.+"
                        title="Include http:// or https:// in the URL" />
                </div>
                <div className="d-flex justify-content-between btn-div-create">
                <button className="btn btn-outline-primary customColor s-button">Update the post</button>
                <p className="s-button mt-2 btn-outline-primary edit-cancel" onClick={navigateBack}> Cancel </p>
                </div>

            </form>


            <button className="btn danger btn-delete" onClick={deletePost}>Delete</button>

        </div>
    )
}

export default EditPost;
