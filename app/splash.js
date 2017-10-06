function closeModal(modal){
  modal.style.display = "none"
}
const splash = () => {
  const splashModal = document.getElementById('splash-modal')
  const startButton = document.getElementById('start-button')

  /* startButton */ // After testing this, clicking the button wasn't obvious to non-programmers
  window.addEventListener('click', closeModal.bind(null, splashModal))

  window.addEventListener('keydown', e =>
    (e.keyCode === 27) && closeModal(splashModal)
  )
};

export default splash
