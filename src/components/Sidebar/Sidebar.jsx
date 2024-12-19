import './Sidebar.css';
import { useContext, useState } from 'react';
import { Context } from '../../context/context';
import { FaBars, FaPlus, FaEnvelope, FaQuestionCircle, FaHistory, FaCog } from 'react-icons/fa';

export default function Sidebar () {
   const [extended, setExtended] = useState(false);
   const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

   // Load previous chats
   const loadPrompt = async (prompt) => {
      setRecentPrompt(prompt);
      await onSent(prompt);
   };

   return (
      <div className={ `sidebar ${extended ? 'extended' : ''}` }>
         <div className="top">
            <FaBars
               className="menu-icon"
               onClick={ () => setExtended((prev) => !prev) }
            />
            <div className="new-chat" onClick={ () => newChat() }>
               <FaPlus className="icon" />
               { extended && <p>New Chat</p> }
            </div>

            { extended && (
               <div className="recent">
                  <p className="recent-title">Recent</p>
                  { prevPrompts.map((item, index) => (
                     <div
                        className="recent-entry"
                        key={ index }
                        onClick={ () => loadPrompt(item) }
                     >
                        <FaEnvelope className="icon" />
                        <p>{ item.slice(0, 18) }...</p>
                     </div>
                  )) }
               </div>
            ) }
         </div>

         <div className="bottom">
            <div className="bottom-item recent-entry">
               <FaQuestionCircle className="icon" />
               { extended && <p>Help</p> }
            </div>
            <div className="bottom-item recent-entry">
               <FaHistory className="icon" />
               { extended && <p>Activities</p> }
            </div>
            <div className="bottom-item recent-entry">
               <FaCog className="icon" />
               { extended && <p>Settings</p> }
            </div>
         </div>
      </div>
   );
}
