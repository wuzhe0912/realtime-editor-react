import React from "react";

function Home() {
  return (
    <div className="home-wrapper">
      <div className="form-wrapper">
        <img src="assets/code-sync.png" alt="code-sync-logo" />
        <h4 className="invite-label">Paste invitation ROOM ID</h4>
        <div className="input-container">
          <input type="text" className="input-box" placeholder="ROOM ID" />
          <input type="text" className="input-box" placeholder="USERNAME" />
          <button className="btn btn-join">Join</button>
          <span className="create-info">
            If you don't have an invite then create new &nbsp;
            <a href=""></a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
