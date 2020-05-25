import React, { useState, useEffect } from 'react';
import './App.css';
import GenresGrid from './Components/GenresGrid.js';
import TopBar from './Components/TopBar.js';
import ABCPlayer from './Components/ABCPlayer.js';
import BottomBar from './Components/BottomBar.js';
import Sky from 'react-sky';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { CSSTransition, transit } from 'react-css-transition';


// const GenresGrid = React.lazy(() => import('./Component/GenresGrid/index.js'));


/**
 * Represents Main App
 * Link all components in one
 * @component
 * @param {object} props - props of component
 */
const App = (props) => {
  const [skyLoaded, setSkyLoaded] = useState(false);
  
  const [noteImages, setNoteImages] = useState({});
  const musicUrl = useState('api/generate')[0];
  const playerID = useState('genMusic')[0];

  const importAllImages = context => context.keys().map(context);

  useEffect(() => {
    const loadSky = setTimeout(() => {
      const images = {};
      
      importAllImages(
        require.context('./MusicalNotes', false, /\.(png|svg)$/)
      ).forEach((elem, i) => {
        images[i] = elem;
      });

      setNoteImages(images);
      setSkyLoaded(true);
    }, 2000);
    return () => clearTimeout(loadSky);
  }, []);

  return (
    <div id="App">
      <TopBar />
      <GenresGrid />
      <BottomBar />
     
      <div>
        <CSSTransition 
          active={!skyLoaded} 
          defaultStyle={{ opacity: 0 }}
          enterStyle={{ opacity: transit(1.0, 1500, "ease-in") }}
          leaveStyle={{ opacity: transit(0, 500, "ease-in") }}
          activeStyle={{ opacity: 1.0 }}
          transitionDelay={1500}
        >
          <div id="loader">
            <Loader
              type="Circles" 
              color="orange" 
              height={120} 
              width={120}
              timeout={3500}
            />
          </div>
        </CSSTransition>
      </div>

      <div>

        { skyLoaded && (
          <div>
            <CSSTransition 
              active={skyLoaded} 
              defaultStyle={{ opacity: 0 }}
              enterStyle={{ opacity: transit(1, 500, "ease-in") }}
              activeStyle={{ opacity: 1 }}
              transitionDelay={1000}
            >
              <Sky
                images={noteImages}
                how={50} 
                time={40} 
                size={'80px'}
                id="sky"
              />                                                                                                                                                                                                                                                        
            </CSSTransition>  
            <ABCPlayer 
              musicUrl={musicUrl} 
              playerID={playerID}
            />
          </div>
          )
        }
      </div>

    </div>
  );
}


export default App;