// rukbot-widget.js
(function() {
    // Create style
    const style = document.createElement('style');
    style.innerHTML = `
      #rukbot-widget-btn {
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        background: #FFD600; border-radius: 50%; width: 64px; height: 64px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2); cursor: pointer;
        display: flex; align-items: center; justify-content: center;
      }
      #rukbot-widget-chat {
        position: fixed; bottom: 100px; right: 24px; z-index: 9999;
        width: 370px; max-width: 95vw; height: 500px; max-height: 80vh;
        background: #fff; border-radius: 16px; box-shadow: 0 2px 16px rgba(0,0,0,0.2);
        display: none; flex-direction: column; overflow: hidden;
      }
      @media (max-width: 600px) {
        #rukbot-widget-chat { width: 98vw; right: 1vw; height: 90vh; bottom: 1vh; }
      }
    `;
    document.head.appendChild(style);
  
    // Create button
    const btn = document.createElement('div');
    btn.id = 'rukbot-widget-btn';
    btn.innerHTML = '<img src="https://rukbot-widget.onrender.com/rukbot_icon.png" alt="RUKBOT" style="width:40px;height:40px;" />';
    const chat = document.createElement('div');
    chat.id = 'rukbot-widget-chat';
    chat.innerHTML = `
      <iframe src="https://rukbot-backend.onrender.com/" style="width:100%;height:100%;border:none;"></iframe>
    `;
    document.body.appendChild(chat);
  
    // Toggle chat
    btn.onclick = () => {
      chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
    };
  })();