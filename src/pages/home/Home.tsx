import React from 'react';
import './styles.css'
import logoutIcon from '../../assets/images/logout-icon.png';
import arrowLeft from '../../assets/images/arrow-left.png';
import arrowRight from '../../assets/images/arrow-right.png';

import BookCard from '../../components/bookblock/BookCard';

import { useState, useEffect, useMemo } from 'react';

import Cookies  from 'js-cookie';
import axios from 'axios';

function Home() {

  const logout = () => {
    Cookies.remove("userAuth");
    window.location.assign("/auth");
  }
  
  const username = () => {
    let cookieAuth:any = Cookies.get("userAuth");
    let cookieAuthJson = JSON.parse(cookieAuth);
    return cookieAuthJson?.nome;
  }

  const token = () => {
    let cookieAuth:any = Cookies.get("userAuth");
    let cookieAuthJson = JSON.parse(cookieAuth);
    return cookieAuthJson?.token;
  }

  const [books, setBooks] = useState<any | null>();
  
  useEffect(() => {

    let currentPage = new URLSearchParams(window.location.search).get('pg') || 1;

    axios({
      method: 'get',
      url: 'https://books.ioasys.com.br/api/v1/books?page='+currentPage,
      headers: {'Authorization': 'Bearer '+token()}
    }).then(async function (response) {
      await setBooks(response.data);
      console.log(response.data)
    }).catch(function (error) {
    });

  }, []);

  return ( 
    <>
      < div className="home">
          <header>
              <p className="title">
                  <b>ioasys</b>
                  Books</p>
              <div className="user">
                  <p className="user__label">Bem vindo, <b>{username()}</b></p>
                  <button className="user__logout">
                    <img className="logoutIcon" src={logoutIcon} onClick={()=>logout()} alt=""/>
                  </button>
              </div>
          </header>
          <main>
            
            {books?.data.map((book:any, key:any) => {
              return <BookCard key={book.id} data={book}/>
            })}
            
          </main>

          <footer>
            <div className="pagination">
              <button className={`pagination__btn pagination__btn${books?.page === 1?'--disabled':''}`}>
                <img src={arrowLeft} alt="" />
              </button>
              <p>Página <b>{books?.page}</b> de <b>{books?.totalPages}</b></p>
              <button className={`pagination__btn pagination__btn${books?.page === books?.totalPages?'--disabled':''}`}>
                <a href={`/?pg=${books?.page+1}`}><img src={arrowRight} alt="" /></a>
              </button>
            </div>
          </footer>
      </div>
    </>
  );
}

export default Home;
