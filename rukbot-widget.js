(function () {
  // Create style
  const style = document.createElement('style');
  style.innerHTML = `
    #rukbot-widget-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      background: #FFD600; border-radius: 50%; width: 96px; height: 96px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }

    #rukbot-widget-chat {
      position: fixed; bottom: 100px; right: 24px; z-index: 9999;
      width: 400px; max-width: 95vw; height: 500px; max-height: 80vh;
      background: #fff; border-radius: 16px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.2); 
      flex-direction: column; overflow: hidden; border: 1px solid #ccc;
      display: flex;
      box-sizing: border-box; /* ✅ Add this line */
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease-in-out;
    }

    #rukbot-close {
      background: #FFD600; color: black; font-weight: bold;
      border: none; padding: 6px 12px; cursor: pointer;
      align-self: flex-end; margin: 4px; border-radius: 8px;
    }

    @media (max-width: 600px) {
      #rukbot-widget-chat {
        width: 90vw; right: 5vw;
        height: 80vh; bottom: 10vh;
      }
    }
  `;
  document.head.appendChild(style);

  // Create button
  const btn = document.createElement('div');
  btn.id = 'rukbot-widget-btn';
  btn.innerHTML = '<img src="https://rukbot-widget.onrender.com/rukbot_icon.png" alt="RUKBOT" style="width:60px;height:60px;" />';
  document.body.appendChild(btn);

  // Create chat container
  const chat = document.createElement('div');
  chat.id = 'rukbot-widget-chat';
  chat.innerHTML = `
    <button id="rukbot-close">×</button>
    <iframe src="https://rukbot-backend.onrender.com/" style="width:100%; height:100%; border:none; flex-grow: 1;"></iframe>
  `;
  document.body.appendChild(chat);

  // Toggle chat
btn.onclick = () => {
  const isVisible = chat.style.opacity === '1';
  if (isVisible) {
    chat.style.opacity = '0';
    chat.style.pointerEvents = 'none';
  } else {
    chat.style.opacity = '1';
    chat.style.pointerEvents = 'auto';
  }
};

  // Close button
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'rukbot-close') {
      chat.style.opacity = '0';
      chat.style.pointerEvents = 'none';
    }
  });
})();

