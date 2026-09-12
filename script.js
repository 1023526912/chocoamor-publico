// DATOS FÁCILES DE EDITAR
const INSTAGRAM = "https://www.instagram.com/chocoamor_vhg";
// Reemplaza los ceros por el número real, sin espacios. Ejemplo: 573001234567
const WHATSAPP_NUMBER = "573246384280";
const WHATSAPP_MESSAGE = "Hola Chocoamor, quiero hacer un pedido";

const menu = [
  { id:"bebidas", icon:"☕", title:"Cafetería y bebidas", items:[
    ["Capuccino","$4.000"],["Café","$2.000"],["Café especial","$3.000"],["Café frío","$7.000"],
    ["Frappé","$10.000"],["Aromática","$4.000"],["Soda saborizada · maracuyá o cereza","$12.000"],
    ["Soda prohibida","$14.000"],["Limonada acerezada","$12.000"],
    ["Malteada · café, frutos rojos, Oreo o vainilla","$12.000"],["Mimosa","$12.000"],["Tinto de verano","$11.000"]
  ]},
  { id:"postres", icon:"🍓", title:"Dulces y postres", items:[
    ["Galleta melcochuda","$6.000"],["Galleta + helado","$10.000"],["Croissant de fresas con crema","$12.000"],
    ["Doble placer","$12.000"],["Nachos dulces","$14.000"],["Waffle · frutal, chocolate, arequipe o Nutella","$14.000"],
    ["Creppe · besito de arequipe o pasión de fresa","$14.000"],["Suchi · elige fruta y salsa","$14.000"],
    ["Torta + helado","$11.000"],["Fresas con crema","$11.500"],["La mega fresa","$14.500"],
    ["Fresas con chocolate","$10.000"],["Duraznos con crema","$13.000"],["Cuchareable Milo","$11.000"],
    ["Brownie + helado","$12.000"],["Fresas con crema de pistacho","$13.000"]
  ]},
  { id:"antojitos", icon:"💗", title:"Otros antojitos", items:[
    ["Fresas con Chocoramo","$14.000"],["Fresas con queso","$13.000"],["Fresas con Nucita o Nutella","Consultar"],
    ["Fresas con minichips","$13.000"],["Fresas cubiertas en chocolate","$10.000"],
    ["Fresas con chocolate y helado","$13.000"],["Fresas con chocolate + topping","$12.000"]
  ]},
  { id:"obleas", icon:"🧇", title:"Obleas", items:[
    ["Tradicional","$6.000"],["Queso arequipe","$5.000"],["Queso chocolate","$6.000"],["Frutal","$8.000"]
  ]},
  { id:"toppings", icon:"✨", title:"Adiciones y toppings", items:[
    ["Queso","$3.000"],["Salsa de chocolate Hershey’s","$2.000"],["Chocolate derretido","$2.500"],
    ["Oreo","$2.000"],["Milo","$2.000"],["Leche Klim","$2.000"],["Chocolates","$2.000"],
    ["Chips de chocolate","$2.000"],["Mini chips","$2.000"],["Bolas explosivas","$3.000"],
    ["Adición de arequipe","$2.000"],["Krispis","$2.000"]
  ]}
];

const menuGrid = document.querySelector("#menu-grid");
const filters = document.querySelector("#filters");

menu.forEach((category) => {
  filters.insertAdjacentHTML("beforeend", `<a href="#${category.id}">${category.icon} ${category.title}</a>`);
  const products = category.items.map(([name,price]) =>
    `<li><span>${name}</span><i></i><strong>${price}</strong></li>`
  ).join("");
  menuGrid.insertAdjacentHTML("beforeend",
    `<article class="menu-card" id="${category.id}"><h3><span>${category.icon}</span>${category.title}</h3><ul>${products}</ul></article>`
  );
});

document.querySelectorAll(".instagram-link").forEach(link => link.href = INSTAGRAM);
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.querySelectorAll(".whatsapp-link").forEach(link => link.href = whatsappUrl);

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

