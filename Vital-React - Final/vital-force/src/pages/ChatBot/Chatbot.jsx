import { useState } from "react";

const Chatbot = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {!isVisible && (
        <>
          <button
            onClick={() => setIsVisible(true)}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              fontSize: "20px",
              cursor: "pointer",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              zIndex: 1001,
              overflow: "hidden",
            }}
          >
            💬
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "200%",
                height: "100%",
                background:
                  "linear-gradient(120deg, transparent 30%, rgba(0,170,255,0.7) 50%, transparent 70%)",
                animation: "shine 3s infinite",
              }}
            ></span>
          </button>

          <style>
            {`
              @keyframes shine {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
            `}
          </style>
        </>
      )}

      {isVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "350px",
            height: "500px",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setIsVisible(false)}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              background: "rgb(0, 170, 255)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              zIndex: 1001,
            }}
          >
            ✖
          </button>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/FMWp2oUFFvDMtQN6IjdTr"
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: "10px" }}
            title="Chatbot"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Chatbot;
