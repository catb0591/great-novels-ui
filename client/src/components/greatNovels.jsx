import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css';

const GreatNovels = () => {
    const [title, setTitle] = useState('')
    const [novels, setNovels] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])

    useEffect(() => {
        const fetchNovels = async () => {
            const fetchedData = await axios.get('http://localhost:1337/api/novels')

            setNovels(fetchedData.data)
        }
        fetchNovels()
    }, [])

    useEffect(() => {
        const searchedNovels = novels.filter(novel => novel.title.toLowerCase().includes(title.toLowerCase()))
        setFilteredBooks(searchedNovels)
    }, [title, novels])

    return (
        <div className="page">
            <h1 className="title">Great Novels</h1>
            <input className="input" type="text" onChange={(event) => setTitle(event.target.value)} />
            {filteredBooks.map(novel => {   
                return (
                    <div className="novelList" key={novel.id}>
                        <h2>{novel.title} by {novel.author.nameFirst} {novel.author.nameLast}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default GreatNovels;