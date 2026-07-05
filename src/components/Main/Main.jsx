import { useCallback, useContext } from "react";
import "./Main.css";
import { Context } from "../../contexts/context";
import { IconUser } from "../icons/Icons";
import Greeting from "./Greeting";
import PromptCards from "./PromptCards";
import ConversationThread from "./ConversationThread";
import PromptBar from "./PromptBar";

const Main = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Main must be rendered inside <ContextProvider>.");

  const { sendMessage, activeConversation } = ctx;
  const hasMessages = Boolean(activeConversation?.messages.length);

  const handleCardSelect = useCallback(
    (text) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  return (
    <main className="main">
      <header className="nav">
        <p>Zyra</p>
        <span className="avatar avatar--user" aria-label="Your account" role="img">
          <IconUser size={20} />
        </span>
      </header>

      <div className="main-container">
        <div className="main-scroll">
          {hasMessages ? (
            <ConversationThread />
          ) : (
            <>
              <Greeting />
              <PromptCards onSelect={handleCardSelect} />
            </>
          )}
        </div>

        <div className="main-bottom">
          <PromptBar />
          <p className="bottom-info">
            <span>Zyra</span> may display inaccurate or offensive information, so
            please double-check anything important.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Main;
