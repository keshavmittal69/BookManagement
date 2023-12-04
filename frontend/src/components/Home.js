import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createurl, log } from '../env';

function Home() {
    const [books, setBooks] = useState([]);
    const [book, ] = useState({_id:0, title:'', author:'', summary:''});
    const [_id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [summary, setSummary] = useState('');
    const [cnt, setCnt] = useState(0);
    const [live, setLive] = useState(true);

    useEffect(()=>{
        getData();
    }, []);

    useEffect(()=>{
    }, [book, books, cnt, live, _id, title, author, summary]);

    const getData = async() => {
        const url = createurl('');
        axios.get(url)
        .then(res => {
            log(res);
            setBooks(res.data.books);
            setCnt(res.data.books.length);
        })
        .catch(error => {
            log(error);
            setLive(false);
        });
    };

    const addBook = async() => {
        if(title==='' || author==='' || summary===''){
          toast.error('All fields are required', {autoClose: 1500, theme: 'colored'});
        }
        else{
          const url = createurl('');
          axios.post(url, {
              "title": title,
              "author": author,
              "summary": summary,
          })
          .then(res => {
            log(res);
              getData();
              toast.success('Book added successfully', {autoClose: 1500, theme: 'colored'});
              setTitle('');
              setAuthor('');
              setSummary('');
              setId(0);
          })
          .catch(error => {
            log(error);
              setLive(false);
          });
        }
    };

    const setBookId = async(id) => {
        sessionStorage.setItem('bookId', id);

        const url = createurl(`/${id}`);
        axios.get(url)
        .then(res => {
            log(res);
            setId(res.data.book._id);
            setTitle(res.data.book.title);
            setAuthor(res.data.book.author);
            setSummary(res.data.book.summary);
        })
        .catch(error => {
            log(error);
            setLive(false);
        });;
    };

    const deleteBook = async() => {
        const url = createurl(`/${_id}`);
        axios.delete(url)
        .then(res => {
            log(res);
            getData();
            toast.success('Book deleted successfully', {autoClose: 1500, theme: 'colored'});
            setTitle('');
            setAuthor('');
            setSummary('');
            setId(0);
        })
        .catch(error => {
            log(error);
            setLive(false);
        });;
    };

    const editBook = async() => {
      if(title==='' || author==='' || summary===''){
        toast.error('All fields are required', {autoClose: 1500, theme:'colored'});
      }
        else{
          const url = createurl(`/${_id}`);
          axios.put(url, {
              "title": title,
              "author": author,
              "summary": summary,
          })
          .then(res => {
            log(res);
              getData();
              toast.success('Book updated successfully', {autoClose: 1500, theme: 'colored'});
              setTitle('');
              setAuthor('');
              setSummary('');
              setId(0);
          })
          .catch(error => {
            log(error);
              setLive(false);
          });
        }
    };


  return (<>
    {/* ======================================================== */}

<div className="modal fade" id="addBookModal" tabindex="-1" aria-labelledby="addBookModalLabel" aria-hidden="true">
<div className="modal-dialog">
<div className="modal-content">
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add a book</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
        <input type="text" className="form-control" id="" placeholder="Enter title"
                            required onChange={(e) => {setTitle(e.target.value)}}/>
        <input type="text" className="form-control" id="" placeholder="Enter author"
                            required onChange={(e) => {setAuthor(e.target.value)}}/>
        <textarea className="form-control" id="" placeholder="Enter summary" cols="30" rows="4"
                            required onChange={(e) => {setSummary(e.target.value)}}></textarea>
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-success" onClick={addBook} 
        data-bs-toggle="modal" data-bs-target="#addBookModal">Submit</button>
    </div>
</div>
</div>
</div>

    {/* ======================================================== */}
  
<div className="modal fade" id="editBookModal" tabindex="-1" aria-labelledby="editBookModalLabel" aria-hidden="true">
<div className="modal-dialog">
<div className="modal-content">
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit a book</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
        <input type="text" className="form-control" id="" placeholder="Enter title"
                    value={title} required onChange={(e) => {setTitle(e.target.value)}}/>
        <input type="text" className="form-control" id="" placeholder="Enter author"
                    value={author} required onChange={(e) => {setAuthor(e.target.value)}}/>
        <textarea className="form-control" id="" placeholder="Enter summary" cols="30" rows="4"
                    value={summary} required onChange={(e) => {setSummary(e.target.value)}}></textarea>
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={editBook} 
        data-bs-toggle="modal" data-bs-target="#editBookModal">Update</button>
    </div>
</div>
</div>
</div>

{/* ======================================================== */}
  
<div className="modal fade" id="deleteBookModal" tabindex="-1" data-bs-delay="1500" aria-labelledby="deleteBookModalLabel" aria-hidden="true">
<div className="modal-dialog">
<div className="modal-content">
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="deleteModalLabel">Are you sure?</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={deleteBook}
            data-bs-toggle="modal" data-bs-target="#deleteBookModal">Yes</button>
        <button type="button" className="btn btn-warning"
            data-bs-toggle="modal" data-bs-target="#deleteBookModal">No</button>
    </div>
</div>
</div>
</div>

    {/* ======================================================== */}

<div className="main-box">

<div className="row">
    <div className="col-xl-2 col-md-2 col-1"></div>
    <div className="col-xl-8 col-md-8 col-10">
    
    <div className="header">
        Book Management Project
    </div>

<div className="container-flex">
    <div className="add">
        <button data-bs-toggle="modal" data-bs-target="#addBookModal" 
        className="btn btn-warning">Add Book</button>
    </div>
    <div className="count">
        <h4>No. of books: {cnt}</h4>
    </div>
</div>

<hr />

    <div className="row my-2 gy-3">
        {
            live === false ?
            <div className="row">
                <div className="col_xl-3 col-1"></div>
                <div className="col_xl-6 col-10 dead">
                    <h1>Server is under maintenance.<br/>
                    Please try again later.</h1>
                </div>
                <div className="col_xl-3 col-1"></div>
            </div>
            :(cnt === 0 ? 
            <div className="row">
                <div className="col_xl-3 col-1"></div>
                <div className="col_xl-6 col-10 empty">
                    <h1>Books collection is empty.<br/>
                    Please add books.</h1>
                </div>
                <div className="col_xl-3 col-1"></div>
            </div>:
            books.map((book) => {
                return(
                <div className="col-xl-4 col-sm-6 col-12">
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className='card-title'>{book.title}</h5>
                        <h6 className='card-author'>{book.author}</h6>
                        <p className='card-summary'>{book.summary}</p>
                    </div>
                    <div className="icons">
                        <center>
                        <i className="fa-solid fa-pen-to-square mx-3 edit" 
                        data-bs-toggle="modal" data-bs-target="#editBookModal"
                        onClick={() => setBookId(book._id)}></i>
                        <i className="fa-solid fa-trash mx-3 delete" 
                        data-bs-toggle="modal" data-bs-target="#deleteBookModal"
                        onClick={() => setBookId(book._id)}></i>
                        </center>
                    </div>
                </div>
                </div>
                )
            })
            )
        }
    </div>

    </div>
    <div className="col-xl-2 col-md-2 col-1"></div>
</div>
</div>
  
  </>
  )
}

export default Home