import React from "react";

import codeSyncLogo from "assets/code-sync.png";

function Home() {
  return (
    <main className="home-wrapper">
      <section className="form-wrapper">
        <img src={codeSyncLogo} alt="code-sync-logo" />
        <h4 className="invite-label">Paste invitation ROOM ID</h4>
        <div className="input-container">
          <input type="text" className="input-box" placeholder="ROOM ID" />
          <input type="text" className="input-box" placeholder="USERNAME" />
          <button className="btn btn-join">Join</button>
          <span className="create-info">
            If you don't have an invite then create new &nbsp;
            <a href="https://www.google.com/" className="create-room-btn">
              new room
            </a>
          </span>
        </div>
      </section>
      <footer>
        <h4>
          Built with React by&nbsp;
          <a
            href="https://github.com/wuzhe0912"
            target="_blank"
            rel="noreferrer noopener"
          >
            Pitt Wu
          </a>
        </h4>
      </footer>
    </main>
  );
}

export default Home;
