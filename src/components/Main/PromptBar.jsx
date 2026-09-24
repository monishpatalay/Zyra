import { useContext, useId } from "react";
import { motion as Motion } from "motion/react";
import { Context } from "../../contexts/context";
import { IconGallery, IconMic, IconSend } from "../icons/Icons";

function PromptBar() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("PromptBar must be rendered inside <ContextProvider>.");
  const { input, setInput, sendMessage, loading } = ctx;
  const inputId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading) return;
    sendMessage(input);
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="visually-hidden">
        Message Zyra
      </label>
      <input
        id={inputId}
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Type your prompt here..."
        autoComplete="off"
      />
      <div className="search-box-actions">
        <button type="button" className="ghost-icon-button" disabled title="Image upload — coming soon">
          <IconGallery size={20} />
          <span className="visually-hidden">Add image (coming soon)</span>
        </button>
        <button type="button" className="ghost-icon-button" disabled title="Voice input — coming soon">
          <IconMic size={20} />
          <span className="visually-hidden">Voice input (coming soon)</span>
        </button>
        <Motion.button
          type="submit"
          className="send-btn"
          disabled={loading || !input.trim()}
          aria-label="Send prompt"
          whileTap={loading || !input.trim() ? undefined : { scale: 0.9 }}
          whileHover={loading || !input.trim() ? undefined : { scale: 1.06 }}
        >
          <IconSend size={20} />
        </Motion.button>
      </div>
    </form>
  );
}

export default PromptBar;
