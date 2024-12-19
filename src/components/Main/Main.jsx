import "./Main.css";
import { FaUserCircle, FaCompass, FaLightbulb, FaComments, FaCode, FaImage, FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../../context/context";

const Main = () => {
   const {
      onSent,
      recentPrompt,
      showResult,
      isLoading,
      resultData,
      input,
      setInput,
   } = useContext(Context);

   // Listening for Keypress
   const handleKeyPress = (e) => {
      if (e.key === "Enter" && input.trim() !== "") {
         onSent();
      }
   };

   return (
      <div className="main">
         <div className="nav">
            <p>Gemini</p>
            <FaUserCircle className="user-icon" />
         </div>

         <div className="main-container">
            { !showResult ? (
               <>
                  <div className="greet">
                     <p>
                        <span>Hello, Dev.</span>
                     </p>
                     <p>How can I help you today?</p>
                  </div>

                  <div className="cards">
                     <div className="card">
                        <p>Suggest beautiful places to see on an upcoming trip.</p>
                        <FaCompass className="icon" />
                     </div>
                     <div className="card">
                        <p>Briefly summarize this concept: urban planning.</p>
                        <FaLightbulb className="icon" />
                     </div>
                     <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat.</p>
                        <FaComments className="icon" />
                     </div>
                     <div className="card">
                        <p>Improve the readability of the following code.</p>
                        <FaCode className="icon" />
                     </div>
                  </div>
               </>
            ) : (
               <div className="result">
                  <div className="result-title">
                     <FaUserCircle className="icon" />
                     <p>{ recentPrompt }</p>
                  </div>
                  <div className="result-data">
                     <FaUserCircle className="icon" />
                     { isLoading ? (
                        <div className="loader">
                           <hr />
                           <hr />
                           <hr />
                        </div>
                     ) : (
                        <div>
                           {/* Wrap the result data with a container to apply spacing */ }
                           <p dangerouslySetInnerHTML={ { __html: resultData } } className="formatted-result"></p>
                        </div>
                     ) }
                  </div>
               </div>
            ) }

            <div className="main-bottom">
               <div className="search-box">
                  <input
                     type="text"
                     placeholder="Enter a prompt here"
                     onChange={ (e) => setInput(e.target.value) }
                     value={ input }
                     onKeyDown={ handleKeyPress }
                  />
                  <div className="icons">
                     <FaImage className="icon" />
                     <FaMicrophone className="icon" />
                     { input && <FaPaperPlane className="icon" onClick={ () => onSent() } /> }
                  </div>
               </div>
               <p className="bottom-info">
                  Gemini may display inaccurate info, including about people, so double-check its responses. Your Privacy and Gemini Apps.
               </p>
            </div>
         </div>
      </div>
   );
};

export default Main;
