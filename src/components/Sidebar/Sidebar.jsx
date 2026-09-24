import { useContext, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "motion/react";
import "./Sidebar.css";
import { Context } from "../../contexts/context";
import {
  IconHistory,
  IconMenu,
  IconMoon,
  IconPlus,
  IconSun,
  IconTrash,
} from "../icons/Icons";

const listItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -16, transition: { duration: 0.15 } },
};

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Sidebar must be rendered inside <ContextProvider>.");
  const reduceMotion = useReducedMotion();

  const {
    conversations,
    activeConversation,
    newChat,
    selectConversation,
    deleteConversation,
    theme,
    toggleTheme,
  } = ctx;

  const handleDelete = (event, id) => {
    event.stopPropagation();
    deleteConversation(id);
  };

  return (
    <aside className={`sidebar ${extended ? "sidebar--extended" : ""}`}>
      <div className="sidebar-top">
        <button
          type="button"
          className="icon-button"
          onClick={() => setExtended((prev) => !prev)}
          aria-label={extended ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={extended}
        >
          <IconMenu />
        </button>

        <Motion.button
          type="button"
          className="new-chat"
          onClick={newChat}
          whileTap={{ scale: 0.96 }}
        >
          <IconPlus size={18} />
          <span className="new-chat-label">New chat</span>
        </Motion.button>

        {extended && (
          <nav className="recent" aria-label="Conversation history">
            <p className="recent-title">Recent</p>
            {conversations.length === 0 ? (
              <p className="recent-empty">Your conversations will show up here.</p>
            ) : (
              <ul className="recent-list">
                <AnimatePresence initial={false}>
                  {conversations.map((conversation) => (
                    <Motion.li
                      className="recent-item"
                      key={conversation.id}
                      layout={!reduceMotion}
                      variants={listItemVariants}
                      initial={reduceMotion ? false : "hidden"}
                      animate="visible"
                      exit={reduceMotion ? undefined : "exit"}
                    >
                      <button
                        type="button"
                        className={`recent-entry ${
                          conversation.id === activeConversation?.id ? "recent-entry--active" : ""
                        }`}
                        onClick={() => selectConversation(conversation.id)}
                        title={conversation.title}
                        aria-current={conversation.id === activeConversation?.id}
                      >
                        <IconHistory size={16} />
                        <span>{conversation.title}</span>
                      </button>
                      <Motion.button
                        type="button"
                        className="recent-delete"
                        aria-label={`Delete "${conversation.title}"`}
                        onClick={(event) => handleDelete(event, conversation.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconTrash size={14} />
                      </Motion.button>
                    </Motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </nav>
        )}
      </div>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="icon-button theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <Motion.span
              key={theme}
              className="theme-icon"
              initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {theme === "dark" ? <IconSun /> : <IconMoon />}
            </Motion.span>
          </AnimatePresence>
          {extended && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
