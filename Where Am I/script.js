// script.js
document.getElementById('quit').addEventListener('click', function() {
    document.getElementById('quit-modal').style.display = 'block';
  });
  
  document.getElementById('yes-quit').addEventListener('click', function() {
    window.close(); // This will not work for some modern browsers due to security reasons
  });
  
  document.getElementById('no-quit').addEventListener('click', function() {
    document.getElementById('quit-modal').style.display = 'none';
  });
  
  // Start game and Options functionality should be implemented according to your game's logic.
  