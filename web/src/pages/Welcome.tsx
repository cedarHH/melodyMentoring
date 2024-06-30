import React from 'react';
import './Welcome.css';

const Welcome: React.FC = () => {
    return (
        <div className="container">
            <div className="left-side">
                <div className="lean-box">
                    <div className="wrapper">
                        <div>
                            <div className="film-image"><img src="img/welcome/anime1.png" alt="Anime 1"></img></div>
                            <div className="film-image"><img src="img/welcome/anime2.png" alt="Anime 2"></img></div>
                            <div className="film-image"><img src="img/welcome/anime3.png" alt="Anime 3"></img></div>
                            <div className="film-image"><img src="img/welcome/anime1.png" alt="Anime 1"></img></div>
                        </div>
                        <div>
                            <div className="film-image"><img src="img/welcome/anime4.png" alt="Anime 4"></img></div>
                            <div className="film-image"><img src="img/welcome/anime5.png" alt="Anime 5"></img></div>
                            <div className="film-image"><img src="img/welcome/anime6.png" alt="Anime 6"></img></div>
                            <div className="film-image"><img src="img/welcome/anime4.png" alt="Anime 4"></img></div>
                        </div>
                        <div>
                            <div className="film-image"><img src="img/welcome/anime7.png" alt="Anime 7"></img></div>
                            <div className="film-image"><img src="img/welcome/anime8.png" alt="Anime 8"></img></div>
                            <div className="film-image"><img src="img/welcome/anime9.png" alt="Anime 9"></img></div>
                            <div className="film-image"><img src="img/welcome/anime7.png" alt="Anime 7"></img></div>
                        </div>
                        <div>
                            <div className="film-image"><img src="img/welcome/anime1.png" alt="Anime 1"></img></div>
                            <div className="film-image"><img src="img/welcome/anime2.png" alt="Anime 2"></img></div>
                            <div className="film-image"><img src="img/welcome/anime3.png" alt="Anime 3"></img></div>
                            <div className="film-image"><img src="img/welcome/anime1.png" alt="Anime 1"></img></div>
                        </div>
                        <div>
                            <div className="film-image"><img src="img/welcome/anime4.png" alt="Anime 4"></img></div>
                            <div className="film-image"><img src="img/welcome/anime5.png" alt="Anime 5"></img></div>
                            <div className="film-image"><img src="img/welcome/anime6.png" alt="Anime 6"></img></div>
                            <div className="film-image"><img src="img/welcome/anime4.png" alt="Anime 4"></img></div>
                        </div>
                        <div>
                            <div className="film-image"><img src="img/welcome/anime7.png" alt="Anime 7"></img></div>
                            <div className="film-image"><img src="img/welcome/anime8.png" alt="Anime 8"></img></div>
                            <div className="film-image"><img src="img/welcome/anime9.png" alt="Anime 9"></img></div>
                            <div className="film-image"><img src="img/welcome/anime7.png" alt="Anime 7"></img></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-side">
                <div className="logo">
                    <div className="logo-icon"></div>
                    <div className="logo-text">MyGO!!!!!</div>
                </div>
                <div className="tagline">Discover Your Sound</div>
                <button className="button new-user">I am new here</button>
                <button className="button sign-in">Sign In</button>
            </div>
        </div>
    );
};

export default Welcome;
