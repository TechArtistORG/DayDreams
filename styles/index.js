 /* ========= Data ========= */
  const products = [
    {name:"Bracelet", price:"149₹", oldPrice:"", imgs:["others/images/product/bracelet01-1.jpg"], desc:"Handmade premium bracelet"},
    {name:"Bracelet", price:"149₹", oldPrice:"", imgs:["others/images/product/bracelet02-1.jpg"], desc:"Handmade premium bracelet"},
    {name:"Bracelet", price:"149₹", oldPrice:"", imgs:["others/images/product/bracelet03-1.jpg"], desc:"Handmade premium bracelet"},
    {name:"Bracelet", price:"149₹", oldPrice:"", imgs:["others/images/product/bracelet04-1.jpg"], desc:"Handmade premium bracelet"},
    {name:"Bracelet", price:"", oldPrice:"", imgs:["others/images/product/bracelet05-1.jpg"], desc:"Not available"},
    {name:"Bracelet", price:"149₹", oldPrice:"", imgs:["others/images/product/bracelet06-1.jpg"], desc:"Handmade premium bracelet"},
    {name:"Bracelet", price:"149₹", oldPrice:"", imgs:["others/images/product/bracelet07-1.jpg"], desc:"Handmade premium bracelet"},
    {name:"PhoneCharm", price:"99₹", oldPrice:"", imgs:["others/images/product/phonechram01-1.jpg"], desc:"Handmade phonecharm"},
    {name:"PhoneCharm", price:"99₹", oldPrice:"", imgs:["others/images/product/phonechram02-3.jpg","others/images/product/phonechram02-2.jpg","others/images/product/phonechram02-1.jpg"], desc:"Handmade phonecharm"},
    {name:"PhoneCharm", price:"99₹", oldPrice:"", imgs:["others/images/product/phonechram03-1.jpg"], desc:"Handmade phonecharm"},
    {name:"PhoneCharm", price:"99₹", oldPrice:"", imgs:["others/images/product/phonechram04-1.jpg"], desc:"Handmade phonecharm"},
    {name:"PhoneCharm", price:"99₹", oldPrice:"", imgs:["others/images/product/phonechram05-1.jpg"], desc:"Handmade phonecharm"},
    {name:"BagCharm", price:"169₹", oldPrice:"499₹", imgs:["others/images/product/bagchram01-1.jpg"], desc:"Stylish bag charm"},
    {name:"BagCharm", price:"169₹", oldPrice:"", imgs:["others/images/product/bagchram02-1.jpg"], desc:"Stylish bag charm"},
    {name:"BagCharm", price:"169₹", oldPrice:"", imgs:["others/images/product/bagchram03-1.jpg"], desc:"Stylish bag charm"},
    {name:"BagCharm", price:"169₹", oldPrice:"", imgs:["others/images/product/bagchram04-1.jpg"], desc:"Stylish bag charm"},
    {name:"BagCharm", price:"169₹", oldPrice:"", imgs:["others/images/product/bagchram05-1.jpg"], desc:"Stylish bag charm"},
    {name:"BagCharm", price:"169₹", oldPrice:"", imgs:["others/images/product/bagchram06-1.jpg"], desc:"Stylish bag charm"},
    {name:"BagCharm", price:"169₹", oldPrice:"", imgs:["others/images/product/bagchram07-1.jpg"], desc:"Stylish bag charm"},
    {name:"BagCharm", price:"169₹", oldPrice:"", imgs:["others/images/product/bagchram08-1.jpg"], desc:"Stylish bag charm"},
    {name:"Necklace", price:"249₹", oldPrice:"", imgs:["others/images/product/necklace01-1.jpg"], desc:"Beautiful handmade necklace"},
    {name:"Necklace", price:"249₹", oldPrice:"", imgs:["others/images/product/necklace02-1.jpg"], desc:"Beautiful handmade necklace"},
    {name:"Necklace", price:"249₹", oldPrice:"", imgs:["others/images/product/necklace03-1.jpg"], desc:"Beautiful handmade necklace"},
  ];
  /* ========= DOM refs ========= */
  const productGrid = document.getElementById('productGrid');
  const modalWrap = document.getElementById('modalWrap');
  const modalBox = document.getElementById('modalBox');
  const modalImg = document.getElementById('modalImg');
  const modalName = document.getElementById('modalName');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const thumbRow = document.getElementById('thumbRow');
  const modalOrder = document.getElementById('modalOrder');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const searchInput = document.getElementById('globalSearch');
  const searchBtn = document.getElementById('searchBtn');
  const categorySelect = document.getElementById('categorySelect');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchResults = document.getElementById('searchResults');
  const closeSearchPanel = document.getElementById('closeSearchPanel');
  const mobileSearchToggle = document.getElementById('mobileSearchToggle');
  const topbar = document.getElementById('topbar');
  /* ========= Rendering grid ========= */
  function createCard(p, idx){
    const div = document.createElement('article');
    div.className = 'card';
    div.setAttribute('tabindex','0');
    div.innerHTML = `
      <div class="thumb" aria-hidden="true">
        <img loading="lazy" src="${p.imgs[0]}" alt="${p.name} image">
      </div>
      <div class="meta">
        <div class="title">${escapeHtml(p.name)}</div>
        <div class="desc">${escapeHtml(p.desc)}</div>
        <div class="price-row">
          <div>
            ${p.oldPrice ? `<div class="old">${escapeHtml(p.oldPrice)}</div>` : ''}
            <div class="price">${p.price || 'Not Available'}</div>
          </div>
          <div class="btn-row">
            <button class="view-btn" data-index="${idx}" aria-label="View ${escapeHtml(p.name)} details">View</button>
            <button class="order-small" data-order="${idx}" aria-label="Order ${escapeHtml(p.name)}">✦</button>
          </div>
        </div>
      </div>
    `;
    
    

    // events
    const thumb = div.querySelector('.thumb');
    thumb.addEventListener('click', ()=>openModal(idx));
    div.querySelector('.view-btn').addEventListener('click', ()=>openModal(idx));
    div.querySelector('[data-order]').addEventListener('click', (e)=>{
      e.preventDefault();
      openOrderWindow(idx);
    });
    // keyboard: enter opens modal
    div.addEventListener('keydown', (ev)=>{
      if(ev.key === 'Enter') openModal(idx);
    });
    return div;
  }

  function renderGrid(list = products){
    productGrid.innerHTML = '';
    const frag = document.createDocumentFragment();
    list.forEach((p,i)=>{
      frag.appendChild(createCard(p,i));
    });
    productGrid.appendChild(frag);
  }
  renderGrid();
