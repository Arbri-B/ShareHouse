import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import { useAuth } from '../AuthContext';
import Navbar from "./Navbar";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const AllPostsNew = (props) => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState("")
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get("http://localhost:8000/api/posts", {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data);
                setPosts(res.data.posts);
            })
            .catch((err) => {
                console.log(err);
            })


    }, [])


    return (
        <>
            <Navbar />
            <div className="all-main">

                <div className="row all-main">
                    <Form>
                        <InputGroup className='my-3'>

                            {/* onChange for search */}
                            <Form.Control
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search'
                            />
                        </InputGroup>
                    </Form>
                    <div className="col">
                        {
                            posts.length > 0 ?
                            
                                posts.map((post, index) => {
                                    return (

                                        <div key={index} className="card">
                                            <div className="card-body d-flex justify-content-around">
                                                <div className="card-text">
                                                    <Link className="card-title" to={`/post/${post._id}`}>{post.title}</Link>
                                                    <p className="card-text-desc">Prefered Gender: {post.preferedGender}</p>
                                                    <p className="card-text-desc">Occupants: {post.totalOccupants}</p>
                                                    <p className="card-text-desc">Free spot: {post.freeSpots}</p>
                                                    <h6 className="card-subtitle mb-2 text-muted"></h6>
                                                    <p className="card-text-add">{post.address}</p>
                                                    <p className="card-text-desc">{post.description}</p>
                                                    {
                                                        userId == post.userId ?
                                                            <Link className="card-title single-card-edit" to={`/post/edit/${post._id}`}>Edit</Link> :
                                                            null
                                                    }
                                                </div>
                                                <img src={post.imageUrl} alt={post.title} width="250" height="200" />                                        </div>
                                        </div>

                                    )
                                })
                                :
                                <div className="w-100">
                                    <div className="card text-center w-100">
                                        <div className="card-header">
                                            There are no posts yet!
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Feeling inspired?</h5>
                                            <p className="card-text">Go ahead and</p>
                                            <Link to={'/post/new'}>Create a new post!</Link>
                                        </div>

                                    </div>
                                </div>



                        }
                    </div>


                </div>

            </div>
        </>
    )
}
export default AllPostsNew;
