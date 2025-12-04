(function () {
  // Inject widget styles
  const style = document.createElement("style");
  style.innerHTML = `
    #rukbot-widget-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      background: #FFD600; border-radius: 50%; width: 96px; height: 96px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }

    #rukbot-widget-chat {
      position: fixed; bottom: 100px; right: 24px; z-index: 9999;
      width: 360px; max-width: 95vw; height: 500px; max-height: 80vh;
      background: #fff; border-radius: 16px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.2);
      display: flex; flex-direction: column;
      overflow: hidden; border: 1px solid #ccc;
      opacity: 0; pointer-events: none;
      transition: opacity 0.25s ease-in-out;
    }

    #rukbot-header {
      padding: 12px; background: #FFD600; font-weight: bold;
      display: flex; justify-content: space-between; align-items: center;
    }

    #rukbot-close {
      cursor: pointer; font-size: 20px; font-weight: bold;
    }

    #rukbot-messages {
      padding: 12px; flex: 1; overflow-y: auto;
    }

    .rukbot-user {
      background: #FFF4AA; padding: 10px 14px;
      border-radius: 12px; margin-bottom: 10px;
      max-width: 80%; align-self: flex-end;
    }

    .rukbot-bot {
      background:#f0f0f0; padding: 10px 14px;
      border-radius: 12px; margin-bottom: 10px;
      max-width: 80%; align-self: flex-start;
      white-space: pre-wrap;
    }

    #rukbot-input-wrap {
      display: flex; border-top: 1px solid #ddd;
    }

    #rukbot-input {
      flex: 1; border: none; padding: 12px;
      font-size: 14px; outline: none;
    }

    #rukbot-send {
      width: 60px; background: #FFD600; border: none;
      cursor: pointer; font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  // Floating button
  const btn = document.createElement("div");
  btn.id = "rukbot-widget-btn";
  btn.innerHTML = `
    <img src="/public/chat-icon.png" style="width:60px;height:60px;" />
  `;
  document.body.appendChild(btn);

  // Chat window
  const chat = document.createElement("div");
  chat.id = "rukbot-widget-chat";
  chat.innerHTML = `
    <div id="rukbot-header">
      <span>RUKBOT</span>
      <span id="rukbot-close">×</span>
    </div>

    <div id="rukbot-messages"></div>

    <div id="rukbot-input-wrap">
      <input id="rukbot-input" placeholder="Ask me anything..." />
      <button id="rukbot-send">➤</button>
    </div>
  `;
  document.body.appendChild(chat);

  // Open / Close widget
  btn.onclick = () => {
    const visible = chat.style.opacity === "1";
    chat.style.opacity = visible ? "0" : "1";
    chat.style.pointerEvents = visible ? "none" : "auto";
  };

  document.getElementById("rukbot-close").onclick = () => {
    chat.style.opacity = "0";
    chat.style.pointerEvents = "none";
  };

  // Messaging logic
  async function sendMessage() {
    const input = document.getElementById("rukbot-input");
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    const messages = document.getElementById("rukbot-messages");

    // Add user bubble
    const userBubble = document.createElement("div");
    userBubble.className = "rukbot-user";
    userBubble.textContent = text;
    messages.appendChild(userBubble);
    messages.scrollTop = messages.scrollHeight;

    // Default fallback
    let botReply = "⚠️ No response received from RUKBOT.";

    try {
      const res = await fetch("https://rukbot-backend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      botReply = await res.text();
    } catch (err) {
      botReply = "⚠️ Connection issue — please try again soon.";
    }

    // Add bot bubble
    const botBubble = document.createElement("div");
    botBubble.className = "rukbot-bot";
    botBubble.textContent = botReply;
    messages.appendChild(botBubble);

    messages.scrollTop = messages.scrollHeight;
  }

  // Send button
  document.getElementById("rukbot-send").onclick = sendMessage;

  // ENTER key support
  document.getElementById("rukbot-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();