/* ========= Modal logic ========= */
  let currentIndex = 0;
  let currentImgs = [];

  function openModal(index){
    currentIndex = index;
    currentImgs = products[index].imgs.slice();
    updateModalContent();
    modalWrap.style.display = 'flex';
    modalWrap.setAttribute('aria-hidden','false');
    modalBox.classList.add('show');
    document.body.style.overflow = 'hidden';
    // focus management
    setTimeout(()=> modalClose.focus(), 120);
    trapFocus(modalBox);
  }

  function closeModal(){
    modalBox.classList.remove('show');
    modalWrap.style.display = 'none';
    modalWrap.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    releaseTrap();
  }

  function updateModalContent(){
    const p = products[currentIndex];
    modalImg.src = currentImgs[0] || '';
    modalImg.alt = p.name + ' photo';
    modalName.textContent = p.name;
    modalPrice.textContent = p.price || 'Not Available';
    modalDesc.textContent = p.desc || '';
    const username = 'daydream_beads_';
    const message = `Hello, I want to order ${p.name} for ${p.price || 'price unavailable'}`;
    modalOrder.href = `https://www.instagram.com/direct/t/${username}?text=${encodeURIComponent(message)}`;
    // thumbs
    thumbRow.innerHTML = '';
    currentImgs.forEach((im, i)=>{
      const el = document.createElement('div');
      el.className = 'small-thumb' + (i===0 ? ' active' : '');
      el.setAttribute('role','button');
      el.setAttribute('tabindex','0');
      el.innerHTML = `<img loading="lazy" src="${im}" alt="${p.name} small ${i+1}">`;
      el.addEventListener('click', ()=> setModalImage(i));
      el.addEventListener('keydown', (ev)=> { if(ev.key === 'Enter') setModalImage(i); });
      thumbRow.appendChild(el);
    });
  }

  function setModalImage(i){
    // rotate currentImgs so that i becomes first
    if(i === 0) return;
    currentImgs = currentImgs.slice(i).concat(currentImgs.slice(0,i));
    modalImg.src = currentImgs[0];
    Array.from(thumbRow.children).forEach((el, idx)=> el.classList.toggle('active', idx===0));
  }

  function openOrderWindow(idx){
    const p = products[idx];
    const username = 'daydream_beads_';
    const message = `Hello, I want to order ${p.name} for ${p.price || 'price unavailable'}`;
    const url = `https://www.instagram.com/direct/t/${username}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  }

  prevBtn.addEventListener('click', ()=>{
    if(currentImgs.length <=1) return;
    currentImgs.unshift(currentImgs.pop());
    modalImg.src = currentImgs[0];
    updateThumbActive();
  });
  nextBtn.addEventListener('click', ()=>{
    if(currentImgs.length <=1) return;
    currentImgs.push(currentImgs.shift());
    modalImg.src = currentImgs[0];
    updateThumbActive();
  });

  function updateThumbActive(){
    Array.from(thumbRow.children).forEach((el, idx)=> el.classList.toggle('active', idx===0));
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // keyboard controls
  document.addEventListener('keydown', (e)=>{
    if(modalWrap.style.display === 'flex'){
      if(e.key === 'Escape') closeModal();
      if(e.key === 'ArrowLeft') prevBtn.click();
      if(e.key === 'ArrowRight') nextBtn.click();
    }
  });

  // mobile swipe for modal
  (function addSwipe(){
    let startX = 0;
    const wrap = document.getElementById('modalImageWrap') || document.querySelector('.modal-image');
    if(!wrap) return;
    wrap.addEventListener('touchstart', (ev)=> startX = ev.touches[0].clientX, {passive:true});
    wrap.addEventListener('touchend', (ev)=>{
      const endX = ev.changedTouches[0].clientX;
      if(endX < startX - 40) nextBtn.click();
      if(endX > startX + 40) prevBtn.click();
    }, {passive:true});
  })();
  
  /* ========= Search & Live filter ========= */
  function normalizeText(v){ return (v||'').toString().toLowerCase().trim(); }

  function runSearch(query, category = 'all'){
    query = normalizeText(query);
    const cat = normalizeText(category);
    let filtered = products.filter((p)=>{
      const name = normalizeText(p.name);
      const desc = normalizeText(p.desc);
      const inCategory = (cat === 'all') ? true : (name.includes(cat) || desc.includes(cat));
      const matches = query === '' ? true : (name.includes(query) || desc.includes(query));
      return inCategory && matches;
    });
    renderSearchResults(filtered);
  }

  function renderSearchResults(list){
    searchResults.innerHTML = '';
    if(list.length === 0){
      searchResults.innerHTML = `<div class="search-empty"><strong>No product found</strong><div class="text-muted">Try different keywords</div></div>`;
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((p)=>{
      const el = document.createElement('div');
      el.className = 'search-item';
      el.innerHTML = `
        <img loading="lazy" src="${p.imgs[0]}" alt="${p.name}">
        <div class="info">
          <h4>${escapeHtml(p.name)}</h4>
          <p class="text-muted">Price: ${p.price || 'Not Available'}</p>
          <p class="text-muted">${escapeHtml(p.desc)}</p>
          <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
            <button class="view-btn">View</button>
            <button class="order-small">✦</button>
          </div>
        </div>
      `;
      const viewBtn = el.querySelector('.view-btn');
      const orderBtn = el.querySelector('.order-small');
      viewBtn.addEventListener('click', ()=>{
        const trueIndex = products.indexOf(p);
        if(trueIndex >= 0) openModal(trueIndex);
      });
      orderBtn.addEventListener('click', ()=>{
        const trueIndex = products.indexOf(p);
        if(trueIndex >= 0) openOrderWindow(trueIndex);
      });
      frag.appendChild(el);
    });
    searchResults.appendChild(frag);
  }

  // debounce
  let debounceTimer;
  searchInput.addEventListener('input', (e)=>{
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(()=>{
      runSearch(e.target.value, categorySelect.value);
      showSearchOverlay();
    }, 180);
  });

  searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    runSearch(searchInput.value, categorySelect.value);
    showSearchOverlay();
  });

  categorySelect.addEventListener('change', ()=>{
    const cat = categorySelect.value;
    if(cat === 'all') renderGrid();
    else {
      const filtered = products.filter(p => normalizeText(p.name).includes(normalizeText(cat)) || normalizeText(p.desc).includes(normalizeText(cat)));
      renderGrid(filtered);
    }
  });

  /* ========= Overlay open/close helpers ========= */
  function showSearchOverlay(){
    searchOverlay.style.display = 'flex';
    searchOverlay.setAttribute('aria-hidden','false');
    // focus first interactive element inside overlay
    const btn = searchOverlay.querySelector('.view-btn, .order-small');
    if(btn) btn.focus();
    trapFocus(searchOverlay.querySelector('.panel'));
  }
  function hideSearchOverlay(){
    searchOverlay.style.display = 'none';
    searchOverlay.setAttribute('aria-hidden','true');
    releaseTrap();
  }
  closeSearchPanel.addEventListener('click', hideSearchOverlay);
  document.getElementById('searchOverlay').addEventListener('click', (e)=>{ if(e.target === e.currentTarget) hideSearchOverlay(); });

  mobileSearchToggle && mobileSearchToggle.addEventListener('click', ()=>{
    runSearch(searchInput.value, categorySelect.value);
    showSearchOverlay();
  });

  // close overlays on escape globally
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      hideSearchOverlay();
      closeModal();
    }
  });

  // clicking overlay outside closes handled above; modal overlay already closes

  /* ========= Utilities ========= */

  // simple focus trap (basic)
  let _trap = null;
  function trapFocus(container){
    releaseTrap();
    if(!container) return;
    const focusables = Array.from(container.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])')).filter(el=>!el.hasAttribute('disabled'));
    if(!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length-1];
    _trap = (e) => {
      if(e.key !== 'Tab') return;
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', _trap);
  }
  function releaseTrap(){ if(_trap){ document.removeEventListener('keydown', _trap); _trap = null; } }

  // Escape HTML to avoid injection into DOM strings
  function escapeHtml(str){
    return String(str || '').replace(/[&<>"'`=\/]/g, function(s) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'}[s];
    });
  }

  // ensure images fallback gracefully
  function validateImages(root = document){
    root.querySelectorAll('img').forEach(img=>{
      img.addEventListener('error', ()=>{ 
        img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420"><rect width="100%"height="100%"fill="#f3f3f3"/><text x="50%"y="50%"dominant-baseline="middle"text-anchor="middle"fill="#cccccc"font-family="Arial"font-size="18">Image not found</text></svg>`);
      });
    });
  }
  validateImages();

  // bind order buttons in cards (in case elements re-render)
  function bindCardOrders(){
    document.querySelectorAll('[data-order]').forEach(btn=>{
      btn.removeEventListener('click', cardOrderHandler);
      btn.addEventListener('click', cardOrderHandler);
    });
  }
  function cardOrderHandler(e){
    e.preventDefault();
    const idx = parseInt(this.getAttribute('data-order'));
    if(!isNaN(idx)) openOrderWindow(idx);
  }

  // initial bindings
  document.addEventListener('DOMContentLoaded', ()=>{
    renderGrid();
    validateImages();
    bindCardOrders();
  });

  // scroll behavior: shrink header slightly on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if(y > 40 && lastScroll <= 40){
      topbar.classList.add('compact');
    } else if(y <= 40 && lastScroll > 40){
      topbar.classList.remove('compact');
    }
    lastScroll = y;
  }, {passive:true});

  // ensure view button scroll action (modal -> card)
  document.getElementById('modalAddView').addEventListener('click', ()=>{
    closeModal();
    const cards = Array.from(document.querySelectorAll('.card'));
    if(cards[currentIndex]){
      cards[currentIndex].scrollIntoView({behavior:'smooth', block:'center'});
      const el = cards[currentIndex];
      el.style.transition = "box-shadow .3s ease, transform .3s ease";
      el.style.boxShadow = "0 28px 80px rgba(64,57,53,0.12)";
      setTimeout(()=>{ el.style.boxShadow = ""; }, 900);
      // focus the card for accessibility
      setTimeout(()=> el.focus(), 450);
    }
  });

  // small safety: prevent navigation lost if user clicks disabled images
  window.addEventListener('load', ()=> validateImages(document));

  // make sure search results are keyboard friendly: delegate with event listener
  document.addEventListener('click', (e)=>{
    if(e.target.matches('.search-item .view-btn')){
      const btn = e.target;
      const item = btn.closest('.search-item');
      const img = item.querySelector('img');
      const name = item.querySelector('h4').textContent;
      const p = products.find(prod => prod.name === name || prod.imgs[0] === img.src);
      if(p) openModal(products.indexOf(p));
    }
  });
