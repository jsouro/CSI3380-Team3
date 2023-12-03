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
  document.getElementById('start-game').addEventListener('click', function() {
    document.getElementById('level-selection').style.display = 'block';
  });
  
  // Add event listeners for level buttons
  document.getElementById('level1').addEventListener('click', function() {
    // Start Level 1
  });
  
  document.getElementById('level2').addEventListener('click', function() {
    // Start Level 2
  });
  
  document.getElementById('level3').addEventListener('click', function() {
    // Start Level 3
  });
  
  // Start game and Options functionality should be implemented according to your game's logic.
  