import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Context } from "../../contexts/context";
import { IconAlert, IconLogo, IconUser } from "../icons/Icons";

const REVEAL_WORD_DELAY_MS = 45;

function AssistantText({ message, animate }) {
  const words = useMemo(() => message.text.split(" "), [message.text]);
  const [revealedCount, setRevealedCount] = useState(animate ? 0 : words.length);

  useEffect(() => {
    if (!animate) return undefined;
    setRevealedCount(0);
    const timeouts = words.map((_, i) =>
      setTimeout(() => setRevealedCount((count) => Math.max(count, i + 1)), REVEAL_WORD_DELAY_MS * i),
    );
    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.id]);

  const visibleHtml = words.slice(0, revealedCount).join(" ");
  return <p className="message-text" dangerouslySetInnerHTML={{ __html: visibleHtml }} />;
}

function ConversationThread() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("ConversationThread must be rendered inside <ContextProvider>.");
  const { activeConversation, loading, justCompletedId } = ctx;
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [activeConversation?.messages.length, loading]);

  if (!activeConversation) return null;

  return (
    <div className="thread">
      {activeConversation.messages.map((message) =>
        message.role === "user" ? (
          <div className="message message--user" key={message.id}>
            <span className="avatar avatar--user">
              <IconUser size={20} />
            </span>
            <p className="message-text">{message.text}</p>
          </div>
        ) : (
          <div className="message message--assistant" key={message.id}>
            <span className="logo-wrapper" aria-hidden="true">
              <IconLogo size={22} />
            </span>
            {message.isError ? (
              <div className="result-error" role="alert">
                <IconAlert size={20} />
                <div>
                  <p className="result-error-title">Something went wrong</p>
                  <p className="result-error-detail">{message.text}</p>
                </div>
              </div>
            ) : (
              <AssistantText message={message} animate={message.id === justCompletedId} />
            )}
          </div>
        ),
      )}

      {loading && (
        <div className="message message--assistant">
          <span className="logo-wrapper spin" aria-hidden="true">
            <IconLogo size={22} />
          </span>
          <div className="loader" aria-live="polite" aria-label="Zyra is thinking">
            <span className="loader-bar" />
            <span className="loader-bar" />
            <span className="loader-bar" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ConversationThread;