// ========================= CHOCOAMOR PLAY =========================
// ========================= CHOCOAMOR PLAY · COCINA =========================
const gameModal = document.querySelector('#game-modal');
const gameStage = document.querySelector('#game-stage');
const gameProgress = document.querySelector('#game-progress');
const gameClose = document.querySelector('#game-close');
let activeGame = null;
let gameState = null;
let bakeTimer = null;

const CHOCO_GAMES = {
  cookie: {
    title:'Fábrica de Galletas', noun:'galleta', rounds:3,
    stations:[
      {key:'shape',label:'Molde',icon:'✂️',options:[['round','Redonda','●'],['heart','Corazón','♥'],['star','Estrella','★']]},
      {key:'flavor',label:'Masa',icon:'🥣',options:[['choco','Chocolate','🍫'],['vanilla','Vainilla','🤍'],['strawberry','Fresa','🍓']]},
      {key:'bake',label:'Horneado',icon:'🔥',options:[['soft','Suave','☀'],['golden','Dorado','☀'],['crisp','Crocante','☀']]},
      {key:'icing',label:'Cobertura',icon:'🧁',options:[['pink','Rosa','🌸'],['choco','Chocolate','🍫'],['white','Blanca','🤍']]},
      {key:'topper',label:'Decoración',icon:'✨',options:[['hearts','Corazones','💗'],['chips','Chips','🍫'],['sprinkles','Chispas','✨']]}
    ]
  },
  cake: {
    title:'Pastelería Chocoamor', noun:'torta', rounds:3,
    stations:[
      {key:'shape',label:'Molde',icon:'🎂',options:[['round','Redonda','●'],['heart','Corazón','♥'],['square','Cuadrada','■']]},
      {key:'flavor',label:'Bizcocho',icon:'🥣',options:[['choco','Chocolate','🍫'],['vanilla','Vainilla','🤍'],['red','Red velvet','❤️']]},
      {key:'filling',label:'Relleno',icon:'🍰',options:[['berry','Frutos rojos','🍓'],['arequipe','Arequipe','🍯'],['choco','Chocolate','🍫']]},
      {key:'icing',label:'Cobertura',icon:'🧁',options:[['pink','Rosa','🌸'],['white','Blanca','🤍'],['choco','Chocolate','🍫']]},
      {key:'topper',label:'Decoración',icon:'✨',options:[['flowers','Flores','🌷'],['hearts','Corazones','💗'],['crown','Corona','👑']]}
    ]
  }
};

