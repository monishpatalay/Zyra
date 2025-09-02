// components/Main/Main.jsx
import React, { useContext, useCallback } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Main must be rendered inside <ContextProvider>.");

  const {
    sendMessage,
    recentPrompts,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = ctx;

  const handleSend = useCallback(() => {
    if (loading) return;
    const trimmed = (input || "").trim();
    if (!trimmed) return;
    sendMessage(trimmed);
  }, [input, loading, sendMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p aria-label="Zyra Home">Zyra</p>
        <img src={assets.user_icon} alt="User avatar" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass icon" />
              </div>
              <div className="card">
                <p>Briefly summarise this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User avatar" />
              <p>{recentPrompts}</p>
            </div>

            <div className="result-data">
              {/* Rainbow ring spins while loading, stops when done */}
              <div className={`logo-wrapper ${loading ? "spin" : ""}`} aria-hidden="true">
                <img
                  className="zyra-logo"
                  src={assets.zyra_icon}
                  alt="Zyra Logo"
                />
              </div>

              {loading ? (
                <div className="loader" aria-live="polite">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  className="result-text"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Type your prompt here..."
              onKeyDown={handleKeyDown}
              aria-label="Prompt input"
            />
            <div>
              <img src={assets.gallery_icon} alt="Add image" />
              <img src={assets.mic_icon} alt="Voice input" />
              <button
                type="button"
                className="send-btn"
                onClick={handleSend}
                disabled={loading || !(input || "").trim()}
                aria-label="Send prompt"
                title="Send"
              >
                <img src={assets.send_icon} alt="" />
              </button>
            </div>
          </div>

          {loading && <p className="bottom-info">Thinking…</p>}

          <p className="bottom-info">
            <span>Zyra</span> may display inaccurate or offensive information, so
            please double-check anything important.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
