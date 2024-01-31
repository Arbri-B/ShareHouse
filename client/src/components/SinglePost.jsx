import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Navbar from "./Navbar";

const DisplayOne = (props) => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const userId = localStorage.getItem('userId');

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDNOnnW2lR3qZJqjZ8ZO2w4K0ajm-zmyGA",
    });


    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${id}`, {
            withCredentials: true,
        })
            .then((res) => {
                setPost(res.data.post);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const mapContainerStyle = {
        width: "80%",
        height: "200px",
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <>
        <Navbar/>
        <div className="single-main">
            <div className=" single-card d-flex justify-content-between align-items-center">
                <div className="single-card-text">
                    <h1>{post.title}</h1>
                    <h4>{post.address}</h4>
                    <p>{post.description}</p>
                    {
                userId == post.userId ?
                    <Link className="card-title single-card-edit" to={`/post/edit/${post._id}`}>Edit</Link> :
                    null
            }
                </div>
                <img className="single-card-img" src={post.imageUrl} alt={post.title}/>
            </div>

            <div className="single-map">
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={20}
                center={{
                    lat: post.lat,
                    lng: post.long,
                }}
            >
                <MarkerF
                    icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                    position={{
                        lat: post.lat,
                        lng: post.long,
                    }}
                />
            </GoogleMap>
            </div>


        </div>
        </>
    );
};

export default DisplayOne;