function rand(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function makeOrder(type){
  const d=CHOCO_GAMES[type], order={};
  d.stations.forEach(st=>order[st.key]=rand(st.options)[0]);
  return order;
}
function optionFor(st,key){ return st.options.find(o=>o[0]===key) }
function openGame(type){
  activeGame=type;
  gameState={round:1,score:0,lives:3,station:0,order:makeOrder(type),build:{},finished:[]};
  gameModal.classList.add('open'); gameModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden'; renderKitchen();
}
function closeGame(){
  clearInterval(bakeTimer); bakeTimer=null;
  gameModal.classList.remove('open'); gameModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function toast(msg){
  let el=document.querySelector('.toast'); if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}
  el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1200);
}
function setProgress(){
  const d=CHOCO_GAMES[activeGame];
  gameProgress.innerHTML=d.stations.map((_,i)=>`<span class="progress-dot ${i<gameState.station?'done':i===gameState.station?'active':''}"></span>`).join('');
}
function orderCard(){
  const d=CHOCO_GAMES[activeGame];
  return `<aside class="order-ticket"><div class="ticket-pin">♥</div><small>PEDIDO ${gameState.round} DE ${d.rounds}</small><h3>Hazlo igual</h3><div class="ticket-items">${d.stations.map(st=>{const o=optionFor(st,gameState.order[st.key]);return `<div><span>${st.icon}</span><b>${st.label}</b><em>${o[2]} ${o[1]}</em></div>`}).join('')}</div></aside>`;
}
function productArt(build=gameState.build,mini=false){
  if(activeGame==='cookie'){
    const shape=build.shape||'round', flavor=build.flavor||'vanilla', bake=build.bake||'', icing=build.icing||'', topper=build.topper||'';
    return `<div class="factory-cookie shape-${shape} flavor-${flavor} bake-${bake} ${mini?'mini':''}"><div class="cookie-icing icing-${icing}"></div><div class="cookie-topper top-${topper}">${topper==='hearts'?'♥ ♥ ♥':topper==='chips'?'● ● ●':topper==='sprinkles'?'✦ • ✦':''}</div></div>`;
  }
  const shape=build.shape||'round',flavor=build.flavor||'vanilla',fill=build.filling||'',icing=build.icing||'',topper=build.topper||'';
  return `<div class="factory-cake cake-${shape} cakeflavor-${flavor} ${mini?'mini':''}"><div class="cake-filling fill-${fill}"></div><div class="cake-frosting icing-${icing}"></div><div class="cake-topper top-${topper}">${topper==='flowers'?'🌷':topper==='hearts'?'♥♥♥':topper==='crown'?'♛':''}</div></div>`;
}
function renderKitchen(){
  clearInterval(bakeTimer); bakeTimer=null; setProgress();
  const d=CHOCO_GAMES[activeGame], st=d.stations[gameState.station];
  if(!st){ finishOrder(); return; }
  const isBake=st.key==='bake';
  gameStage.innerHTML=`<div class="factory-game">
    <div class="factory-hud"><div><strong>${d.title}</strong><span>Pedido ${gameState.round}/${d.rounds}</span></div><div class="factory-score">⭐ <b>${gameState.score}</b></div><div class="factory-lives">${'♥'.repeat(gameState.lives)}${'♡'.repeat(3-gameState.lives)}</div></div>
    <div class="factory-room">
      ${orderCard()}
      <main class="factory-work">
        <div class="station-sign"><span>${st.icon}</span><div><small>ESTACIÓN ${gameState.station+1}</small><h2 id="game-title">${st.label}</h2></div></div>
        <div class="conveyor"><div class="conveyor-belt"><i></i><i></i><i></i><i></i><i></i></div><div class="product-platform">${productArt()}</div></div>
        ${isBake?bakeStation(st):choiceStation(st)}
      </main>
    </div>
  </div>`;
  if(isBake) bindBake(st); else bindChoices(st);
}
function choiceStation(st){
  return `<div class="machine-panel"><p>Elige la opción que pide la tarjeta:</p><div class="machine-options">${st.options.map(o=>`<button data-value="${o[0]}"><span>${o[2]}</span><b>${o[1]}</b></button>`).join('')}</div></div>`;
}
function bindChoices(st){
  gameStage.querySelectorAll('.machine-options button').forEach(btn=>btn.onclick=()=>{
    const val=btn.dataset.value,target=gameState.order[st.key];
    gameState.build[st.key]=val;
    if(val===target){ gameState.score+=100; btn.classList.add('correct'); toast('¡Perfecto! +100 ⭐'); }
    else { gameState.lives=Math.max(0,gameState.lives-1); btn.classList.add('wrong'); toast('¡Ups! No era ese'); }
    const product=gameStage.querySelector('.product-platform'); product.innerHTML=productArt();
    setTimeout(()=>{ if(gameState.lives<=0) gameOver(); else {gameState.station++;renderKitchen()} },600);
  });
}
function bakeStation(st){
  return `<div class="oven-machine"><div class="oven-door"><div class="oven-glow">${productArt()}</div></div><div class="oven-gauge"><span>CRUDO</span><div class="gauge-track"><i id="bake-needle"></i><b class="sweet-zone"></b></div><span>QUEMADO</span></div><button id="oven-stop">SACAR DEL HORNO</button><small>Detén la aguja en la zona rosa.</small></div>`;
}
function bindBake(st){
  let p=0,dir=1;const needle=gameStage.querySelector('#bake-needle');
  bakeTimer=setInterval(()=>{p+=dir*2;if(p>=100){p=100;dir=-1}if(p<=0){p=0;dir=1}needle.style.left=p+'%'},35);
  gameStage.querySelector('#oven-stop').onclick=()=>{
    clearInterval(bakeTimer); bakeTimer=null;
    let val=p<38?'soft':p<=66?'golden':'crisp'; gameState.build.bake=val;
    if(val===gameState.order.bake){gameState.score+=150;toast('¡Horneado perfecto! +150 ⭐')}else{gameState.lives=Math.max(0,gameState.lives-1);toast(p>66?'Se pasó un poquito 😅':'Le faltó horno 😅')}
    setTimeout(()=>{if(gameState.lives<=0)gameOver();else{gameState.station++;renderKitchen()}},650);
  };
}
function finishOrder(){
  const d=CHOCO_GAMES[activeGame]; gameState.finished.push({...gameState.build});
  const perfect=d.stations.every(st=>gameState.build[st.key]===gameState.order[st.key]);
  if(perfect) gameState.score+=250;
  gameStage.innerHTML=`<div class="order-complete"><div class="complete-sparkles">✦ ♥ ✦</div>${productArt(gameState.build)}<h2>${perfect?'¡Pedido perfecto!':'¡Pedido entregado!'}</h2><p>${perfect?'Quedó idéntico a la tarjeta. Bono +250 ⭐':'Llegó a la vitrina. El siguiente puede quedar aún mejor.'}</p><div class="receipt"><span>PUNTOS</span><strong>${gameState.score}</strong></div><button class="game-action" id="next-order">${gameState.round<d.rounds?'SIGUIENTE PEDIDO →':'VER RESULTADO →'}</button></div>`;
  gameStage.querySelector('#next-order').onclick=()=>{
    if(gameState.round>=d.rounds){renderFinal();return}
    gameState.round++;gameState.station=0;gameState.order=makeOrder(activeGame);gameState.build={};renderKitchen();
  };
}
function gameOver(){
  gameStage.innerHTML=`<div class="order-complete game-over"><div class="sad-cookie">💔</div><h2>La cocina cerró por hoy</h2><p>Te quedaste sin corazones, pero puedes volver a intentarlo.</p><button class="game-action" id="retry">VOLVER A JUGAR</button></div>`;
  gameStage.querySelector('#retry').onclick=()=>openGame(activeGame);
}
function renderFinal(){
  const max=CHOCO_GAMES[activeGame].rounds*(5*100+250)+CHOCO_GAMES[activeGame].rounds*50;
  const pct=Math.min(100,Math.round(gameState.score/max*100));
  let title=pct>=85?'Chef Chocoamor':pct>=65?'Pastelero estrella':pct>=45?'Ayudante dulce':'Aprendiz de cocina';
  gameStage.innerHTML=`<div class="factory-final"><div class="final-stars">${pct>=85?'★★★':pct>=60?'★★☆':'★☆☆'}</div><h2>${title}</h2><p>Terminaste los ${CHOCO_GAMES[activeGame].rounds} pedidos de ${CHOCO_GAMES[activeGame].noun}s.</p><div class="big-score"><span>${gameState.score}</span><small>PUNTOS</small></div><div class="finished-shelf">${gameState.finished.map(b=>productArt(b,true)).join('')}</div><div class="result-actions"><button class="game-action" id="play-again">JUGAR DE NUEVO</button><button class="game-action secondary" id="switch-game">JUGAR ${activeGame==='cookie'?'TORTAS':'GALLETAS'}</button></div></div>`;
  gameStage.querySelector('#play-again').onclick=()=>openGame(activeGame);
  gameStage.querySelector('#switch-game').onclick=()=>openGame(activeGame==='cookie'?'cake':'cookie');
}

document.querySelectorAll('[data-game]').forEach(card=>card.addEventListener('click',()=>openGame(card.dataset.game)));
gameClose.addEventListener('click',closeGame);
gameModal.addEventListener('click',e=>{if(e.target===gameModal)closeGame()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&gameModal.classList.contains('open'))closeGame()});

.footer-copyright {
  width: 100%;
  padding: 18px 20px;
  background-color: #57220f;
  color: #ffffff;
  text-align: center;
  box-sizing: border-box;
}

.footer-copyright p {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
}