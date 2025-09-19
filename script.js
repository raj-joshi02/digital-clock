// script.js - corrected to match your index.html structure

// showClock(type) is used by your HTML buttons: showClock('digital') / showClock('analog')
function showClock(type){
    const d = document.getElementById('digitalClock');
    const a = document.getElementById('analogClock');
    if(type === 'digital'){
      d.style.display = 'block';
      a.style.display = 'none';
    } else {
      d.style.display = 'none';
      a.style.display = 'block';
    }
  }
  
  /* ---------------- Digital clock ---------------- */
  function updateDigitalClock(){
    const now = new Date();
    // show local time with seconds
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
  
    // Using toLocaleTimeString so it respects user locale/time-format
    timeEl.textContent = now.toLocaleTimeString();
    dateEl.textContent = now.toDateString();
  }
  
  /* ---------------- Analog clock ---------------- */
  const hourHand = document.getElementById('hour');
  const minuteHand = document.getElementById('minute');
  const secondHand = document.getElementById('second');
  
  function updateAnalogClock(){
    const now = new Date();
  
    const hrs = now.getHours() % 12;
    const mins = now.getMinutes();
    const secs = now.getSeconds();
  
    // degrees measured from 12 o'clock (0 at 12). We will subtract 90deg in transform below
    const hourDeg = (hrs + mins / 60 + secs / 3600) * 30;       // 360/12
    const minuteDeg = (mins + secs / 60) * 6;                  // 360/60
    const secondDeg = secs * 6;
  
    // Because the unrotated hand points to 3 o'clock, we subtract 90deg to align 0deg => 12 o'clock
    hourHand.style.transform = `rotate(${hourDeg - 90}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg - 90}deg)`;
    secondHand.style.transform = `rotate(${secondDeg - 90}deg)`;
  }
  
  /* ------------- Setup & run --------------- */
  
  // run every 250ms for snappier minute/second accuracy (and smooth hour)
  setInterval(() => {
    updateDigitalClock();
    updateAnalogClock();
  }, 250);
  
  // initial draw
  updateDigitalClock();
  updateAnalogClock();
  
  // show digital by default (your index.html uses buttons to call showClock)
  showClock('digital');
  