import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {Row, Col, Button, Form} from 'react-bootstrap'

const BookPage = () => {
    
    const ref_query = useRef(null);

    const [loading, setLoading] = useState(false)
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [is_end, setIs_end] = useState(false);
    const [query, setQuery] = useState('리액트');


    const getBooks = async() =>{
        const url="https://dapi.kakao.com/v3/search/book?target=title"
        const config ={
            headers: {"Authorization":"KakaoAK fe5d834807d7408f7fa1f91b3cec4c23"},
            params :{"query": query, "size":6, "page":page}

        }
        setLoading(true);
        const result=await axios.get(url,config);
        setBooks(result.data.documents);
        setTotal(result.data.meta.pageable_count);
        setIs_end(result.data.meta.is_end);
        setLoading(false);
        ref_query.current.focus();
    }

    useEffect(()=>{
        getBooks();
    }, [page])

    const onSubmit = (e) => {
        e.preventDefault();
        getBooks();

    }

if(loading) return <h1> 로딩중....</h1>


  return (
    <div>
        <Row className='my-5 mx-2'> 
        <Row>
            <Col className='mb-2'>
                    <Form onSubmit={onSubmit}>
                        <Form.Control value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                        palaceholder ='검색어'
                        ref={ref_query}
                        />
                    </Form>
            검색</Col>
            <Col>검색수 : {total}건</Col>
            </Row>
           <hr/> 
            <Col>
            <h1 className='text-center'>도서 검색</h1>
            <Row>
                {books.map(book=>
                    <Col key={book.isbn} className='box m-2' >
                        <img src={book.thumbnail ? book.thumbnail : 'http://via.placeholder.com/120x96'}/>
                        <div className='ellipsis'>{book.title}</div>
                        <div>{book.price}원</div>
                    </Col>
                    )}
                    <div>
                        <Button  disabled={page ===1 && true}
                        onClick={()=>setPage(page-1)}>이전</Button>
                        <span className='mx-3'>{page}</span>
                        <Button disabled={is_end}
                        onClick={()=>setPage(page+1)}>다음</Button>
                    </div>
                    </Row>
            </Col>
        </Row>


    </div>
  )
}

export default BookPage