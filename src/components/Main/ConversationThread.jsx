import { useContext, useEffect, useMemo, useRef } from "react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { Context } from "../../contexts/context";
import { parseAnswerTokens } from "../../contexts/conversations";
import { IconAlert, IconLogo, IconUser } from "../icons/Icons";

const WORD_STAGGER_S = 0.045;

const wordContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: WORD_STAGGER_S } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

const messageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

function AssistantText({ message, animate, reduceMotion }) {
  const tokens = useMemo(() => parseAnswerTokens(message.text), [message.text]);
  const shouldStagger = animate && !reduceMotion;

  return (
    <Motion.p
      className="message-text"
      variants={shouldStagger ? wordContainerVariants : undefined}
      initial={shouldStagger ? "hidden" : false}
      animate="visible"
    >
      {tokens.map((token, i) =>
        token.type === "break" ? (
          <br key={i} />
        ) : (
          <Motion.span
            key={i}
            variants={shouldStagger ? wordVariants : undefined}
            style={token.bold ? { fontWeight: 700 } : undefined}
          >
            {token.text}{" "}
          </Motion.span>
        ),
      )}
    </Motion.p>
  );
}

function ConversationThread() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("ConversationThread must be rendered inside <ContextProvider>.");
  const { activeConversation, loading, justCompletedId } = ctx;
  const bottomRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [activeConversation?.messages.length, loading]);

  if (!activeConversation) return null;

  return (
    <div className="thread">
      {activeConversation.messages.map((message) =>
        message.role === "user" ? (
          <Motion.div
            className="message message--user"
            key={message.id}
            variants={messageVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <span className="avatar avatar--user">
              <IconUser size={20} />
            </span>
            <p className="message-text">{message.text}</p>
          </Motion.div>
        ) : (
          <Motion.div
            className="message message--assistant"
            key={message.id}
            variants={messageVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
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
              <AssistantText
                message={message}
                animate={message.id === justCompletedId}
                reduceMotion={reduceMotion}
              />
            )}
          </Motion.div>
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
