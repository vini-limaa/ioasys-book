import React from 'react';
import './styles.css'
import bookCover from '../../assets/images/book-cover.jpg';
import bookCoverLarge from '../../assets/images/book-cover-large.png';
import closeIcon from '../../assets/images/close-icon.png';

import { useState } from 'react';
import Modal from 'react-modal';

function BookCard(props: any) {

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }


  const { data } = props;
  
  const { title, imageUrl, authors, published, pageCount, publisher, language, isbn10, isbn13, description } = data;

  return (
    <>
      <article className="articleBook">
          <div className="book" onClick={openModal}>
              <div className="book__image__block">
                  <img className="book__image" src={imageUrl||bookCover}/>
              </div>

              <div className="book__infos">
                  <div className="book__infos__titles">
                      <p className="book__title">{title}</p>
                      <p className="book__author">
                        {authors.map((author: any, key: any) => {
                          if(key === 0){
                            return author;
                          }else{
                            return ", "+author
                          }
                        })}
                      </p>
                  </div>

                  <div className="book_infos_spec">
                      <p>{pageCount} páginas</p>
                      <p>X{publisher}</p>
                      <p>Publicado em {published}</p>
                  </div>
              </div>

          </div>
      </article>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Book Modal"
        className="bookModal"
      >
       <button onClick={closeModal} className="bookModal__closeIcon">
         <img src={closeIcon}/>
       </button>
       <div className="bookModal__content">
        <div className="bookModal__image">
            <img src={imageUrl}/>
        </div>

        <div className="bookModal__infos">
          <p className="bookModal__title">
            {title}
          </p>
          <p className="bookModal__author">
          {authors.map((author: any, key: any) => {
            if(key === 0){
              return author;
            }else{
              return ", "+author
            }
          })}
          </p>

          <p className="bookModal__info__title">INFORMAÇÕES</p>
          
          <div className="bookModal__info">
            <div className="bookModal__info__labels">
              <p>Páginas</p>
              <p>Editora</p>
              <p>Publicação</p>
              <p>Idioma</p>
              <p>Título Original</p>
              <p>ISBN-10</p>
              <p>ISBN-13</p>
            </div>
            <div className="bookModal__info__content">
              <p>{pageCount} páginas</p>
              <p>{publisher}</p>
              <p>{published}</p>
              <p>{language}</p>
              <p>{title}</p>
              <p>{isbn10}</p>
              <p>{isbn13}</p>
            </div>
          </div>
          
          <div className="bookModal__resume">
            <p className="bookModal__info__title">RESENHA DA EDITORA</p>
            <div className="bookModal__resume__text">
              {description}
            </div>
          </div>

        </div>
       </div>
      </Modal>

    </>
  );
}

export default BookCard;
