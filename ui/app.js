// Cache DOM references
const toastList = document.getElementById('toasts');
const sound = new Audio('notify.wav');
sound.volume = 0.8;

window.addEventListener('message', function(event) {
  const data = event.data;

  if (data.action === 'trigger') {
    createNotify(data.title, data.content, data.duration, data.type);
    sound.play();
  }
});

function createNotify(title, content, duration, type) {
  // Simplify template variable
  var template = `
    <div class="icon">
      <i class="fa-solid fa-square-check"></i>
    </div>
    <div class="description">
      <h3>${title}</h3>
      <span class="message">${content}</span>
    </div>
  `;

  if (type === 'error') {
    template = `
      <div class="icon">
        <i class="fa-sharp fa-solid fa-triangle-exclamation"></i>
      </div>
      <div class="description">
        <h3>${title}</h3>
        <span class="message">${content}</span>
      </div>
    `;
  } else if (type === 'warning') {
    template = `
      <div class="icon">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="description">
        <h3>${title}</h3>
        <span class="message">${content}</span>
      </div>`;
  } else if (type === 'info') {
    template = `
      <div class="icon">
        <i class="fa-sharp fa-solid fa-circle-info"></i>
      </div>
      <div class="description">
        <h3>${title}</h3>
        <span class="message">${content}</span>
      </div>
    `;
  } else if (type === 'main') {
    template = `
      <div class="icon">
        <i class="fa-solid fa-user"></i>
      </div>
      <div class="description">
        <h3>${title}</h3>
        <span class="message">${content}</span>
      </div>
    `;
  }

  // Use document fragment
  const fragment = document.createDocumentFragment();
  const toast = document.createElement('div');
  toast.classList.add('toasts');
  toast.classList.add(type);
  toast.innerHTML = `${template}<span class="countdown"></span>`;
  fragment.appendChild(toast);

  toastList.appendChild(fragment);

  setTimeout(function() {
    toast.style.animation = 'slide_hide 2s ease forwards';
  }, duration);

  setTimeout(function() {
    toast.remove();
  }, duration + 2000);
}
