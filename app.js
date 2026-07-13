// Simple Soirée Planner — app.js
// Keeps code small and readable. Uses localStorage for persistence.

const OPENING_NIGHT = (() => {
  // Set opening night to the nearest upcoming date (July 20 of current year if future,
  // otherwise next year) at 18:30 local time (golden hour-ish).
  const now = new Date();
  const year = now.getFullYear();
  let d = new Date(year, 6, 20, 18, 30, 0); // July is month 6 (0-indexed)
  if (d < now) d = new Date(year + 1, 6, 20, 18, 30, 0);
  return d;
})();

const DEFAULT_DRINKS = [
  { night: 'Night 1', name: 'Peach & Thyme Spritz', desc: 'Fizz, peach syrup, fresh thyme' },
  { night: 'Night 2', name: 'Citrus Rosemary Cooler', desc: 'Gin, citrus, rosemary soda' },
  { night: 'Night 3', name: 'Smoked Orange Old-Fashioned', desc: 'Whiskey, smoked orange' }
];

const STORAGE_KEY = 'entire-soiree-planner:v1';

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { guests: [
      {id:1,name:'Ava Martin',rsvp:'yes',plus:'Noah Martin'},
      {id:2,name:'Liam Chen',rsvp:'pending',plus:''},
      {id:3,name:'Sofia Alvarez',rsvp:'yes',plus:'Mateo Alvarez'}
    ], drinks: DEFAULT_DRINKS };
    return JSON.parse(raw);
  }catch(e){
    console.error('state load failed',e);
    return { guests:[], drinks:DEFAULT_DRINKS };
  }
}

function saveState(state){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// UI helpers
const state = loadState();
let idCounter = state.guests.reduce((m,g)=>Math.max(m,g.id||0),0)+1;

function renderGuests(){
  const tbody = document.querySelector('#guest-table tbody');
  tbody.innerHTML = '';
  state.guests.forEach(g=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(g.name)}</td>
      <td><span class="status ${g.rsvp}">${g.rsvp.toUpperCase()}</span></td>
      <td>${escapeHtml(g.plus||'—')}</td>
      <td><button class="btn-clear" data-id="${g.id}">Toggle RSVP</button></td>
    `;
    tbody.appendChild(tr);
  });
  // attach toggle handlers
  tbody.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = Number(btn.dataset.id);
      const guest = state.guests.find(x=>x.id===id);
      if(!guest) return;
      guest.rsvp = guest.rsvp === 'yes' ? 'no' : (guest.rsvp === 'no' ? 'pending' : 'yes');
      saveState(state); renderGuests();
    });
  });
}

function renderDrinks(){
  const ol = document.getElementById('drinks-list');
  ol.innerHTML = '';
  state.drinks.forEach(d=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${escapeHtml(d.night)}:</strong> ${escapeHtml(d.name)} <div class="muted">${escapeHtml(d.desc||'')}</div>`;
    ol.appendChild(li);
  });
}

function setupAddGuest(){
  const addBtn = document.getElementById('add-guest');
  addBtn.addEventListener('click', ()=>{
    const name = document.getElementById('new-name').value.trim();
    const plus = document.getElementById('new-plusone').value.trim();
    const rsvp = document.getElementById('new-rsvp').value;
    if(!name) return alert('Please provide a guest name.');
    state.guests.push({id: idCounter++, name, plus, rsvp});
    saveState(state);
    document.getElementById('new-name').value='';
    document.getElementById('new-plusone').value='';
    renderGuests();
  });
}

// Countdown
function updateCountdown(){
  const el = document.getElementById('countdown');
  const label = document.getElementById('opening-night-label');
  label.textContent = OPENING_NIGHT.toLocaleString();
  const now = new Date();
  const diff = OPENING_NIGHT - now;
  if (diff <= 0){ el.textContent = 'It\'s golden hour!'; return; }
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const mins = Math.floor((diff%(1000*60*60))/(1000*60));
  const secs = Math.floor((diff%(1000*60))/1000);
  el.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
}

// small helper to avoid basic XSS in this tiny app
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// init
document.addEventListener('DOMContentLoaded', ()=>{
  renderGuests(); renderDrinks(); setupAddGuest(); updateCountdown();
  setInterval(updateCountdown, 1000);
});
