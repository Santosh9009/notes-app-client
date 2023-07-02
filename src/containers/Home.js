import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import backgroundVideo from "./assets/pexels-oleg-gamulinskii-14399599 (360p).mp4";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);
  function loadNotes() {
    return API.get("notes", "/notes");
  }
  function renderNotesList(notes) {
    return (
      <>
        <LinkContainer to="/notes/new">
          <ListGroup.Item
            action
            className="create py-3 text-nowrap text-truncate"
          >
            <BsPencilSquare size={17} />
            <span className=" real-create ml-2 font-weight-bold ">
              Create a new note
            </span>
          </ListGroup.Item>
        </LinkContainer>

        <div className="notes-grid">
          {notes.map(({ noteId, content, createdAt }) => (
            <LinkContainer
              className="linker"
              key={noteId}
              to={`/notes/${noteId}`}
            >
              <ListGroup.Item action className="custom-note-item">
                <div className="note-content">
                  <span className="note-title">
                    {content.trim().split("\n")[0]}
                  </span>
                  <br />
                  <span className="note-date">
                    Created: {new Date(createdAt).toLocaleString()}
                  </span>
                </div>
              </ListGroup.Item>
            </LinkContainer>
          ))}
        </div>
      </>
    );
  }
  function renderLander() {
    return (
      <div className="Main">
        <video className="background-video" autoPlay loop muted>
             <source src={backgroundVideo} type="video/mp4" />
             Your browser does not support the video tag.
           </video>
      <div className="lander">
        <h1>NoteTap</h1>
        <p className="text-muted slogan"> A note a day keeps the chaos away</p>
        <div className="buttons">
          <LinkContainer to="/login">
            <button className="btn btn-primary">Login</button>
          </LinkContainer>
          <LinkContainer to="/signup">
            <button className="btn btn-primary">Sign Up</button>
          </LinkContainer>
        </div>
      </div>
     </div>
    );
  }
  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="Your pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }
  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
