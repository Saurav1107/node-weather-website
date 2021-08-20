const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input');
const msg1 = document.getElementById('one');
const msg2 = document.getElementById('two');

// msg.textContent= 'From JS'

weatherForm.addEventListener('submit',(event) => {
  event.preventDefault()
  const location = searchEl.value

  msg1.textContent = 'Loading....'
  msg2.textContent = ''

  fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
      if(data.error){
        msg1.textContent = data.error
      }else{
        msg1.textContent = data.location;
        msg2.textContent = data.weather
      }
    })
  })

})