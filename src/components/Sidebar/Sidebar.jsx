import { useContext, useState } from "react";
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

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Sidebar must be rendered inside <ContextProvider>.");

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

        <button type="button" className="new-chat" onClick={newChat}>
          <IconPlus size={18} />
          <span className="new-chat-label">New chat</span>
        </button>

        {extended && (
          <nav className="recent" aria-label="Conversation history">
            <p className="recent-title">Recent</p>
            {conversations.length === 0 ? (
              <p className="recent-empty">Your conversations will show up here.</p>
            ) : (
              <ul className="recent-list">
                {conversations.map((conversation) => (
                  <li className="recent-item" key={conversation.id}>
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
                    <button
                      type="button"
                      className="recent-delete"
                      aria-label={`Delete "${conversation.title}"`}
                      onClick={(event) => handleDelete(event, conversation.id)}
                    >
                      <IconTrash size={14} />
                    </button>
                  </li>
                ))}
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
          {theme === "dark" ? <IconSun /> : <IconMoon />}
          {extended && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
