function killCopy() {
  return false;
}
function reEnable() {
  return true;
}
document.onselectstart = () => {
  return false; // cancel selection
};
if (window.sidebar) {
  document.onmousedown = killCopy;
  document.onclick = reEnable;
}

$(document).on("contextmenu", function (e) {
  e.preventDefault();
});

$(document).keydown(function (event) {
  if (event.keyCode === 123) {
    // Prevent F12
    return false;
  } else if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
    // Prevent Ctrl+Shift+I
    return false;
  }
});
