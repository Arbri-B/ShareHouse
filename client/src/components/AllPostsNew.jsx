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

    const [displayAll, setDisplayAll] = useState(true);
    const [displayFemale, setDisplayFemale] = useState(false);
    const [displayCoed, setDisplayCoed] = useState(false);
    const [displayMale, setDisplayMale] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get("http://localhost:8000/api/posts", {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data);
                setPosts(res.data.posts);
                setFilteredPosts(res.data.posts);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        
        if (displayAll) {
            setFilteredPosts(posts);
        } else if (displayFemale) {
            setFilteredPosts(posts.filter(post => post.preferedGender === 'Female'));
        } else if (displayCoed) {
            setFilteredPosts(posts.filter(post => post.preferedGender === 'Coed'));
        } else if (displayMale) {
            setFilteredPosts(posts.filter(post => post.preferedGender === 'Male'));
        }
    }, [displayAll, displayFemale, displayCoed, displayMale, posts]);

    useEffect(() => {
        
        const searchResults = posts.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.description.toLowerCase().includes(search.toLowerCase()) ||
            post.preferedGender.toLowerCase().includes(search.toLowerCase()) ||
            post.address.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPosts(searchResults);
    }, [search, posts]);


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

                    <div>
                        <button onClick={() => { setDisplayAll(true); setDisplayFemale(false); setDisplayCoed(false); setDisplayMale(false); }}>All</button>
                        <button onClick={() => { setDisplayAll(false); setDisplayFemale(true); setDisplayCoed(false); setDisplayMale(false); }}>Female</button>
                        <button onClick={() => { setDisplayAll(false); setDisplayFemale(false); setDisplayCoed(false); setDisplayMale(true); }}>Male</button>
                        <button onClick={() => { setDisplayAll(false); setDisplayFemale(false); setDisplayCoed(true); setDisplayMale(false); }}>Coed</button>
                    </div>
                    <div className="col">
                        {
                            filteredPosts.length > 0 ? (
                                filteredPosts.map((post, index) => {
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
                                }))
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
