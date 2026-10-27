/* 나그마 사이트 URL 지도 — 섹션 키 → 실제 경로 */
var NAGMA_PATH={"home": "/", "about": "/about/", "about-naming": "/about/naming/", "about-vision": "/about/vision/", "about-rnd": "/about/rnd/", "about-history": "/about/history/", "about-life": "/about/life/", "team": "/team/", "work": "/work/", "work-ax": "/work/ax/", "work-it": "/work/it/", "work-video": "/work/video/", "work-design": "/work/design/", "work-process": "/work/process/", "news": "/news/", "contact": "/contact/"};
var NAGMA_SECOF={"about-overview": "about", "team-org": "team", "team-units": "team", "work-medical": "work", "news-list": "news", "contact-info": "contact", "contact-inquiry": "contact", "contact-map": "contact", "news-press": "news", "news-cert": "news"};
var PATH=NAGMA_PATH, SECOF=NAGMA_SECOF;
(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lang='ko'; try{lang=localStorage.getItem('nagma-lang')==='en'?'en':'ko'}catch(_){}
  const T=s=>(lang==='en'&&typeof DICT!=='undefined'&&(s in DICT))?DICT[s]:s;
  const IMG='/assets/img/';

  /* ---------- data ---------- */
  const NEWS=[
    {d:'2026.10.26',img:'news-press-02.jpg',fit:'photo',c:'press',cl:'PRESS',src:'IT비즈뉴스',t:'제약바이오 "데이터 통합이 AX의 출발점" — 나그마, 제약 전문 IT 파트너 입지 강화',s:'제약·바이오 업계의 DX가 AX로 확장되면서 부서별로 흩어진 데이터 통합이 핵심 과제로 떠올랐습니다. HCP 포털·웨비나·통합 메시징·LMS·AI 서비스를 개발하고 운영해 온 나그마의 역할을 다뤘습니다.',u:'https://www.itbiznews.com/news/articleView.html?idxno=229121'},
    {d:'2026.09.11',img:'news-poster-bio.jpg',fit:'doc',c:'event',cl:'EVENT',t:'2026 글로벌 오픈이노베이션 위크 — 바이오헬스 포스터 전시 참가',s:'보건복지부 주최, 한국보건산업진흥원 주관 행사에서 제약·바이오 기업의 부서별 데이터 통합과 AI 기반 업무 환경 구성 방안을 제안했습니다.',u:''},
    {d:'2026.04.28',img:'news-press-01.jpg',fit:'doc',c:'press',cl:'PRESS',src:'스타트업데일리',t:'나그마, 국내 대형 제약사 통합 디지털 커뮤니케이션 솔루션 구축·운영',s:'HCP 포털, 웨비나, 메시징을 하나로 묶은 통합 디지털 커뮤니케이션 솔루션을 국내 대형 제약사에 구축하고 운영하고 있습니다.',u:'https://www.startupdaily.kr/news/articleView.html?idxno=9760'},
    {d:'2025.09.29',img:'news-cert-lab.jpg',fit:'doc',c:'cert',cl:'CERTIFIED',t:'기업부설연구소 인정',s:'한국산업기술진흥협회(KOITA)로부터 기업부설연구소 인정을 받았습니다(제2025113058호). AI와 데이터 기술을 자체 연구·개발하는 전담 조직입니다.',u:''},
    {d:'2025.09.23',img:'news-video-01.jpg',fit:'photo',c:'video',cl:'VIDEO',t:'인천스타트업파크 인사이드파크 — 나그마 편 [인(턴)스타임]',s:'2025 신규 입주기업 나그마를 소개하는 인천스타트업파크 영상입니다.',u:'https://www.youtube.com/watch?v=zzeun8xg3ug'},
    {d:'2025.09.16',img:'news-cert-patent.jpg',fit:'doc',c:'cert',cl:'PATENT',t:'특허 등록 — 문서 수준 관계 추출 방법 및 장치',s:'문서 속 개체 간 관계를 자동으로 추출하는 자연어처리 기술 특허(제10-2511282호)를 확보했습니다. 지능형 검색과 문서 자동화의 기술 기반입니다.',u:''}
  ];
  const SPACE=[['IMG-01_office-exterior.jpg','회사 전경'],['IMG-02_cafeteria.jpg','카페테리아'],['IMG-16_gym.jpg','체력단련실'],['IMG-05_lounge.jpg','브릿지 라운지'],['IMG-17_pingpong.jpg','탁구장'],['IMG-03_meeting-room.jpg','미팅룸'],['IMG-04_workspace.jpg','업무 공간'],['IMG-06_office-detail.jpg','사무실 디테일']];
  const ACT=[['IMG-08_workshop.jpg','워크샵'],['IMG-09_event.jpg','사내 행사'],['IMG-10_education.jpg','교육·세미나'],['IMG-11_etc.jpg','기타 활동']];

  /* ---------- builders ---------- */
  const PH=["IMG-01_office-exterior.jpg", "IMG-02_cafeteria.jpg", "IMG-16_gym.jpg", "IMG-05_lounge.jpg", "IMG-17_pingpong.jpg", "IMG-03_meeting-room.jpg", "IMG-04_workspace.jpg", "IMG-06_office-detail.jpg", "IMG-08_workshop.jpg", "IMG-09_event.jpg", "IMG-10_education.jpg", "IMG-11_etc.jpg", "news-poster-bio.jpg", "news-press-01.jpg", "news-cert-lab.jpg", "news-video-01.jpg", "news-cert-patent.jpg", "news-press-02.jpg"].reduce((o,k)=>(o[k]=IMG+k,o),{});
  const NI=NEWS.map(n=>n.img), DOC=new Set(NEWS.filter(n=>n.fit==='doc').map(n=>n.img));
  document.querySelectorAll('[data-ph-img]').forEach(el=>{el.insertAdjacentHTML('afterbegin',`<img src="${PH[el.dataset.phImg]}" alt="">`)});
  document.querySelectorAll('[data-ph]').forEach(el=>{el.innerHTML=`<img src="${PH[el.dataset.ph]}" alt="">`});
  const fig=([f,c])=>`<figure class="ph"><img src="${PH[f]||IMG+f}" alt="${c}" onerror="this.remove()"><figcaption>${c}</figcaption></figure>`;
  const setHTML=(id,html)=>{const e=document.getElementById(id);if(e)e.innerHTML=html};
  setHTML('homeGallery',[SPACE[0],SPACE[1],SPACE[3],ACT[2]].map(fig).join(''));
  setHTML('spaceGallery',SPACE.map(fig).join(''));
  setHTML('actGallery',ACT.map(fig).join(''));

  const extra=n=>n.u?`<span class="go">${n.c==='video'?'영상 보기':'기사 보기'} ↗</span>`:`<span class="go none">—</span>`;
  const href=n=>n.u?`href="${n.u}" target="_blank" rel="noopener"`:`href="${PATH.news}"`;
  setHTML('homeNews',NEWS.slice(0,3).map((n,i)=>`<a class="card" ${href(n)}><div class="thumb${DOC.has(n.img)?' framed':''}"><img src="${PH[n.img]}" alt=""><span class="tag">${n.cl}</span></div><div class="meta">${n.d}${n.src?' · <span>'+n.src+'</span>':''}</div><h3>${n.t}</h3><p>${n.s}</p></a>`).join(''));
  const nlist=document.getElementById('nlist');
  function renderNews(f){
    if(!nlist)return;
    nlist.innerHTML=NEWS.filter(n=>f==='all'||n.c===f).map((n,i)=>`<a class="nrow" ${href(n)}><div class="thumb${DOC.has(n.img)?' framed':''}"><img src="${PH[n.img]}" alt=""></div><div><div class="meta"><b>${n.cl}</b><span>${n.d}</span>${n.src?'<span>'+n.src+'</span>':''}</div><h3>${n.t}</h3><p>${n.s}</p></div>${extra(n)}</a>`).join('');
    paintThumbs(nlist);
    if(window.__fx)__fx.reveal(nlist);
    document.querySelectorAll('#filters button').forEach(b=>b.classList.toggle('on',b.dataset.f===f));
  }
  document.getElementById('filters')?.addEventListener('click',e=>{const b=e.target.closest('button');if(b)renderNews(b.dataset.f)});

  /* generative thumbnails */
  function paintThumbs(root){
    root.querySelectorAll('.thumb canvas').forEach(cv=>{
      const s=+cv.dataset.seed, W=640, H=400; cv.width=W; cv.height=H;
      const g=cv.getContext('2d'); let r=s*9301;
      const rnd=()=>((r=(r*9301+49297)%233280)/233280);
      const pal=[['#0C0710','#FF541A'],['#2A0E30','#A35CFF'],['#1C1020','#E8287A'],['#0C0710','#A35CFF']][(s-1)%4];
      const gr=g.createLinearGradient(0,0,W,H); gr.addColorStop(0,pal[0]); gr.addColorStop(1,pal[1]);
      g.fillStyle=gr; g.fillRect(0,0,W,H);
      g.strokeStyle='rgba(255,255,255,.07)'; for(let x=0;x<W;x+=40){g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke()}
      const pts=[...Array(46)].map(()=>[rnd()*W,rnd()*H]);
      g.strokeStyle='rgba(244,236,246,.2)';
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{const d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d<110){g.globalAlpha=1-d/110;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()}}));
      g.globalAlpha=1; pts.forEach(p=>{g.fillStyle='rgba(244,236,246,.85)';g.beginPath();g.arc(p[0],p[1],2+rnd()*2,0,7);g.fill()});
    });
  }
  paintThumbs(document);

  /* magma canvas (slow molten blobs) */
  const magmas=[...document.querySelectorAll('.magma-cv')].map(cv=>({cv,ctx:cv.getContext('2d'),b:[...Array(7)].map((_,i)=>({x:Math.random(),y:.55+Math.random()*.45,r:.18+Math.random()*.2,p:Math.random()*6.28,sp:.0016+Math.random()*.0018}))}));
  function drawMagma(m,t){
    const {cv,ctx}=m, W=cv.width=cv.clientWidth, H=cv.height=cv.clientHeight; if(!W)return;
    ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    m.b.forEach((b,i)=>{const y=(b.y+Math.sin(t*b.sp+b.p)*.08)*H, x=(b.x+Math.cos(t*b.sp*.7+b.p)*.06)*W, R=b.r*W;
      const g=ctx.createRadialGradient(x,y,0,x,y,R); g.addColorStop(0,i%2?'rgba(150,80,255,.45)':'rgba(255,84,26,.5)'); g.addColorStop(1,'rgba(12,7,16,0)');
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H)});
    ctx.globalCompositeOperation='source-over';
    ctx.strokeStyle='rgba(244,236,246,.12)';
    for(let k=1;k<9;k++){ctx.beginPath();for(let x=0;x<=W;x+=8){const y=H*(.12+k*.09)+Math.sin(x/W*6+t*.0006+k)*6*k*.4;x?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()}
  }

  /* ---------- HERO: scattered data → integrated lanes (slow) ---------- */
  const cv=document.getElementById('flow'), ctx=cv?cv.getContext('2d'):null;
  let W,H,P=[],lanes=[];
  function size(){
    if(!cv)return;
    const dpr=Math.min(2,devicePixelRatio||1); W=cv.clientWidth; H=cv.clientHeight; if(!W)return;
    cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    lanes=[...Array(7)].map((_,i)=>H*.22+i*H*.08);
    const count=Math.round(Math.min(170,W*H/8000));
    P=[...Array(count)].map(()=>mk(Math.random()));
  }
  function mk(x){return {x,y0:Math.random(),lane:(Math.random()*7)|0,v:.00007+Math.random()*.00011,s:.8+Math.random()*1.5,ph:Math.random()*6.28}}
  const ease=t=>t<0?0:t>1?1:t*t*(3-2*t);
  function pos(p,t){
    const k=ease((p.x-.38)/.34);
    const drift=Math.sin(t*.0004+p.ph)*H*.012*(1-k);
    const wob=Math.sin(p.x*10+p.y0*40)*H*.04*(1-k);
    return [p.x*W,(p.y0*H)*(1-k)+lanes[p.lane]*k+wob+drift,k];
  }
  function frame(t){
    if(!W)return; ctx.clearRect(0,0,W,H);
    lanes.forEach(y=>{const g=ctx.createLinearGradient(W*.55,0,W,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.12)');ctx.strokeStyle=g;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(W*.55,y);ctx.lineTo(W,y);ctx.stroke()});
    const grd=ctx.createRadialGradient(W*.7,H*.46,0,W*.7,H*.46,H*.45);grd.addColorStop(0,'rgba(41,151,255,.10)');grd.addColorStop(1,'rgba(41,151,255,0)');ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
    const pts=P.map(p=>pos(p,t));
    ctx.lineWidth=.6;
    for(let i=0;i<pts.length;i++){const a=pts[i];if(a[2]>.6)continue;
      for(let j=i+1;j<pts.length;j++){const b=pts[j];if(b[2]>.6)continue;
        const dx=a[0]-b[0],dy=a[1]-b[1],d=dx*dx+dy*dy;if(d<8000){ctx.strokeStyle=`rgba(255,255,255,${.10*(1-d/8000)})`;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}}}
    pts.forEach((q,i)=>{const p=P[i],k=q[2];
      ctx.fillStyle=k>.6?`rgba(41,151,255,${.35+.55*k})`:`rgba(255,255,255,${.22+.3*k})`;
      if(k>.95)ctx.fillRect(q[0]-p.s*3,q[1]-.6,p.s*6,1.2);else{ctx.beginPath();ctx.arc(q[0],q[1],p.s,0,7);ctx.fill()}
      if(!reduce){p.x+=p.v; if(p.x>1.02)Object.assign(p,mk(-.02))}
    });
  }

  let page=document.body.dataset.page||'home';
  const TITLE_KO=document.title;
  function loop(t){
    if(page==='home')frame(t);
    magmas.forEach(m=>{if(m.cv.offsetParent)drawMagma(m,t)});
    if(!reduce)requestAnimationFrame(loop);
  }

  /* pipeline ticker */
  const ps=[...document.querySelectorAll('#pipe span')];let pi=0;
  if(!reduce)setInterval(()=>{pi=(pi+1)%ps.length;ps.forEach((s,i)=>s.classList.toggle('on',i<=pi))},2600);

  /* counters */
  function runCounters(root){
    if(reduce||!('IntersectionObserver' in window))return;
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(!e.isIntersecting)return;io.unobserve(e.target);
      const el=e.target,end=+el.dataset.count,start=end>1000?end-30:0,t0=performance.now();
      const tick=t=>{const p=Math.min(1,(t-t0)/1400);el.textContent=Math.round(start+(end-start)*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};
      requestAnimationFrame(tick);
    }),{threshold:.6});
    root.querySelectorAll('[data-count]').forEach(el=>io.observe(el));
  }

  /* ---------- router ---------- */
  const hdr=document.getElementById('hdr'), veil=document.getElementById('veil');
  /* 멀티 페이지 구조: 현재 문서가 곧 현재 페이지. 해시는 같은 페이지 안의 섹션 앵커로만 쓴다 */
  function hrefFor(k){return PATH[k]?PATH[k]:SECOF[k]?(SECOF[k]===page?'#'+k:PATH[SECOF[k]]+'#'+k):'#'+k}
  window.__href=hrefFor;
  function show(smooth){
    const sec=(location.hash||'').slice(1)||null;
    document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('cur',a.dataset.nav===page.split('-')[0]));
    if(page==='home'){size()}
    if(page==='news'){renderNews(sec==='news-press'?'press':sec==='news-cert'?'cert':'all')}
    runCounters(document.querySelector(`.page[data-page="${page}"]`));
    const target=sec&&document.querySelector(`[data-sec="${sec}"]`);
    if(target)target.scrollIntoView({behavior:smooth&&!reduce?'smooth':'auto'});
    onScroll(); spy(); FX.page(page);
  }
  addEventListener('hashchange',()=>show(true));

  /* local nav (sub tabs) */
  /* light-only illustrations */
  document.querySelectorAll('.illo.dark').forEach(e=>e.classList.remove('dark','boxed'));
  /* listing-style photo mosaic under each page title */
  const MOS={about:['IMG-01_office-exterior.jpg','IMG-05_lounge.jpg','IMG-02_cafeteria.jpg','IMG-03_meeting-room.jpg','IMG-04_workspace.jpg'],
    team:['IMG-08_workshop.jpg','IMG-10_education.jpg','IMG-09_event.jpg','IMG-03_meeting-room.jpg','IMG-11_etc.jpg'],
    'about-vision':['IMG-08_workshop.jpg','IMG-10_education.jpg','IMG-09_event.jpg','IMG-11_etc.jpg','IMG-03_meeting-room.jpg'],
    'about-rnd':['IMG-04_workspace.jpg','IMG-06_office-detail.jpg','IMG-03_meeting-room.jpg','IMG-10_education.jpg','!news-poster-bio.jpg'],
    news:NI.slice(0,5).map(f=>DOC.has(f)?'!'+f:f),
    contact:['IMG-01_office-exterior.jpg','@radar','IMG-05_lounge.jpg','IMG-06_office-detail.jpg','IMG-16_gym.jpg']};
  Object.entries(MOS).forEach(([pg,list])=>{const w=document.querySelector(`.page[data-page="${pg}"] .sub-hero .wrap`);if(!w)return;
    const m=document.createElement('div');m.className='mosaic';
    m.innerHTML=list.map(x=>x[0]==='@'?`<div class="illo" data-illo="${x.slice(1)}"></div>`:x[0]==='!'?`<div class="contain"><img src="${PH[x.slice(1)]}" alt=""></div>`:`<div><img src="${PH[x]}" alt=""></div>`).join('');
    w.appendChild(m)});
  /* sub-nav: move to top of each page, add page title + CTA */
  document.querySelectorAll('.page').forEach(pg=>{
    const hero=pg.querySelector('.sub-hero'); if(!hero)return;
    let nav=pg.querySelector('.lnb');
    if(!nav){nav=document.createElement('nav');nav.className='lnb';nav.innerHTML='<div class="wrap"></div>'}
    const w=nav.querySelector('.wrap'), t=document.createElement('span');
    t.className='lnb-title'; t.textContent=hero.querySelector('h1').textContent.trim(); w.prepend(t);
    if(pg.dataset.page!=='contact'){const c=document.createElement('a');c.className='lnb-cta';c.dataset.to='contact-inquiry';c.textContent='프로젝트 문의';w.append(c)}
    pg.prepend(nav);
  });
  document.querySelectorAll('.lnb a').forEach(a=>{a.href=hrefFor(a.dataset.to)});
  function spy(){
    const cur=document.querySelector(`.page[data-page="${page}"]`); if(!cur)return;
    const secs=[...cur.querySelectorAll('[data-sec]')]; let on=secs[0]?.dataset.sec;
    secs.forEach(s=>{if(s.getBoundingClientRect().top<180)on=s.dataset.sec});
    if(page.includes('-'))on=page;
    cur.querySelectorAll('.lnb a').forEach(a=>a.classList.toggle('on',a.dataset.to===on));
  }

  /* header */
  const toTop=document.getElementById('toTop');
  function onScroll(){const y=scrollY;hdr.classList.toggle('solid',page!=='home'?y>10:y>60);toTop.classList.toggle('show',y>600);spy()}
  addEventListener('scroll',onScroll,{passive:true});
  toTop.onclick=()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'});

  /* mobile nav */
  const mnav=document.getElementById('mnav');
  document.getElementById('burger').onclick=()=>{mnav.hidden=false};
  document.getElementById('mclose').onclick=()=>{mnav.hidden=true};
  mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mnav.hidden=true}));

  /* copy */
  function copyText(t,btn,label){
    const done=()=>{btn.textContent='복사됨';setTimeout(()=>btn.textContent=label,1500)};
    try{navigator.clipboard.writeText(t).then(done,()=>{btn.textContent=t})}catch(_){btn.textContent=t}
  }
  document.querySelectorAll('[data-copy]').forEach(b=>{const l=b.textContent;b.addEventListener('click',()=>copyText(b.dataset.copy,b,l))});

  /* inquiry form → Web3Forms (email to rock@nagma.co.kr), mailto fallback */
  const W3F_KEY='12b92a29-6c63-46b6-9fdc-16ab8c4eb609';
  document.getElementById('inq')?.addEventListener('submit',async e=>{
    e.preventDefault();
    const form=e.currentTarget,btn=form.querySelector('button[type=submit]');
    const v=id=>document.getElementById(id).value.trim();
    const picks=[...document.querySelectorAll('.pick input:checked')].map(i=>T(i.value)).join(', ')||'-';
    const msg=document.getElementById('formMsg');msg.style.whiteSpace='';msg.classList.remove('ok','err');
    const say=(t,c)=>{msg.hidden=false;msg.textContent=t;if(c)msg.classList.add(c)};
    if(document.getElementById('f-bot').checked)return;
    if(!v('f-nm')||!v('f-msg')){say(T('담당자와 문의 내용을 입력해 주세요.'),'err');return}
    if(!v('f-ph')&&!v('f-em')){say(T('회신받으실 연락처 또는 이메일을 입력해 주세요.'),'err');return}
    if(v('f-em')&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('f-em'))){say(T('이메일 주소 형식을 확인해 주세요.'),'err');return}
    const EN=lang==='en';
    const text=`[나그마 프로젝트 문의]\n회사명: ${v('f-co')||'-'}\n담당자: ${v('f-nm')}\n연락처: ${v('f-ph')||'-'}\n이메일: ${v('f-em')||'-'}\n관심 분야: ${picks}\n\n${v('f-msg')}`;
    const subj=`[나그마 홈페이지 문의] ${v('f-co')||v('f-nm')}`;
    const mailto=()=>{try{location.href='mailto:rock@nagma.co.kr?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(text)}catch(_){}
      say(EN?'Your email app is opening with the inquiry filled in. If it does not open, please email rock@nagma.co.kr or call 1599-1292.':'메일 앱에 문의 내용을 채워 열었습니다. 열리지 않으면 rock@nagma.co.kr 또는 1599-1292로 연락 주세요.')};
    if(!W3F_KEY||W3F_KEY.indexOf('%%')===0){mailto();return}
    const label=btn.innerHTML;btn.disabled=true;btn.textContent=T('전송 중…');
    try{
      const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify({access_key:W3F_KEY,subject:subj,from_name:'나그마 홈페이지',replyto:v('f-em')||undefined,
          '회사명':v('f-co')||'-','담당자':v('f-nm'),'연락처':v('f-ph')||'-','이메일':v('f-em')||'-','관심 분야':picks,'문의 내용':v('f-msg'),'언어':EN?'ENG':'KOR'})});
      const j=await r.json().catch(()=>({}));
      if(r.ok&&j.success!==false){form.reset();say(T('문의가 접수되었습니다. 담당자가 확인 후 빠르게 연락드리겠습니다.'),'ok')}
      else throw new Error(j.message||r.status);
    }catch(err){say(T('전송에 실패했습니다. 잠시 후 다시 시도하시거나 1599-1292 / rock@nagma.co.kr로 연락 주세요.'),'err')}
    finally{btn.disabled=false;btn.innerHTML=label}
  });

  /* marquee duplicate */
  const mq=document.getElementById('marq'); if(mq)mq.innerHTML+=mq.innerHTML;

  size(); addEventListener('resize',()=>{if(page==='home')size()});
  /* ================= Motion illustrations (SVG/SMIL) ================= */
  const ILLO=(function(){
    const P=pts=>'M'+pts.map(p=>p.join(' ')).join('L');
    const R=(a,b)=>a+Math.random()*(b-a);
    const pulse=(d,c,dur,b,w=3)=>`<path d="${d}" class="${c}" stroke-width="${w}" stroke-linecap="round" pathLength="100" stroke-dasharray="7 200" stroke-dashoffset="7"><animate attributeName="stroke-dashoffset" values="7;-100" dur="${dur.toFixed(2)}s" begin="${(-b).toFixed(2)}s" repeatCount="indefinite"/></path>`;
    const fade=(vals,kt,dur,b=0)=>`<animate attributeName="opacity" values="${vals}" keyTimes="${kt}" dur="${dur}s" begin="${b}s" repeatCount="indefinite"/>`;
    const svg=(inner,vb='0 0 400 300')=>`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;

    function portal(){
      let s=`<rect x="20" y="30" width="360" height="240" rx="8" class="pad" stroke-width="2.4"/><line x1="20" y1="54" x2="380" y2="54" class="k" stroke-width="1.4"/>`;
      [34,46,58].forEach(x=>s+=`<circle cx="${x}" cy="42" r="3.5" class="kf"/>`);
      s+=`<rect x="90" y="36" width="200" height="12" rx="6" class="l"/>`;
      s+=`<rect x="40" y="72" width="130" height="180" rx="6" class="padl" stroke-width="1.4"/><circle cx="105" cy="106" r="16" class="l" stroke-width="1.6"/><path d="M89 132c4-9 28-9 32 0" class="l" stroke-width="1.6"/>`;
      [148,172].forEach(y=>s+=`<rect x="56" y="${y}" width="98" height="16" rx="4" class="padl" stroke-width="1.2"/>`);
      s+=`<rect x="62" y="154" width="0" height="4" rx="2" class="kf"><animate attributeName="width" values="0;60;60;0" keyTimes="0;.35;.9;1" dur="5s" repeatCount="indefinite"/></rect>`;
      s+=`<rect x="62" y="178" width="0" height="4" rx="2" class="df"><animate attributeName="width" values="0;0;44;44;0" keyTimes="0;.35;.55;.9;1" dur="5s" repeatCount="indefinite"/></rect>`;
      s+=`<rect x="56" y="200" width="98" height="24" rx="5" class="af"/><rect x="80" y="210" width="50" height="4" rx="2" style="fill:#fff"/>`;
      s+=`<text x="192" y="86" style="font-size:9px">WEBINAR SCHEDULE</text>`;
      for(let r=0;r<4;r++)for(let c=0;c<7;c++){s+=`<rect x="${192+c*25}" y="${96+r*25}" width="21" height="21" rx="4" class="l" stroke-width="1.2"/>`}
      s+=`<rect x="${192+3*25}" y="${96+2*25}" width="21" height="21" rx="4" class="af"><animate attributeName="opacity" values="1;.35;1" dur="1.6s" repeatCount="indefinite"/></rect>`;
      s+=`<rect x="${192+5*25}" y="${96+1*25}" width="21" height="21" rx="4" class="df" opacity=".6"/>`;
      s+=`<g><rect x="300" y="64" width="54" height="18" rx="9" class="af"/><circle cx="312" cy="73" r="3" style="fill:#fff"><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/></circle><text x="320" y="77" style="fill:#fff;font-size:9px">LIVE</text></g>`;
      s+=`<g opacity="0"><animateTransform attributeName="transform" type="translate" values="0 16;0 0;0 0;0 16" keyTimes="0;.15;.85;1" dur="5s" repeatCount="indefinite"/>${fade('0;1;1;0','0;.15;.85;1',5)}<rect x="210" y="204" width="152" height="40" rx="8" class="pad" stroke-width="1.6"/><circle cx="230" cy="224" r="8" class="af"/><rect x="246" y="215" width="80" height="5" rx="2.5" class="kf"/><rect x="246" y="227" width="104" height="4" rx="2" class="lf"/></g>`;
      return svg(s);
    }

    function dash(){
      let s=`<rect x="20" y="28" width="360" height="244" rx="8" class="pad" stroke-width="2.4"/><line x1="20" y1="50" x2="380" y2="50" class="k" stroke-width="1.4"/><rect x="34" y="35" width="60" height="8" rx="4" class="lf"/>`;
      [36,152,268].forEach((x,i)=>{s+=`<rect x="${x}" y="62" width="100" height="48" rx="6" class="padl" stroke-width="1.4"/><rect x="${x+10}" y="72" width="40" height="5" rx="2.5" class="lf"/><rect x="${x+10}" y="86" width="0" height="12" rx="3" class="${i===1?'af':'kf'}"><animate attributeName="width" values="0;${[54,46,62][i]};${[54,46,62][i]};0" keyTimes="0;.3;.9;1" dur="6s" begin="${i*.2}s" repeatCount="indefinite"/></rect>`});
      s+=`<path d="M${36+86} 86 l6-6 6 6" class="a" stroke-width="2"/>`.replace(`M122`,`M${152+82}`);
      s+=`<rect x="36" y="122" width="216" height="136" rx="6" class="padl" stroke-width="1.4"/>`;
      for(let y=150;y<=238;y+=22)s+=`<line x1="48" y1="${y}" x2="240" y2="${y}" class="l" stroke-width=".8"/>`;
      s+=`<polyline points="50,226 80,210 110,216 140,188 170,194 200,166 236,150" class="a" stroke-width="2.4" stroke-linejoin="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"><animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;.45;.9;1" dur="6s" repeatCount="indefinite"/></polyline>`;
      s+=`<polyline points="50,234 80,228 110,230 140,220 170,222 200,212 236,206" class="d" stroke-width="1.6" stroke-dasharray="4 4"/>`;
      s+=`<rect x="268" y="122" width="100" height="136" rx="6" class="padl" stroke-width="1.4"/><circle cx="318" cy="182" r="30" class="l" stroke-width="10"/>`;
      s+=`<circle cx="318" cy="182" r="30" class="a" stroke-width="10" pathLength="100" stroke-dasharray="0 100" transform="rotate(-90 318 182)"><animate attributeName="stroke-dasharray" values="0 100;68 32;68 32;0 100" keyTimes="0;.45;.9;1" dur="6s" repeatCount="indefinite"/></circle>`;
      s+=`<text x="318" y="186" text-anchor="middle" style="font-size:11px">68%</text><rect x="290" y="230" width="56" height="5" rx="2.5" class="lf"/>`;
      return svg(s);
    }

    function search(){
      let s=`<rect x="40" y="34" width="320" height="42" rx="21" class="pad" stroke-width="2"/><circle cx="66" cy="54" r="7" class="k" stroke-width="2"/><line x1="71" y1="59" x2="77" y2="65" class="k" stroke-width="2" stroke-linecap="round"/>`;
      s+=`<rect x="88" y="51" width="0" height="6" rx="3" class="kf"><animate attributeName="width" values="0;150;150;0" keyTimes="0;.3;.92;1" dur="7s" repeatCount="indefinite"/></rect>`;
      s+=`<rect x="330" y="42" width="24" height="26" rx="13" class="af"/><circle cx="341" cy="54" r="4.5" style="fill:none;stroke:#fff;stroke-width:1.6"/>`;
      const W=[62,44,30,16];
      W.forEach((w,i)=>{const y=96+i*44;s+=`<rect x="40" y="${y}" width="320" height="36" rx="6" class="padl" stroke-width="1.4"/><rect x="52" y="${y+9}" width="18" height="18" rx="4" class="lf"/><rect x="80" y="${y+10}" width="${140-i*18}" height="5" rx="2.5" class="kf" opacity=".85"/><rect x="80" y="${y+21}" width="${180-i*10}" height="4" rx="2" class="lf"/>`;
        s+=`<rect x="${348-w}" y="${y+15}" width="0" height="6" rx="3" class="${i===0?'af':'df'}"><animate attributeName="width" values="0;0;${w};${w};0" keyTimes="0;${(.3+i*.05).toFixed(2)};${(.42+i*.05).toFixed(2)};.92;1" dur="7s" repeatCount="indefinite"/></rect>`});
      s+=`<rect x="38" y="94" width="324" height="40" rx="7" class="a" stroke-width="2.2" opacity="0">${fade('0;0;1;1;0','0;.45;.5;.92;1',7)}</rect>`;
      s+=`<text x="40" y="282" style="font-size:9px" class="m">SEMANTIC SEARCH</text>`;
      return svg(s);
    }

    function neural(){
      const X=[56,146,254,344],N=[4,5,5,2],pos=X.map((x,l)=>[...Array(N[l])].map((_,i)=>[x,150+(i-(N[l]-1)/2)*48]));
      let s='',edges=[];
      for(let l=0;l<3;l++)pos[l].forEach(a=>pos[l+1].forEach(b=>{edges.push([a,b]);s+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="l" stroke-width=".9"/>`}));
      for(let i=0;i<12;i++){const [a,b]=edges[(i*7+3)%edges.length];s+=pulse(`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`,i%3?'d':'a',R(1.6,2.8),R(0,3),2.6)}
      pos.forEach((L,l)=>L.forEach(([x,y],i)=>{s+=`<circle cx="${x}" cy="${y}" r="11" class="pad" stroke-width="2"/>`;
        if(l===3)s+=`<circle cx="${x}" cy="${y}" r="6" class="af"><animate attributeName="r" values="4;7;4" dur="1.8s" begin="${i*.4}s" repeatCount="indefinite"/></circle>`;
        else s+=`<circle cx="${x}" cy="${y}" r="3.5" class="kf" opacity=".7"/>`}));
      s+=`<text x="56" y="286" text-anchor="middle" style="font-size:9px" class="m">INPUT</text><text x="200" y="286" text-anchor="middle" style="font-size:9px" class="m">HIDDEN LAYERS</text><text x="344" y="286" text-anchor="middle" style="font-size:9px" class="m">OUTPUT</text>`;
      return svg(s);
    }

    function stack(){
      let s='';
      const c1='M200 48 L200 96',c2='M200 168 C200 200 110 196 110 222',c3='M200 168 C200 200 290 196 290 214';
      [c1,c2,c3].forEach(d=>s+=`<path d="${d}" class="l" stroke-width="1.6"/>`);
      s+=pulse(c1,'a',1.8,0,3)+pulse(c2,'d',2.2,.6,3)+pulse(c3,'a',2.4,1.1,3);
      s+=`<path d="M152 56 h96 a20 20 0 0 0 0-40 a28 28 0 0 0-50-12 a22 22 0 0 0-40 10 a21 21 0 0 0-6 42z" transform="translate(0 0)" class="pad" stroke-width="2.2"/><text x="200" y="44" text-anchor="middle" style="font-size:9px">CLOUD</text>`;
      [100,134].forEach((y,i)=>{s+=`<rect x="146" y="${y}" width="108" height="28" rx="5" class="pad" stroke-width="2"/><line x1="160" y1="${y+14}" x2="206" y2="${y+14}" class="l" stroke-width="3" stroke-linecap="round"/>`;
        [222,232,242].forEach((x,j)=>s+=`<circle cx="${x}" cy="${y+14}" r="2.6" class="${j===0?'af':'lf'}">${j===0?`<animate attributeName="opacity" values="1;.2;1" dur="${1+i*.4}s" repeatCount="indefinite"/>`:''}</circle>`)});
      s+=`<text x="268" y="122" style="font-size:9px" class="m">SERVER</text>`;
      s+=`<rect x="64" y="222" width="92" height="52" rx="4" class="pad" stroke-width="2"/><path d="M52 280 h116" class="k" stroke-width="2.4" stroke-linecap="round"/><rect x="74" y="232" width="50" height="5" rx="2.5" class="lf"/><rect x="74" y="244" width="70" height="4" rx="2" class="lf"/><rect x="74" y="256" width="36" height="8" rx="2" class="af"/>`;
      s+=`<rect x="272" y="214" width="38" height="66" rx="7" class="pad" stroke-width="2"/><line x1="284" y1="222" x2="298" y2="222" class="k" stroke-width="2" stroke-linecap="round"/><rect x="280" y="232" width="22" height="16" rx="3" class="lf"/><rect x="280" y="254" width="22" height="5" rx="2" class="af"/>`;
      s+=`<text x="110" y="294" text-anchor="middle" style="font-size:9px" class="m">WEB</text><text x="291" y="294" text-anchor="middle" style="font-size:9px" class="m">APP</text>`;
      return svg(s,'0 -28 400 338');
    }

    function reel(){
      let s=`<defs><clipPath id="reelClip"><rect x="20" y="150" width="360" height="100"/></clipPath></defs>`;
      let g=`<rect x="-60" y="158" width="560" height="84" class="pad" stroke-width="2"/>`;
      for(let x=-56;x<500;x+=22){g+=`<rect x="${x}" y="164" width="10" height="7" rx="1.5" class="kf"/><rect x="${x}" y="229" width="10" height="7" rx="1.5" class="kf"/>`}
      for(let x=-50;x<500;x+=88){g+=`<rect x="${x}" y="178" width="76" height="44" rx="2" class="padl" stroke-width="1.4"/><path d="M${x+8} 214 l16-14 12 8 14-12 18 18" class="l" stroke-width="1.4"/>`}
      s+=`<g clip-path="url(#reelClip)"><g>${g}<animateTransform attributeName="transform" type="translate" values="0 0;-88 0" dur="3.2s" repeatCount="indefinite"/></g></g>`;
      s+=`<rect x="60" y="62" width="120" height="70" rx="4" class="pad" stroke-width="2.2"/><line x1="72" y1="88" x2="168" y2="88" class="l"/><line x1="72" y1="110" x2="168" y2="110" class="l"/><text x="74" y="82" style="font-size:9px">SCENE 01</text><text x="74" y="104" style="font-size:9px">TAKE 03</text><text x="74" y="126" style="font-size:9px" class="m">NAGMA STUDIO</text>`;
      s+=`<g><animateTransform attributeName="transform" type="rotate" values="0 60 62;-20 60 62;0 60 62;0 60 62" keyTimes="0;.15;.3;1" dur="2.4s" repeatCount="indefinite"/><rect x="60" y="46" width="120" height="16" rx="2" class="pad" stroke-width="2.2"/>`;
      for(let i=0;i<5;i++)s+=`<path d="M${68+i*24} 62 l12-16 h10 l-12 16z" class="kf"/>`;
      s+=`</g><circle cx="300" cy="96" r="30" class="pad" stroke-width="2"/><path d="M291 82 L314 96 L291 110Z" class="af"/><circle cx="300" cy="96" r="30" class="a" stroke-width="1.6"><animate attributeName="r" values="30;46" dur="2s" repeatCount="indefinite"/>${fade('.8;0','0;1',2)}</circle>`;
      s+=`<text x="300" y="276" text-anchor="middle" style="font-size:9px" class="m">00:00:12:08</text>`;
      return svg(s);
    }

    function palette(){
      let s='';
      const C=['kf','df','lf','pad','af'];
      C.forEach((c,i)=>{s+=`<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0;0 0" keyTimes="0;.1;.2;1" dur="5s" begin="${i*.25}s" repeatCount="indefinite"/><rect x="${34+i*40}" y="40" width="32" height="32" rx="8" class="${c}" ${c==='pad'?'stroke-width="1.6"':''}/></g>`});
      s+=`<text x="34" y="172" style="font-size:68px;font-weight:700;letter-spacing:-2px">Aa</text>`;
      s+=`<rect x="34" y="192" width="150" height="6" rx="3" class="kf" opacity=".85"/><rect x="34" y="206" width="170" height="4" rx="2" class="lf"/><rect x="34" y="216" width="130" height="4" rx="2" class="lf"/><rect x="34" y="226" width="150" height="4" rx="2" class="lf"/>`;
      s+=`<rect x="226" y="96" width="150" height="170" rx="4" class="padl" stroke-width="1.4"/>`;
      for(let x=251;x<376;x+=25)s+=`<line x1="${x}" y1="96" x2="${x}" y2="266" class="l" stroke-width=".6"/>`;
      for(let y=121;y<266;y+=25)s+=`<line x1="226" y1="${y}" x2="376" y2="${y}" class="l" stroke-width=".6"/>`;
      for(let x=226;x<=376;x+=10)s+=`<line x1="${x}" y1="86" x2="${x}" y2="${(x-226)%50?90:82}" class="l"/>`;
      const d='M244 236 C260 140 300 250 316 160 S356 120 360 200';
      s+=`<path d="${d}" class="a" stroke-width="2.6" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"><animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;.5;.9;1" dur="6s" repeatCount="indefinite"/></path>`;
      [[244,236],[316,160],[360,200]].forEach(([x,y])=>s+=`<rect x="${x-4}" y="${y-4}" width="8" height="8" class="pad" stroke-width="1.6"/>`);
      return svg(s);
    }

    function gantt(){
      const L=['PLAN','ARCH','DESIGN','DEV','QA','LAUNCH'],W=[56,62,70,96,52,48];
      let s=`<rect x="20" y="30" width="360" height="240" rx="8" class="pad" stroke-width="2.2"/>`;
      for(let x=100;x<=364;x+=44)s+=`<line x1="${x}" y1="46" x2="${x}" y2="254" class="l" stroke-width=".8"/>`;
      L.forEach((t,i)=>{const y=56+i*33,x=100+i*40;
        s+=`<text x="34" y="${y+12}" style="font-size:9px">${t}</text><rect x="${x}" y="${y}" width="${W[i]}" height="16" rx="8" class="lf"/>`;
        s+=`<rect x="${x}" y="${y}" width="0" height="16" rx="8" class="${i===3?'af':'kf'}"><animate attributeName="width" values="0;0;${W[i]};${W[i]};0" keyTimes="0;${(i*.12).toFixed(2)};${(i*.12+.12).toFixed(2)};.94;1" dur="9s" repeatCount="indefinite"/></rect>`});
      s+=`<g><animateTransform attributeName="transform" type="translate" values="0 0;256 0" dur="9s" repeatCount="indefinite"/><line x1="100" y1="44" x2="100" y2="258" class="a" stroke-width="1.6" stroke-dasharray="4 3"/><rect x="82" y="258" width="36" height="12" rx="6" class="af"/><text x="100" y="267" text-anchor="middle" style="font-size:7px;fill:#fff">NOW</text></g>`;
      return svg(s);
    }

    function chip(){
      const T=[[[200,100],[200,30]],[[178,100],[178,64],[112,64],[112,42]],[[222,100],[222,74],[270,74],[270,54]],[[240,100],[240,88],[318,88],[318,50]],
        [[250,128],[296,128],[296,104]],[[250,150],[346,150]],[[250,176],[322,176],[322,232],[350,232]],
        [[200,200],[200,270]],[[222,200],[222,240],[268,240],[268,262]],[[178,200],[178,232],[124,232],[124,264]],
        [[150,150],[56,150]],[[150,124],[100,124],[100,96],[66,96]],[[150,178],[92,178],[92,222],[60,222]]];
      let s='';
      T.forEach((pts,i)=>{const d=P(pts);s+=`<path d="${d}" class="l" stroke-width="1.6"/>`;
        if(pts.length>2)s+=`<circle cx="${pts[1][0]}" cy="${pts[1][1]}" r="3.2" class="kf"/>`;
        s+=pulse(d,i%3?'d':'a',R(2.2,4.2),R(0,4));});
      T.forEach((pts,i)=>{const [x,y]=pts[pts.length-1];s+=`<rect x="${x-7}" y="${y-7}" width="14" height="14" class="pad" stroke-width="2.4"/>`+(i%3===1?`<circle cx="${x}" cy="${y}" r="3" class="kf"/>`:'')});
      s+=`<rect x="150" y="100" width="100" height="100" class="pad" stroke-width="3.4"/>`;
      [183,216].forEach(v=>{s+=`<line x1="${v}" y1="100" x2="${v}" y2="200" class="l"/><line x1="150" y1="${v-50}" x2="250" y2="${v-50}" class="l"/>`});
      s+=`<rect x="180" y="130" width="40" height="40" class="a" stroke-width="1.5" opacity="0">${fade('0;.9;0','0;.5;1',2.4)}</rect>`;
      s+=`<rect x="186" y="136" width="28" height="28" class="af"><animate attributeName="opacity" values=".55;1;.55" dur="2.4s" repeatCount="indefinite"/></rect>`;
      return svg(s);
    }

    function data(){
      const ys=[48,108,168,228],lb=['CRM','LMS','WEB','ERP'];let s='';
      ys.forEach((y,i)=>{const d=`M66 ${y} C132 ${y} 128 150 172 150`;s+=`<path d="${d}" class="l" stroke-width="1.6"/>`+pulse(d,i%2?'a':'d',R(2.4,3.6),R(0,3))});
      ys.forEach((y,i)=>{s+=`<path d="M30 ${y-10} V${y+10} A18 6 0 0 0 66 ${y+10} V${y-10}" class="pad" stroke-width="2"/><ellipse cx="48" cy="${y-10}" rx="18" ry="6" class="pad" stroke-width="2"/><path d="M30 ${y} A18 6 0 0 0 66 ${y}" class="l"/><text x="30" y="${y+29}">${lb[i]}</text>`});
      s+=`<path d="M216 150 H262" class="l" stroke-width="1.6"/>`+pulse('M216 150 H262','d',1.6,0);
      s+=`<circle cx="194" cy="150" r="33" class="a" stroke-width="1.4" stroke-dasharray="4 6"><animateTransform attributeName="transform" type="rotate" from="0 194 150" to="360 194 150" dur="14s" repeatCount="indefinite"/></circle>`;
      s+=`<circle cx="194" cy="150" r="22" class="pad" stroke-width="2.6"/><text x="194" y="154" text-anchor="middle" style="font-size:11px;font-weight:500">AI</text>`;
      s+=`<rect x="262" y="78" width="118" height="144" rx="3" class="pad" stroke-width="2.4"/><line x1="262" y1="98" x2="380" y2="98" class="l"/><text x="272" y="92" style="font-size:8px">INSIGHT</text>`;
      s+=`<polyline points="274,140 292,128 310,134 328,116 346,122 366,108" class="d" stroke-width="2" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"><animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;.4;.9;1" dur="5s" repeatCount="indefinite"/></polyline>`;
      const H=[[14,46,30,14],[22,30,52,22],[10,40,24,10],[30,54,40,30]];
      H.forEach((h,i)=>{const x=276+i*24;s+=`<rect x="${x}" width="14" y="${206-h[0]}" height="${h[0]}" class="${i%2?'df':'af'}"><animate attributeName="height" values="${h.join(';')}" dur="4s" begin="${i*.3}s" repeatCount="indefinite"/><animate attributeName="y" values="${h.map(v=>206-v).join(';')}" dur="4s" begin="${i*.3}s" repeatCount="indefinite"/></rect>`});
      s+=`<line x1="270" y1="207" x2="372" y2="207" class="k" stroke-width="1.5"/>`;
      return svg(s);
    }

    function platform(){
      let s=`<rect x="22" y="42" width="250" height="200" rx="6" class="pad" stroke-width="2.6"/><line x1="22" y1="62" x2="272" y2="62" class="k" stroke-width="1.4"/>`;
      [34,44,54].forEach(x=>s+=`<circle cx="${x}" cy="52" r="3" class="kf"/>`);
      s+=`<rect x="72" y="47" width="150" height="10" rx="5" class="l"/>`;
      [[34,72],[152,72],[34,156],[152,156]].forEach(([x,y],i)=>{
        s+=`<rect x="${x}" y="${y}" width="108" height="74" rx="3" class="l" stroke-width="1.4"/><circle cx="${x+54}" cy="${y+30}" r="11" class="l" stroke-width="1.6"/><path d="M${x+32} ${y+66} Q${x+54} ${y+40} ${x+76} ${y+66}" class="l" stroke-width="1.6"/>`;
        s+=`<rect x="${x}" y="${y}" width="108" height="74" rx="3" class="d" stroke-width="2.6" opacity="0">${fade('0;1;1;0;0','0;.03;.22;.25;1',8,i*2)}</rect>`;
        [0,1,2].forEach(j=>s+=`<rect x="${x+8+j*5}" y="${y+60}" width="3" height="8" class="df" opacity="0"><animate attributeName="height" values="3;9;4;8;3" dur=".6s" begin="${j*.1}s" repeatCount="indefinite"/>${fade('0;1;1;0;0','0;.03;.22;.25;1',8,i*2)}</rect>`);
      });
      s+=`<rect x="290" y="56" width="94" height="176" rx="14" class="pad" stroke-width="2.6"/><line x1="324" y1="66" x2="350" y2="66" class="k" stroke-width="3" stroke-linecap="round"/>`;
      const B=[[300,84,58,'lf'],[318,110,56,'af'],[300,136,66,'lf'],[312,162,62,'df'],[300,188,44,'lf']];
      B.forEach(([x,y,w,c],i)=>{const a=(.04+i*.13).toFixed(2);s+=`<rect x="${x}" y="${y}" width="${w}" height="18" rx="9" class="${c}" opacity="0">${fade('0;0;1;1;0',`0;${a};${(+a+.04).toFixed(2)};.92;1`,7)}</rect>`});
      return svg(s);
    }

    function video(){
      let s='';
      for(let i=0;i<4;i++){const x=34+i*16,y=52+i*12;s+=`<g><rect x="${x}" y="${y}" width="232" height="132" class="padl" stroke-width="1.4"/><animateTransform attributeName="transform" type="translate" values="0 0;${-2-i} ${-3+i};0 0" dur="5s" begin="${i*.4}s" repeatCount="indefinite"/></g>`}
      s+=`<rect x="98" y="100" width="232" height="132" class="pad" stroke-width="3.2"/>`;
      for(let y=118;y<232;y+=18)s+=`<line x1="98" y1="${y}" x2="330" y2="${y}" class="l" stroke-width=".8"/>`;
      s+=`<circle cx="114" cy="116" r="4" class="af">${fade('1;.15;1','0;.5;1',1.2)}</circle><text x="124" y="119" style="font-size:8px">REC</text>`;
      s+=`<circle cx="214" cy="166" r="18" class="a" stroke-width="1.5"><animate attributeName="r" values="18;40" dur="2s" repeatCount="indefinite"/>${fade('.8;0','0;1',2)}</circle>`;
      s+=`<path d="M204 152 L230 166 L204 180Z" class="kf"/>`;
      s+=`<line x1="100" y1="266" x2="330" y2="266" class="l" stroke-width="1.4"/>`;
      for(let x=100;x<=330;x+=11.5)s+=`<line x1="${x}" y1="${(x-100)%46?262:258}" x2="${x}" y2="266" class="l"/>`;
      s+=`<line x1="100" y1="266" x2="100" y2="266" class="a" stroke-width="3"><animate attributeName="x2" values="100;330" dur="7s" repeatCount="indefinite"/></line>`;
      s+=`<line x1="100" y1="254" x2="100" y2="276" class="k" stroke-width="2.6"><animate attributeName="x1" values="100;330" dur="7s" repeatCount="indefinite"/><animate attributeName="x2" values="100;330" dur="7s" repeatCount="indefinite"/></line>`;
      return svg(s);
    }

    function design(){
      let s='';
      [[-16,'padl'],[-9,'padl'],[-2,'padl']].forEach(([a,c],i)=>{s+=`<g transform="rotate(${a} 205 256)"><rect x="132" y="52" width="150" height="200" class="${c}" stroke-width="1.4"/><animateTransform attributeName="transform" type="rotate" values="${a} 205 256;${a-3} 205 256;${a} 205 256" dur="6s" begin="${i*.3}s" repeatCount="indefinite"/></g>`});
      s+=`<g><animateTransform attributeName="transform" type="rotate" values="6 205 256;8 205 256;6 205 256" dur="6s" repeatCount="indefinite"/>`;
      s+=`<rect x="132" y="48" width="152" height="204" class="pad" stroke-width="2"/>`;
      s+=`<rect x="148" y="66" width="120" height="30" class="af"><animate attributeName="width" values="0;120;120;0" keyTimes="0;.18;.9;1" dur="7s" repeatCount="indefinite"/></rect>`;
      s+=`<rect x="148" y="106" width="78" height="6" class="kf" opacity=".75"/>`;
      let n=0;[148,214].forEach(x=>{for(let y=128;y<=200;y+=12){const w=x===148?(y%24?54:46):(y%24?48:54);s+=`<line x1="${x}" y1="${y}" x2="${x+w}" y2="${y}" class="l" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"><animate attributeName="stroke-dashoffset" values="100;100;0;0;100" keyTimes="0;${(.1+n*.03).toFixed(2)};${(.2+n*.03).toFixed(2)};.9;1" dur="7s" repeatCount="indefinite"/></line>`;n++}});
      s+=`<rect x="148" y="214" width="120" height="24" class="d" stroke-width="1.4" stroke-dasharray="4 4"/></g>`;
      return svg(s);
    }

    function doc(){
      let s=`<rect x="30" y="18" width="222" height="214" class="pad" stroke-width="2.4"/>`;
      const W=[180,160,190,120,185,170,150,190,140,175,165,110];
      W.forEach((w,i)=>s+=`<rect x="46" y="${38+i*15}" width="${w}" height="5" rx="2" class="lf"/>`);
      const E=[[46,33,48,'a'],[132,63,56,'d'],[70,108,46,'a'],[150,153,54,'d'],[60,183,50,'a']];
      E.forEach(([x,y,w,c],i)=>{const a=(.05+i*.1).toFixed(2);s+=`<rect x="${x-3}" y="${y}" width="${w}" height="15" rx="2" class="${c}" stroke-width="2" opacity="0">${fade('0;0;1;1;0',`0;${a};${(+a+.03).toFixed(2)};.92;1`,8)}</rect>`});
      [['M70 48 C70 70 150 50 160 63','a',.3],['M160 78 C170 100 100 96 93 108','d',.45],['M93 123 C110 150 170 130 177 153','a',.6]].forEach(([d,c,t])=>s+=`<path d="${d}" class="${c}" stroke-width="1.6" stroke-dasharray="3 3" opacity="0">${fade('0;0;1;1;0',`0;${t};${t+.04};.92;1`,8)}</path>`);
      s+=`<rect x="30" y="18" width="222" height="3" class="df" opacity=".8"><animate attributeName="y" values="18;229;18" dur="5s" repeatCount="indefinite"/></rect>`;
      s+=`<path d="M266 125 H326" class="l" stroke-width="1.6"/>`+pulse('M266 125 H326','d',1.4,0)+`<path d="M320 119 L328 125 L320 131" class="k" stroke-width="1.6"/><text x="266" y="112" style="font-size:7.5px">EXTRACT</text>`;
      const N=[[392,64,'제품','a'],[532,56,'성분','d'],[470,136,'적응증','a'],[384,196,'기관','d'],[552,188,'효능','a']];
      const Ed=[[0,1],[0,2],[1,2],[2,3],[2,4],[0,3],[1,4]];
      Ed.forEach(([a,b],i)=>{const t=(.15+i*.08).toFixed(2);s+=`<line x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}" class="l" stroke-width="1.6" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"><animate attributeName="stroke-dashoffset" values="100;100;0;0;100" keyTimes="0;${t};${(+t+.08).toFixed(2)};.92;1" dur="8s" repeatCount="indefinite"/></line>`});
      N.forEach(([x,y,t,c],i)=>{s+=`<circle cx="${x}" cy="${y}" r="25" class="pad" stroke-width="2"/><circle cx="${x}" cy="${y}" r="25" class="${c}" stroke-width="2.6" opacity="0">${fade('0;0;1;1;0',`0;${(.1+i*.1).toFixed(2)};${(.14+i*.1).toFixed(2)};.92;1`,8)}</circle><text class="ko" x="${x}" y="${y+4}" text-anchor="middle">${t}</text>`});
      return svg(s,'0 0 600 250');
    }

    function orbit(){
      let s=`<circle cx="200" cy="150" r="132" class="l" stroke-dasharray="2 8"><animateTransform attributeName="transform" type="rotate" from="360 200 150" to="0 200 150" dur="40s" repeatCount="indefinite"/></circle>`;
      s+=`<circle cx="200" cy="150" r="100" class="l" stroke-dasharray="5 7"><animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="24s" repeatCount="indefinite"/></circle>`;
      const L=['BIZ','PLAN','DEV','DESIGN','STUDIO'];
      L.forEach((t,i)=>{const a=(-90+i*72)*Math.PI/180,x=200+100*Math.cos(a),y=150+100*Math.sin(a),d=`M200 150 L${x.toFixed(1)} ${y.toFixed(1)}`;
        s+=`<path d="${d}" class="l" stroke-width="1.4"/>`+pulse(d,i%2?'a':'d',2.4,i*.45);});
      L.forEach((t,i)=>{const a=(-90+i*72)*Math.PI/180,x=200+100*Math.cos(a),y=150+100*Math.sin(a);
        s+=`<circle cx="${x}" cy="${y}" r="24" class="pad" stroke-width="1.8"/><circle cx="${x}" cy="${y}" r="24" class="d" stroke-width="2" opacity="0">${fade('0;1;0;0','0;.1;.25;1',5,i*1)}</circle><text x="${x}" y="${y+3}" text-anchor="middle" style="font-size:8px">${t}</text>`});
      s+=`<circle cx="200" cy="150" r="34" class="pad" stroke-width="2.6"/><circle cx="200" cy="150" r="34" class="a" stroke-width="1.5"><animate attributeName="r" values="34;52" dur="2.5s" repeatCount="indefinite"/>${fade('.9;0','0;1',2.5)}</circle><text x="200" y="154" text-anchor="middle" style="font-size:11px">CEO</text>`;
      return svg(s);
    }

    function feed(){
      let s=`<defs><clipPath id="fclip"><rect x="160" y="40" width="230" height="220"/></clipPath></defs>`;
      [0,1,2].forEach(i=>s+=`<circle cx="80" cy="140" r="14" class="d" stroke-width="1.6"><animate attributeName="r" values="14;120" dur="3.6s" begin="${i*1.2}s" repeatCount="indefinite"/>${fade('.9;0','0;1',3.6,i*1.2)}</circle>`);
      s+=`<path d="M80 140 L62 230 M80 140 L98 230 M68 200 H92" class="k" stroke-width="2"/><circle cx="80" cy="140" r="7" class="af"/>`;
      let g='';for(let i=0;i<7;i++){const y=44+i*64;g+=`<rect x="172" y="${y}" width="206" height="52" rx="4" class="pad" stroke-width="1.4"/><rect x="182" y="${y+9}" width="34" height="34" rx="3" class="${i%2?'df':'af'}" opacity=".85"/><rect x="226" y="${y+12}" width="${120-(i%3)*18}" height="6" rx="3" class="kf" opacity=".85"/><rect x="226" y="${y+26}" width="130" height="4" rx="2" class="lf"/><rect x="226" y="${y+36}" width="${90+(i%2)*20}" height="4" rx="2" class="lf"/>`}
      s+=`<g clip-path="url(#fclip)"><g>${g}<animateTransform attributeName="transform" type="translate" values="0 0;0 -128" dur="6s" repeatCount="indefinite"/></g></g>`;
      return svg(s);
    }

    function radar(){
      let s='';for(let x=0;x<=400;x+=25)s+=`<line x1="${x}" y1="0" x2="${x}" y2="300" class="l" opacity=".35"/>`;for(let y=0;y<=300;y+=25)s+=`<line x1="0" y1="${y}" x2="400" y2="${y}" class="l" opacity=".35"/>`;
      s+=`<path d="M-10 230 L400 70" class="l" stroke-width="9" opacity=".5"/><path d="M60 -10 L170 310" class="l" stroke-width="6" opacity=".5"/>`;
      const sub='M20 60 L150 120 L280 180 L390 210';
      s+=`<path d="${sub}" class="d" stroke-width="3"/>`;
      [[150,120],[280,180]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="6" class="pad" stroke-width="2.4"/>`);
      s+=`<text x="102" y="146">인천대입구역</text>`.replace('<text','<text class="ko" style="font-size:10px"');
      s+=`<circle r="5" class="df"><animateMotion dur="6s" repeatCount="indefinite" path="${sub}"/></circle>`;
      [0,1,2].forEach(i=>s+=`<circle cx="214" cy="104" r="6" class="a" stroke-width="1.6"><animate attributeName="r" values="6;90" dur="3.6s" begin="${i*1.2}s" repeatCount="indefinite"/>${fade('.9;0','0;1',3.6,i*1.2)}</circle>`);
      s+=`<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="1.8s" repeatCount="indefinite"/><path d="M214 104 C200 88 196 80 196 72 A18 18 0 0 1 232 72 C232 80 228 88 214 104Z" class="af"/><circle cx="214" cy="72" r="6" class="pad" stroke-width="0"/></g>`;
      s+=`<text x="240" y="70">INSTA 2</text><text x="240" y="82" class="m">108</text>`;
      return svg(s);
    }

    function strata(){
      let s='';
      for(let i=0;i<6;i++){const y=70+i*30;s+=`<path d="M-200 ${y} q50 -14 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0" class="l" stroke-width="${1+i*.25}"><animateTransform attributeName="transform" type="translate" values="0 0;100 0" dur="${8+i*2}s" repeatCount="indefinite"/></path>`}
      for(let i=0;i<10;i++){const x=40+i*34,r=R(3,9),d=R(4,8),b=R(0,6);s+=`<circle cx="${x}" cy="300" r="${r.toFixed(1)}" class="${i%2?'df':'af'}"><animate attributeName="cy" values="300;60" dur="${d.toFixed(1)}s" begin="${(-b).toFixed(1)}s" repeatCount="indefinite"/>${fade('0;.9;0','0;.4;1',d.toFixed(1),(-b).toFixed(1))}</circle>`}
      s+=`<text x="16" y="34">MAGMA</text><text x="16" y="48" class="m">→ NAGMA</text>`;
      return svg(s);
    }

    const G={chip,data,platform,video,design,doc,orbit,feed,radar,strata,portal,dash,search,neural,stack,reel,palette,gantt};
    document.querySelectorAll('.illo[data-illo]').forEach(el=>{const f=G[el.dataset.illo];if(f){el.innerHTML=f();if(reduce){const v=el.querySelector('svg');v&&v.pauseAnimations&&v.pauseAnimations()}}});
  })();

  /* ================= Motion FX ================= */
  const FX=(function(){
    const fine=false;
    const prog=document.getElementById('prog'), glow=document.getElementById('cglow');
    /* split sub-hero titles into chars */
    document.querySelectorAll('.sub-hero h1').forEach(h=>{let i=0;h.innerHTML=h.textContent.split(' ').map(w=>`<span class="w">${[...w].map(c=>`<span class="ch" style="--i:${i++}">${c}</span>`).join('')}</span>`).join(' ')});
    /* orbs */
    document.querySelectorAll('.sub-hero').forEach(s=>s.insertAdjacentHTML('afterbegin','<span class="orb a"></span><span class="orb b"></span>'));
    /* tilt/spot targets */
    const TILT='.svc>a,.rish li,.trust li,.medical li,.cinfo li,.tile,.card,.grid-list li';
    document.querySelectorAll('.svc>a,.rish li,.trust li,.medical li,.cinfo li,.grid-list li,.team').forEach(e=>e.classList.add('spot'));
    if(fine&&!reduce){
      document.querySelectorAll('.rish li,.trust li,.medical li,.cinfo li,.tile,.card').forEach(e=>e.classList.add('tilt'));
      addEventListener('pointermove',e=>{
        glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
        glow.classList.toggle('on',!!e.target.closest('.hero,.sub-hero,.blk.dark,.cta,footer'));
        const sp=e.target.closest('.spot');
        if(sp){const r=sp.getBoundingClientRect();sp.style.setProperty('--mx',(e.clientX-r.left)+'px');sp.style.setProperty('--my',(e.clientY-r.top)+'px')}
        const t=e.target.closest('.tilt');
        document.querySelectorAll('.tilt.tilting').forEach(x=>{if(x!==t){x.classList.remove('tilting');x.style.transform=''}});
        if(t){const r=t.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;t.classList.add('tilting');t.style.transform=`perspective(900px) rotateX(${-py*7}deg) rotateY(${px*9}deg) translateY(-4px)`}
        const b=e.target.closest('.btn,.btn-contact');
        document.querySelectorAll('.mag').forEach(x=>{if(x!==b){x.classList.remove('mag');x.style.transform=''}});
        if(b){const r=b.getBoundingClientRect();b.classList.add('mag');b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.3}px)`}
      },{passive:true});
      document.addEventListener('pointerleave',()=>glow.classList.remove('on'));
    }
    /* reveal */
    const REV='.sec-head,.svc>a,.steps,.step,.num,.cards3>*,.gallery>*,.rish li,.trust li,.unit,.org .ceo,.team,.field,.grid-list,.medical li,.cinfo li,.route li,.nrow,.vision,.split>*,.tiles>*,.form>*,.motto,.maps';
    const io=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pre','line-pre');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -6% 0px'}):null;
    function reveal(root){
      if(reduce||!io)return;
      const vh=innerHeight;
      root.querySelectorAll(REV).forEach(el=>{
        if(el.closest('[hidden]'))return;
        const top=el.getBoundingClientRect().top;
        if(top<vh*.94)return;
        const sib=[...el.parentElement.children].indexOf(el);
        el.style.transitionDelay=(el.matches('.steps,.sec-head,.field,.split>*')?0:(sib%6)*90)+'ms';
        if(el.matches('.steps'))el.classList.add('line-pre');else el.classList.add('rv','pre');
        io.observe(el);
      });
    }
    function enter(pg){
      if(reduce)return;
      const top=document.querySelector(`.page[data-page="${pg}"] > section`);
      if(!top)return; top.classList.remove('enter'); void top.offsetWidth; top.classList.add('enter');
    }
    function scroll(){
      const h=document.documentElement.scrollHeight-innerHeight;
      prog.style.transform=`scaleX(${h>0?scrollY/h:0})`;
      
    }
    addEventListener('scroll',scroll,{passive:true});
    return {page(pg){enter(pg);requestAnimationFrame(()=>reveal(document.querySelector(`.page[data-page="${pg}"]`)));scroll()},reveal};
  })();
  window.__fx=FX;
  /* ================= i18n (KOR / ENG) ================= */
  const DICT={"회신받으실 연락처 또는 이메일을 입력해 주세요.": "Please enter a phone number or email so we can reply.", "이메일 주소 형식을 확인해 주세요.": "Please check the email address format.", "전송 중…": "Sending…", "문의가 접수되었습니다. 담당자가 확인 후 빠르게 연락드리겠습니다.": "Thank you — your inquiry has been received. We'll get back to you shortly.", "전송에 실패했습니다. 잠시 후 다시 시도하시거나 1599-1292 / rock@nagma.co.kr로 연락 주세요.": "Sending failed. Please try again later, or contact us at +82 1599-1292 / rock@nagma.co.kr.", "일하는 방식": "How we work", "흩어진": "We bring scattered", "데이터를 통합": "data together", "하여 업무 효율을 극대화하고,": " to maximize efficiency, and", "맞춤형 AI 도입": "tailored AI", "으로 소요 시간을 획기적으로": " dramatically", "단축": "cuts", "시켜 드립니다.": " the time your work takes.", "NAGMA 마그마 퍼플": "NAGMA — AI, AX & Data Integration", "NAGMA 홈": "NAGMA home", "회사 개요": "Overview", "비전·핵심가치": "Vision & Values", "기업부설연구소·특허": "R&D Center & Patent", "조직도": "Organization", "팀 소개": "Our Teams", "전체 소식": "All News", "언론 보도": "Press", "인증·특허": "Certification & Patent", "프로젝트 문의": "Project Inquiry", "오시는 길": "Directions", "메뉴 열기": "Open menu", "메뉴 닫기": "Close menu", "회사소개": "About us", "조직": "Team", "사업영역": "Work", "소식": "News", "문의": "Contact", "메인 비주얼": "Main visual", "흩어진 데이터를 하나로 잇고, AI로 일하는 방식을 바꿉니다.": "We connect scattered data and change the way you work with AI.", "나그마는 AI를 활용한 IT 솔루션 개발과 기업 데이터 통합을 전문으로 합니다. 데이터 통합부터 AI 서비스 운영까지 직접 구현하며, 특히 제약·바이오 분야는 업계를 가장 잘 아는 전문팀이 함께합니다.": "NAGMA specializes in AI-powered IT solution development and enterprise data integration. We build everything in-house, from data integration to running AI services, with a dedicated team that knows pharma and bio best.", "사업영역 보기": "Explore our work", "나그마라는 이름은 땅속 깊은 곳의 마그마에서 왔습니다. 사람마다 숨어 있는 잠재력과 열정이 모여 단단하게 굳은 터전, 그것이 나그마입니다.": "The name NAGMA comes from magma, deep beneath the earth. It is the ground formed when the hidden potential and passion of each person come together and harden into something solid.", "깊은 곳에서 시작한 생각과 기술로 고객의 마음을 녹이고, 신뢰로 굳힙니다.": "With ideas and technology that start deep within, we melt our clients' hearts and set them in trust.", "회사소개 보기 ›": "About NAGMA ›", "기업의 AX를 완성하는": "The data & AI partner", "데이터·AI 파트너": "for your company's AX", "CRM, ERP, LMS, 웹·앱, 메시징에 흩어진 고객·업무 데이터를 하나로 묶고, 그 위에서 AI가 실제 업무를 처리하도록 만듭니다.": "We unify customer and business data scattered across CRM, ERP, LMS, web, apps and messaging, then put AI to work on top of it.", "AI 서비스": "AI services", "챗봇, 콘텐츠 큐레이션, 의미 기반 검색, 문서 자동화까지 기업 업무에 맞는 AI 서비스를 개발합니다.": "Chatbots, content curation, semantic search and document automation, built around how your business works.", "챗봇": "Chatbot", "시맨틱 검색": "Semantic search", "문서 자동화": "Document automation", "더 알아보기 ›": "Learn more ›", "데이터 통합·AX": "Data Integration & AX", "부서별로 흩어진 데이터를 통합하고, AI 기반 업무 환경으로 전환하는 AX를 함께 설계합니다.": "We integrate data siloed across departments and design the AX roadmap to an AI-driven workplace with you.", "데이터 구축": "Data engineering", "AI 연동": "AI integration", "클라우드": "Cloud", "디지털 플랫폼": "Digital platforms", "웹·앱, 웨비나·화상(WebRTC), 문자·이메일·카카오톡 통합 발송, LMS, ERP를 처음부터 끝까지 구축합니다.": "Web and apps, webinars and video (WebRTC), unified SMS, email and KakaoTalk messaging, LMS and ERP, built end to end.", "웨비나": "Webinar", "카카오 API": "Kakao API", "영상·브랜드 디자인": "Video & Brand Design", "기획·촬영·편집·모션그래픽·3D 영상과, 회사소개서부터 전시 그래픽까지 브랜드 디자인을 한 팀에서 만듭니다.": "Planning, filming, editing, motion graphics and 3D video, plus brand design from company profiles to exhibition graphics, all in one team.", "모션그래픽": "Motion graphics", "브로슈어": "Brochure", "진단에서 운영까지,": "From diagnosis to operation,", "한 팀이 끝까지 만듭니다": "one team sees it through", "기업부설연구소를 갖춘 개발 조직이 설계한 그대로 만들고, 운영하며 개선합니다.": "Our engineering team, backed by an accredited R&D center, builds exactly what was designed, then runs and improves it.", "AX 진단": "AX diagnosis", "부서별 업무와 데이터 현황을 분석해 AI 적용 우선순위를 정합니다.": "We analyze each department's work and data to set AI priorities.", "데이터 통합": "Data integration", "사내외 시스템을 잇는 데이터 구조를 설계하고 구축합니다.": "We design and build the data structure that links internal and external systems.", "AI 구축": "AI build", "챗봇·검색·문서 자동화 등 AI를 실제 업무 흐름 안에 붙입니다.": "We embed chatbots, search and document automation into real workflows.", "운영·고도화": "Operation", "클라우드 운영과 QA, 지속적인 개선까지 책임집니다.": "We own cloud operations, QA and continuous improvement.", "숫자로 보는 나그마": "NAGMA in numbers", "제약·바이오 고객사": "Pharma & bio clients", "글로벌·국내 제약사": "Global & Korean pharma", "IT 솔루션 영역": "IT solution areas", "개": "", "AI 원천기술 특허": "Core AI patent", "건": "", "제10-2511282호": "No. 10-2511282", "기업부설연구소 인정": "R&D center accredited", "KOITA 제2025113058호": "KOITA No. 2025113058", "주요 고객사": "Key clients", "보령": "Boryung", "유영제약": "Yuyoung Pharm", "나그마 소식": "Latest from NAGMA", "전체 보기 ›": "View all ›", "일하는 공간이": "The space we work in", "일하는 방식을 만듭니다": "shapes the way we work", "더 보기 ›": "See more ›", "현재 업무와 데이터 환경을 알려주시면, 적용 가능한 AI 시나리오를 제안해 드립니다.": "Tell us about your current work and data environment, and we will propose AI scenarios you can apply.", "깊은 곳에서 시작해, 단단하게 굳습니다.": "Born deep within, set solid.", "주식회사 나그마는 인천 송도 인천스타트업파크에 자리한 AI IT 솔루션·데이터 통합 전문기업입니다.": "NAGMA Co., Ltd. is an AI IT solutions and data integration company based at Incheon Startup Park in Songdo.", "나그마는 AI를 활용한 IT 솔루션 개발과 기업 데이터 통합을 전문으로 하는 기업입니다. 웹·앱, 화상·웨비나, 메시징, LMS, ERP, 클라우드를 직접 개발하고, 영상과 브랜드 디자인까지 한 회사 안에서 완성합니다. 특히 제약·바이오 분야는 국내외 주요 제약사 프로젝트로 쌓은 전문성을 갖추고 있습니다.": "NAGMA specializes in AI-powered IT solutions and enterprise data integration. We develop web and apps, video conferencing and webinars, messaging, LMS, ERP and cloud in-house, and complete video and brand design under one roof. In pharma and bio, we bring expertise built on projects with leading global and Korean pharmaceutical companies.", "주식회사 나그마": "NAGMA Co., Ltd.", "이건호": "Gunho Lee", "AI IT 솔루션 · 데이터 통합": "AI IT solutions & data integration", "인천 송도": "Songdo, Incheon", "인천스타트업파크 인스타2": "Incheon Startup Park, INSTA 2", "MAGMA에서 NAGMA로": "From MAGMA to NAGMA", "나그마라는 이름은 땅속 깊은 곳의 마그마에서 왔습니다. 사람마다 깊이 숨어 있는 잠재력과 개성, 열정이 밖으로 흘러나와 단단하게 굳은 터전이 바로 나그마입니다.": "The name NAGMA comes from magma, deep beneath the earth. NAGMA is the ground formed when the potential, character and passion hidden deep in each person flow out and harden.", "눈에 보이지 않는 깊은 곳의 생각과 철학으로 고객의 마음을 녹이고, 신뢰로 굳힌다는 정신을 담았습니다.": "It carries our spirit: with thinking and philosophy from deep within, we melt our clients' hearts and set them in trust.", "올바른 성장과 따뜻한 나눔": "Right growth, warm sharing", "존중": "Respect", "나를 아끼고, 동료를 존중하며, 고객을 존경합니다.": "We care for ourselves, respect our colleagues and honor our clients.", "성장": "Improvement", "앞선 생각과 꾸준한 노력으로 변화를 이끕니다.": "We lead change with forward thinking and steady effort.", "나눔": "Sharing", "기업이 이룬 성과를 사회와 함께 나눕니다.": "We share what we achieve with society.", "정직": "Honesty", "나와 사회에 진실하고, 올바른 선택을 합니다.": "We are truthful to ourselves and society, and make the right choices.", "AI와 데이터 기술을": "We research and develop", "직접 연구하고 개발합니다": "AI and data technology ourselves", "외부 솔루션을 조합하는 데서 그치지 않고, 자체 연구 조직과 특허 기술로 실제 업무 현장에 맞는 AI를 만듭니다.": "We go beyond assembling third-party tools. Our own R&D team and patented technology build AI that fits real workplaces.", "한국산업기술진흥협회(KOITA) 제2025113058호": "Korea Industrial Technology Association (KOITA) No. 2025113058", "AI·데이터 기술을 자체 연구·개발하는 전담 조직을 갖추고 있습니다.": "A dedicated team researching and developing AI and data technology in-house.", "문서 수준 관계 추출 방법 및 장치": "Method and device for document-level relation extraction", "특허 제10-2511282호": "Patent No. 10-2511282", "문서 속 개체 간 관계를 자동으로 추출하는 자연어처리 기술로, 지능형 검색과 문서 자동화의 기반이 됩니다.": "An NLP technology that automatically extracts relations between entities in documents, the foundation of our intelligent search and document automation.", "소프트웨어사업자": "Software business", "소프트웨어사업자 신고 확인": "Software business registration confirmed", "공공·민간 소프트웨어 사업을 수행할 수 있는 요건을 갖추고 있습니다.": "Qualified to deliver public and private software projects.", "일하는 공간이 일하는 방식을 만듭니다": "The space we work in shapes the way we work", "함께 일하고, 함께 쉽니다": "We work together, and rest together", "나그마와 함께 성장할 동료와 파트너를 기다립니다.": "We are looking for colleagues and partners to grow with NAGMA.", "다섯 개 조직이 하나의 프로젝트를 만듭니다.": "Five units build one project.", "기획, 개발, 디자인, 영상, 사업이 한 지붕 아래에서 같은 목표로 움직입니다.": "Planning, engineering, design, video and business move toward the same goal under one roof.", "사업부": "Business", "사업 총괄·경영": "Business management", "서비스 기획": "Service planning", "고객지원·마케팅·영업": "Support, marketing & sales", "IT기획팀": "IT Planning", "개발기획": "Development planning", "요구사항 정의": "Requirements", "화면·기능 설계": "Screen & feature design", "IT개발팀": "IT Engineering", "프로그램 개발": "Software development", "AI·데이터 개발": "AI & data development", "UI·UX·디자인팀": "UI/UX & Design", "UI·UX 디자인": "UI/UX design", "그래픽 디자인": "Graphic design", "브랜드 디자인": "Brand design", "영상사업팀": "Video Studio", "영상 기획·제작": "Video planning & production", "촬영·편집": "Filming & editing", "각 팀이 일하는 방식": "How each team works", "아직 없는 것을, 말과 그림으로 먼저 만듭니다.": "We build what doesn't exist yet, first in words and sketches.", "고객의 요구를 개발팀이 바로 구현할 수 있는 구조로 정리합니다. 만들기 전에 충분히 고민하는 것이 가장 빠른 길이라고 믿습니다.": "We turn client needs into a structure engineering can build right away. We believe thinking it through before building is the fastest path.", "보이지 않는 안정성에 가장 많은 시간을 씁니다.": "We spend the most time on stability no one sees.", "새 기술은 먼저 시험하되, 고객 서비스에는 검증된 방식만 씁니다. QA까지 개발팀이 책임집니다.": "We test new technology first, but use only proven methods in client services. Engineering owns QA too.", "예쁜 것보다, 헤매지 않는 것을 먼저 봅니다.": "Before pretty, we make sure no one gets lost.", "앱·웹 인터페이스와 인쇄물을 한 팀이 함께 맡아, 디지털과 오프라인 모두에서 같은 브랜드 경험을 만듭니다.": "One team handles app and web interfaces as well as print, creating the same brand experience online and offline.", "끝까지 보게 되는 영상을 만듭니다.": "We make videos people watch to the end.", "기획부터 촬영, 편집, 모션그래픽까지 한 팀에서 처리해 처음 의도한 방향이 흐트러지지 않게 합니다.": "Planning, filming, editing and motion graphics stay in one team, so the original intent never drifts.", "요청을 받아 적기보다, 진짜 필요를 함께 찾습니다.": "Rather than taking orders, we find the real need together.", "고객이 실제로 필요한 것을 함께 정리하고, 프로젝트가 끝난 뒤에도 관계가 이어지도록 합니다.": "We define what clients really need with them, and keep the relationship going after the project ends.", "나그마의 다섯 번째, 여섯 번째 이야기를 함께 만들어 갈 분을 찾습니다.": "We are looking for people to write NAGMA's next chapters with us.", "화면 안과 밖, 모두 만듭니다.": "We build both on screen and off.", "AI·데이터 기반 IT 솔루션부터 영상 콘텐츠, 브랜드 디자인까지 처음부터 끝까지 만듭니다. 특히 제약·바이오 분야는 업계를 가장 잘 아는 팀이 맡습니다.": "From AI and data-driven IT solutions to video content and brand design, built end to end. In pharma and bio, a team that knows the industry best takes the lead.", "어떤 기업이든,": "Whatever your business,", "세 영역을 한 팀이 만듭니다": "one team covers all three fields", "필요한 영역을 한 팀이 처음부터 끝까지 맡습니다. 특히 제약·바이오 기업은 규제와 컴플라이언스, 의료진 커뮤니케이션까지 이해하는 전문팀이 기획 단계부터 참여합니다.": "One team takes on what you need from start to finish. For pharma and bio companies, a specialist team that understands regulation, compliance and HCP communication joins from day one.", "AI, 데이터, 웹·앱, WebRTC, 메시징, LMS, ERP, 클라우드": "AI, data, web & app, WebRTC, messaging, LMS, ERP, cloud", "기획, 촬영, 편집, 모션그래픽, 3D": "Planning, filming, editing, motion graphics, 3D", "회사소개서, 홍보물, 안내문, 카탈로그, 포스터, 전시 그래픽": "Company profiles, promotional materials, guides, catalogs, posters, exhibition graphics", "AI 서비스·AX": "AI Services & AX", "기업의 부서별 데이터를 통합하고, 그 위에서 AI가 일하는 업무 환경을 만듭니다.": "We integrate data across departments and build a workplace where AI does real work on top of it.", "AI 챗봇": "AI chatbot", "제품·서비스 문의에 답하는 대화형 서비스": "Conversational service for product and service inquiries", "콘텐츠 추천": "Content recommendation", "고객 관심사에 맞춘 콘텐츠 큐레이션": "Content curated to customer interests", "의미 기반 검색": "Semantic search", "키워드가 아닌 뜻으로 찾는 지능형 검색": "Intelligent search by meaning, not keywords", "특허 기술 기반 문서 분석·요약·생성": "Patented document analysis, summarization and generation", "음성·영상 AI": "Voice & vision AI", "음성 인식, 영상 분석 기능 개발": "Speech recognition and video analysis", "AI 연동 개발": "AI integration", "이미 쓰고 있는 시스템에 AI 기능 결합": "Adding AI to the systems you already use", "기업부설연구소": "Accredited R&D center", "신고 확인": "Registration confirmed", "데이터부터 웹·앱·화상·메시징까지, 시스템을 처음부터 끝까지 구축합니다.": "From data to web, apps, video and messaging, we build systems end to end.", "수집·정제·통합": "Collection, cleansing, integration", "웹": "Web", "HCP 포털, 기업 사이트": "HCP portals, corporate sites", "모바일 앱": "Mobile apps", "화상회의·웨비나": "Video meetings & webinars", "브라우저 기반 WebRTC": "Browser-based WebRTC", "통합 메시징": "Unified messaging", "문자·이메일·카카오톡": "SMS, email, KakaoTalk", "교육 관리 시스템": "Learning management system", "업무 관리 시스템": "Enterprise resource planning", "구축·운영·이전": "Build, operate, migrate", "기획부터 촬영, 편집, 모션그래픽·3D까지 한 팀에서 맡습니다.": "One team handles planning, filming, editing, motion graphics and 3D.", "기획": "Planning", "메시지와 구성 설계": "Message and structure design", "촬영": "Filming", "인터뷰·현장·제품": "Interviews, on-site, products", "편집": "Editing", "컷·색보정·사운드": "Cutting, color, sound", "모션그래픽·3D": "Motion graphics & 3D", "기전 설명, 데이터 시각화": "Mechanism of action, data visualization", "기획부터 인쇄 감리까지 디자인팀이 직접 맡습니다.": "Our design team handles everything from planning to print supervision.", "회사소개서": "Company profile", "기업·제품 소개 자료": "Corporate and product introductions", "홍보물": "Promotional materials", "리플릿, 브로슈어": "Leaflets, brochures", "안내문·매뉴얼": "Guides & manuals", "고객·사용자용 안내": "For customers and users", "카탈로그": "Catalogs", "제품 카탈로그": "Product catalogs", "포스터·현수막": "Posters & banners", "학회·캠페인": "Congresses, campaigns", "전시·행사 그래픽": "Exhibition & event graphics", "부스, 사이니지": "Booths, signage", "여섯 단계로 진행합니다": "Six steps", "목표와 요구사항을 정리합니다.": "We define goals and requirements.", "설계": "Architecture", "데이터·화면·기능 구조를 설계합니다.": "We design the data, screens and features.", "디자인": "Design", "사용자가 헤매지 않는 UI를 만듭니다.": "We make UI no one gets lost in.", "개발": "Development", "검증된 기술로 안정적으로 구현합니다.": "We build reliably with proven technology.", "검수": "QA", "개발팀이 직접 품질을 책임집니다.": "Engineering owns quality.", "오픈": "Launch", "오픈 이후 운영과 개선을 이어갑니다.": "We keep operating and improving after launch.", "필요한 영역이 하나든 셋이든, 한 번의 미팅으로 시작할 수 있습니다.": "Whether you need one field or all three, it starts with a single meeting.", "나그마의 새로운 소식을 전합니다.": "What's new at NAGMA.", "언론 보도, 행사 참가, 인증과 특허까지 나그마가 걸어온 길을 기록합니다.": "Press coverage, events, certifications and patents: a record of NAGMA's journey.", "전체": "All", "행사": "Events", "영상": "Video", "프로젝트, 협업, 채용 등 무엇이든 편하게 문의해 주세요.": "Projects, partnerships, careers: feel free to reach out about anything.", "연락처": "Contact", "이메일 복사": "Copy email", "인천광역시 연수구 컨벤시아대로 204, 108호(송도동) 인천스타트업파크 인스타2": "#108, INSTA 2, Incheon Startup Park, 204 Convensia-daero, Yeonsu-gu, Incheon, Korea", "주소 복사": "Copy address", "대표 이건호": "CEO Gunho Lee", "사업자등록번호 267-87-03144": "Business Reg. No. 267-87-03144", "내용을 작성하시면 메일로 보낼 수 있도록 정리해 드립니다. 영업일 기준 1~2일 안에 답변드립니다.": "Fill in the form and we'll format it for you to send by email. We reply within 1–2 business days.", "회사명": "Company", "예: 주식회사 OO": "e.g. ABC Corp.", "담당자": "Name", "이름 / 부서": "Name / Department", "이메일": "Email", "관심 분야": "Areas of interest", "IT 솔루션": "IT solutions", "웨비나·메시징": "Webinar & messaging", "문의 내용": "Message", "현재 상황과 원하시는 결과를 자유롭게 적어 주세요.": "Tell us about your situation and the results you're looking for.", "문의 내용 정리하기": "Prepare my inquiry", "인천스타트업파크 인스타2 108호": "#108, INSTA 2, Incheon Startup Park", "지하철": "Subway", "인천 1호선 인천대입구역 4번 출구, 도보 5분. 4번 출구로 나오면 바로 보이는 건물(지상 1층)이며, 4번 출구 쪽 에스컬레이터로 지하 1층 연결통로를 이용할 수도 있습니다.": "Incheon Line 1, Incheon Nat'l Univ. Station Exit 4, 5-minute walk. The building is right in front of Exit 4 (ground floor); you can also take the escalator near Exit 4 to the B1 connecting passage.", "버스": "Bus", "인천대입구역 하차, 도보 5분": "Get off at Incheon Nat'l Univ. Station, 5-minute walk", "간선 16": "Trunk 16", "지선 순환41": "Branch 41", "광역 3002": "Express 3002", "공항버스": "Airport bus", "오라카이 송도파크 호텔 하차, 도보 5분": "Get off at Orakai Songdo Park Hotel, 5-minute walk", "자가용": "Car", "내비게이션에서 \"인천스타트업파크\" 검색 후 지하주차장 이용": "Search \"Incheon Startup Park\" in your navigation and use the underground parking", "네이버 지도 ↗": "Naver Map ↗", "카카오맵 ↗": "Kakao Map ↗", "AI 기반 IT 솔루션 · 기업 데이터 통합 전문기업": "AI-powered IT solutions & enterprise data integration", "연구소·특허": "R&D & Patent", "주식회사 나그마 · 대표 이건호 · 사업자등록번호 267-87-03144": "NAGMA Co., Ltd. · CEO Gunho Lee · Business Reg. No. 267-87-03144", "복사": "Copy", "개인정보처리방침": "Privacy Policy", "맨 위로": "Back to top", "2026 글로벌 오픈이노베이션 위크 — 바이오헬스 포스터 전시 참가": "Global Open Innovation Week 2026 — Bio-health poster exhibition", "보건복지부 주최, 한국보건산업진흥원 주관 행사에서 제약·바이오 기업의 부서별 데이터 통합과 AI 기반 업무 환경 구성 방안을 제안했습니다.": "At the event hosted by the Ministry of Health and Welfare and organized by KHIDI, we proposed how pharma and bio companies can integrate departmental data and build AI-driven workplaces.", "스타트업데일리": "Startup Daily", "나그마, 국내 대형 제약사 통합 디지털 커뮤니케이션 솔루션 구축·운영": "NAGMA builds and operates an integrated digital communication solution for a major Korean pharma company", "HCP 포털, 웨비나, 메시징을 하나로 묶은 통합 디지털 커뮤니케이션 솔루션을 국내 대형 제약사에 구축하고 운영하고 있습니다.": "We built and operate an integrated digital communication solution combining an HCP portal, webinars and messaging for a major Korean pharmaceutical company.", "한국산업기술진흥협회(KOITA)로부터 기업부설연구소 인정을 받았습니다(제2025113058호). AI와 데이터 기술을 자체 연구·개발하는 전담 조직입니다.": "Our corporate R&D center was accredited by the Korea Industrial Technology Association (KOITA, No. 2025113058), a dedicated team for in-house AI and data research.", "인천스타트업파크 인사이드파크 — 나그마 편 [인(턴)스타임]": "Incheon Startup Park 'Inside Park' — featuring NAGMA", "2025 신규 입주기업 나그마를 소개하는 인천스타트업파크 영상입니다.": "An Incheon Startup Park video introducing NAGMA as a new 2025 resident company.", "특허 등록 — 문서 수준 관계 추출 방법 및 장치": "Patent granted — Method and device for document-level relation extraction", "문서 속 개체 간 관계를 자동으로 추출하는 자연어처리 기술 특허(제10-2511282호)를 확보했습니다. 지능형 검색과 문서 자동화의 기술 기반입니다.": "We secured a patent (No. 10-2511282) for NLP technology that automatically extracts relations between entities in documents, the foundation of intelligent search and document automation.", "회사 전경": "Office exterior", "카페테리아": "Cafeteria", "체력단련실": "Gym", "브릿지 라운지": "Bridge lounge", "탁구장": "Ping-pong room", "미팅룸": "Meeting room", "업무 공간": "Workspace", "사무실 디테일": "Office details", "워크샵": "Workshops", "사내 행사": "Company events", "교육·세미나": "Training & seminars", "기타 활동": "Other activities", "영상 보기": "Watch video", "영상 보기 ↗": "Watch video ↗", "기사 보기 ↗": "Read article ↗", "기사 보기": "Read article", "복사됨": "Copied", "담당자와 문의 내용을 입력해 주세요.": "Please enter your name and message.", "제품": "Product", "성분": "Compound", "적응증": "Indication", "기관": "Institution", "효능": "Efficacy", "인천대입구역": "INU Station", "나그마는 AI를 활용한 IT 솔루션 개발과 기업 데이터 통합을 전문으로 합니다. 데이터 통합부터 AI 서비스 운영까지 직접 구현합니다.": "NAGMA specializes in AI-powered IT solution development and enterprise data integration. We build everything in-house, from data integration to running AI services.", "분야는 업계를 가장 잘 아는 전문팀이 함께합니다.": "is backed by a specialist team that knows the industry best.", "나그마는 AI를 활용한 IT 솔루션 개발과 기업 데이터 통합을 전문으로 하는 기업입니다. 웹·앱, 화상·웨비나, 메시징, LMS, ERP, 클라우드를 직접 개발하고, 영상과 브랜드 디자인까지 한 회사 안에서 완성합니다.": "NAGMA specializes in AI-powered IT solutions and enterprise data integration. We develop web and apps, video conferencing and webinars, messaging, LMS, ERP and cloud in-house, and complete video and brand design under one roof.", "분야는 국내외 주요 제약사 프로젝트로 쌓은 전문성을 갖추고 있습니다.": "is where we bring expertise built on projects with leading global and Korean pharmaceutical companies.", "AI·데이터 기반 IT 솔루션부터 영상 콘텐츠, 브랜드 디자인까지 처음부터 끝까지 만듭니다.": "From AI and data-driven IT solutions to video content and brand design, built end to end.", "분야는 업계를 가장 잘 아는 팀이 맡습니다.": "is led by a team that knows the industry best.", "필요한 영역을 한 팀이 처음부터 끝까지 맡습니다.": "One team takes on what you need from start to finish.", "기업은 규제와 컴플라이언스, 의료진 커뮤니케이션까지 이해하는 전문팀이 기획 단계부터 참여합니다.": "companies get a specialist team that understands regulation, compliance and HCP communication from day one.", "특히,": "In particular,", "제약·바이오": "Pharma & bio", "에서": "→", "로": "", "사업기획 및 관리": "Business planning & management", "함께하는 고객사": "Clients we work with", "글로벌·국내 제약 및 바이오 기업 포함": "Incl. global & Korean pharma and bio companies", "나그마 NAGMA": "NAGMA", "무엇을": "What", "AI·데이터 통합": "AI & data integration", "어떤 산업": "Industry", "제약·바이오 특화": "Pharma & bio specialists", "언제": "When", "상담 일정 잡기": "Schedule a meeting", "빠른 이동": "Quick links", "사업 분야": "Business areas", "글로벌 파트너": "Global partner", "국내 파트너": "Korean partner", "보령제약": "Boryung", "삼성": "Samsung", "롯데정밀화학": "LOTTE Fine Chemical", "기아": "Kia", "롯데케미칼": "LOTTE Chemical", "서울경제진흥원": "Seoul Business Agency", "LIG넥스원": "LIG Nex1", "HD현대": "HD Hyundai", "인천경제자유구역청": "IFEZ", "제일기획": "Cheil Worldwide", "공공 파트너": "Public partner", "전화 걸기": "Call", "메일 보내기": "Send email", "대표번호로 전화하기": "Call our main line", "전화 문의": "Call us", "프로젝트 문의하기": "Start a project", "대표번호 1599-1292": "Call 1599-1292", "국내외 36+ 기업·기관과 함께": "Trusted by 36+ organizations", "기업부설연구소 인정 (KOITA)": "Accredited R&D center (KOITA)", "AI 원천기술 특허 보유": "Core AI patent", "소프트웨어사업자 등록": "Registered software business", "국내외 36+ 기업·기관이 나그마와 함께합니다": "36+ companies and institutions work with NAGMA", "나그마를 선택하는 이유": "Why companies choose NAGMA", "처음 만나는 파트너라도 안심하고 맡길 수 있도록, 나그마가 일하는 기준을 소개합니다.": "How we work, so you can trust us from the very first project.", "한 팀의 원스톱 구축": "One team, end to end", "기획·설계·디자인·개발·QA, 영상까지. 다섯 개 조직이 하나의 프로젝트를 처음부터 끝까지 맡습니다.": "Planning, architecture, design, development, QA and video. Five units own each project from start to finish.", "자체 R&D와 특허 기술": "In-house R&D and patents", "기업부설연구소와 문서 수준 관계 추출 특허를 바탕으로 AI를 직접 연구하고 개발합니다.": "Backed by an accredited R&D center and a relation-extraction patent, we research and build AI ourselves.", "제약·바이오 전문성": "Pharma & bio expertise", "국내외 주요 제약사 프로젝트로 규제·컴플라이언스·의료진 커뮤니케이션까지 이해합니다.": "Projects with leading pharma companies taught us regulation, compliance and HCP communication.", "구축 이후까지 책임": "Accountable after launch", "오픈 후에도 클라우드 운영, QA, 기능 고도화를 이어가며 오래 함께합니다.": "After launch we keep running the cloud, QA and improvements for the long term.", "주요 수행 사례": "Selected projects", "전체 소식 보기 ›": "All news ›", "제약 · 디지털 커뮤니케이션": "Pharma · Digital communication", "국내 대형 제약사 통합 디지털 커뮤니케이션 솔루션 구축·운영": "Integrated digital communication solution for a major Korean pharma company", "HCP 포털, 웨비나, 메시징을 하나로 묶어 의료진과 만나는 디지털 채널을 통합하고 운영하고 있습니다.": "We unified the HCP portal, webinars and messaging into one channel and operate it today.", "웨비나(WebRTC)": "Webinar (WebRTC)", "관련 보도 보기 ↗": "Read coverage ↗", "바이오헬스 · 데이터 통합": "Bio-health · Data integration", "제약·바이오 기업 부서별 데이터 통합과 AI 업무 환경 제안": "Departmental data integration and AI workplaces for pharma and bio", "보건복지부가 주최한 2026 바이오헬스 글로벌 오픈이노베이션 위크에서 발표했습니다.": "Presented at the 2026 Bio-health Global Open Innovation Week hosted by the Ministry of Health and Welfare.", "AI 업무 환경": "AI workplace", "R&D · 자연어처리": "R&D · NLP", "특허 기술 기반 지능형 검색·문서 자동화": "Patented intelligent search and document automation", "문서 수준 관계 추출 특허(제10-2511282호)로 문서 속 개체 간 관계를 찾아 검색과 문서 자동화에 적용합니다.": "Our relation-extraction patent (No. 10-2511282) finds links between entities in documents for search and automation.", "특허 기술": "Patented tech", "지능형 검색": "Intelligent search", "자주 묻는 질문": "Frequently asked questions", "더 궁금한 점은 대표번호": "For anything else, call", "로 편하게 문의해 주세요.": "anytime.", "제약·바이오 기업이 아니어도 의뢰할 수 있나요?": "Do you work with companies outside pharma and bio?", "네. AI 솔루션, 데이터 통합, 웹·앱, 영상, 브랜드 디자인은 업종과 관계없이 진행합니다. 제약·바이오 분야는 규제와 의료진 커뮤니케이션까지 이해하는 전문팀이 함께합니다.": "Yes. AI solutions, data integration, web and apps, video and brand design are open to every industry. For pharma and bio, a specialist team that understands regulation and HCP communication joins in.", "이미 쓰고 있는 시스템에 AI 기능만 더할 수 있나요?": "Can you add AI to systems we already use?", "가능합니다. 기존에 운영 중인 시스템에 AI 기능을 얹는 연동 개발을 진행합니다.": "Yes. We build integrations that add AI features to the systems you already run.", "견적과 일정은 어떻게 정해지나요?": "How are quotes and timelines set?", "첫 미팅에서 현재 업무와 데이터 환경, 원하시는 결과를 듣고 범위에 맞춰 일정과 견적을 제안드립니다.": "In the first meeting we learn your workflow, data and goals, then propose a timeline and quote for that scope.", "구축 이후 운영과 유지보수도 맡아 주나요?": "Do you handle operation and maintenance after launch?", "네. 오픈 이후에도 클라우드 운영, QA, 기능 고도화까지 이어서 맡습니다.": "Yes. After launch we continue with cloud operations, QA and feature improvements.", "영상이나 인쇄물만 따로 맡길 수도 있나요?": "Can we commission only video or print work?", "네. 영상 콘텐츠와 브랜드 디자인도 단독으로 진행합니다. 기획부터 촬영·편집, 인쇄 감리까지 한 팀이 맡습니다.": "Yes. Video and brand design are available on their own, with one team from planning and shooting to print supervision.", "연혁": "History", "나그마가 걸어온 길": "Our journey", "2026 바이오헬스 글로벌 오픈이노베이션 위크 포스터 전시 참가": "Poster exhibition at 2026 Bio-health Global Open Innovation Week", "보건복지부 주최 · 한국보건산업진흥원 주관": "Hosted by the Ministry of Health and Welfare · Organized by KHIDI", "스타트업데일리 보도": "Covered by Startup Daily", "인천스타트업파크 신규 입주": "Joined Incheon Startup Park", "인스타2 108호": "INSTA 2, #108", "「문서 수준 관계 추출 방법 및 장치」 특허권 확보": "Acquired patent for document-level relation extraction", "소프트웨어사업자 확인": "Software business registration", "확인번호 B25-315477": "No. B25-315477", "특허 제10-2511282호 · 존속기간 2040.12.11": "Patent No. 10-2511282 · valid until 2040.12.11", "소프트웨어사업자 B25-315477 · 기업부설연구소 KOITA 제2025113058호": "Software business B25-315477 · R&D center KOITA No. 2025113058", "HCP 포털": "HCP portal", "나그마를 더 알아보세요": "Get to know NAGMA", "회사 이름에 담은 뜻부터 연구 역량, 걸어온 길, 일하는 공간까지 소개합니다.": "From the meaning behind our name to our R&D, our journey and our workplace.", "마그마에서 나그마로. 이름에 담은 정신을 소개합니다.": "From MAGMA to NAGMA: the spirit behind our name.", "올바른 성장과 따뜻한 나눔, 그리고 RISH 네 가지 가치.": "Right growth, warm sharing, and our four RISH values.", "KOITA 인정 연구소와 AI 원천기술 특허를 소개합니다.": "Our KOITA-accredited R&D center and core AI patent.", "특허 확보부터 대형 제약사 프로젝트까지의 기록.": "From our patent to major pharma projects.", "송도 인천스타트업파크에서 일하고 함께 쉽니다.": "How we work and rest at Incheon Startup Park, Songdo.", "자세히 보기 ›": "Learn more ›", "땅속 깊은 곳의 마그마처럼, 숨겨진 잠재력과 열정이 단단하게 굳은 터전입니다.": "Like magma deep underground, a place where hidden potential and passion harden into solid ground.", "현재 위치": "Breadcrumb", "Meaning": "Meaning", "이름에 담은 세 가지 뜻": "Three meanings in our name", "깊이": "Depth", "보이지 않는 깊은 곳에서 시작한 생각과 철학이 모든 일의 출발점입니다.": "Every project starts from ideas and principles formed deep below the surface.", "녹이다": "Melt", "진심을 담은 결과물로 고객의 마음을 녹입니다.": "We melt our clients' hearts with work made in earnest.", "굳히다": "Solidify", "한 번의 프로젝트가 오래가는 신뢰로 굳어지도록 끝까지 책임집니다.": "We see each project through so that it hardens into lasting trust.", "나그마가 지키는 세 문장": "Three lines we live by", "안 된다고 말하기 전에, 방법을 먼저 찾습니다.": "Before saying no, we look for a way.", "한계를 넘어 고객과 함께 성장합니다.": "We grow past our limits, together with our clients.", "기술보다 사람을 먼저 생각합니다.": "We think of people before technology.", "이전": "Previous", "다음": "Next", "나그마가 일하는 기준이자, 고객과 동료에게 하는 약속입니다.": "The standard we work by, and our promise to clients and colleagues.", "핵심가치는 이렇게 일하는 방식이 됩니다": "How our values show up in our work", "고객의 요청을 끝까지 듣고, 동료의 의견을 먼저 묻습니다.": "We listen to client requests to the end and ask colleagues first.", "새로운 기술을 먼저 시험하고, 검증된 방식으로 서비스에 적용합니다.": "We test new technology first and apply it to services in proven ways.", "프로젝트에서 얻은 지식과 성과를 고객, 동료, 사회와 나눕니다.": "We share the knowledge and results of our projects with clients, colleagues and society.", "할 수 있는 것과 없는 것을 처음부터 분명하게 말씀드립니다.": "We are clear from the start about what we can and cannot do.", "AI와 데이터 기술을 직접 연구합니다": "We research AI and data technology ourselves", "기업부설연구소와 특허 기술로, 실제 업무 현장에 맞는 AI를 만듭니다.": "With our R&D center and patented technology, we build AI that fits real workplaces.", "Research": "Research", "연구 분야": "Research areas", "연구소에서 다루는 기술은 그대로 고객 프로젝트에 적용됩니다.": "The technology we research goes straight into client projects.", "자연어처리·문서 이해": "NLP & document understanding", "문서 속 개체와 관계를 찾아내는 특허 기술을 바탕으로 문서를 구조화합니다.": "We structure documents using our patented technology that finds entities and their relations.", "키워드가 아닌 의미로 찾는 검색을 사내 문서와 자료에 적용합니다.": "Search by meaning, not keywords, across internal documents and data.", "부서별로 흩어진 데이터를 수집·정제해 AI가 쓸 수 있는 구조로 통합합니다.": "We collect and clean scattered departmental data into a structure AI can use.", "AI 서비스 연동": "AI service integration", "챗봇, 추천, 문서 자동화를 기존 시스템에 연동하는 방법을 연구합니다.": "We research ways to connect chatbots, recommendations and document automation to existing systems.", "Certificates": "Certificates", "인증·등록 현황": "Certifications & registrations", "기업부설연구소 인정서": "R&D center accreditation", "인정번호": "No.", "제2025113058호": "No. 2025113058", "인정일": "Date", "인정기관": "Issuer", "한국산업기술진흥협회(KOITA)": "Korea Industrial Technology Association (KOITA)", "특허증": "Patent certificate", "명칭": "Title", "등록번호": "Reg. no.", "등록일": "Registered", "존속기간": "Valid until", "확인번호": "No.", "사업 범위": "Scope", "공공·민간 소프트웨어 사업": "Public and private software projects", "연도별 주요 연혁": "Milestones by year", "09월": "Sep", "04월": "Apr", "함께한 기업·기관": "Companies and institutions we work with", "국내외 36+ 기업·기관 중 일부입니다.": "A selection of the 36+ organizations we work with.", "한 걸음씩, 고객과 함께 쌓아온 기록입니다.": "A record built step by step, together with our clients.", "송도 인천스타트업파크 인스타2에서 일하고, 함께 쉽니다.": "We work and rest together at INSTA 2, Incheon Startup Park in Songdo.", "Environment": "Environment", "일하는 환경": "Our environment", "집중하는 업무 공간": "Focused workspace", "기획·개발·디자인·영상 팀이 한 공간에서 바로 이야기하며 일합니다.": "Planning, engineering, design and video teams work side by side.", "회의·세미나 공간": "Meeting & seminar rooms", "고객 미팅, 내부 리뷰, 교육과 세미나를 위한 공간을 갖추고 있습니다.": "Rooms for client meetings, internal reviews, training and seminars.", "함께 쉬는 공간": "Spaces to recharge", "카페테리아, 라운지, 체력단련실, 탁구장에서 잠시 쉬어 갑니다.": "A cafeteria, lounge, gym and ping-pong room for a break.", "Join us": "Join us", "분야별로 자세히 보기": "Explore each field", "각 분야에서 무엇을, 어떻게 만드는지 소개합니다.": "What we build in each field, and how.", "데이터를 통합하고, AI가 실제로 일하는 업무 환경을 만듭니다.": "We integrate data and build workplaces where AI does real work.", "데이터부터 웹·앱·화상·메시징까지 처음부터 끝까지 구축합니다.": "From data to web, apps, video and messaging, built end to end.", "기획·촬영·편집·모션그래픽이 한 팀 안에서 이어집니다.": "Planning, shooting, editing and motion graphics in one team.", "회사소개서부터 전시 그래픽까지, 인쇄 감리까지 맡습니다.": "From company profiles to exhibition graphics, through print supervision.", "기획부터 오픈 이후 운영까지, 여섯 단계로 진행합니다.": "Six steps, from planning to operation after launch.", "AI가 실제로 일하는 업무 환경을 만듭니다": "We build workplaces where AI does real work", "부서별로 흩어진 데이터를 통합하고, 그 위에 AI 서비스를 올려 일하는 방식을 바꿉니다.": "We integrate scattered departmental data and put AI services on top to change the way you work.", "기업 업무에 바로 쓰이는 AI 서비스를 개발합니다.": "AI services built for everyday business work.", "데이터 통합이 먼저입니다": "Data integration comes first", "AI의 품질은 데이터에서 결정됩니다. CRM·ERP·LMS·웹 로그처럼 흩어진 데이터를 먼저 하나로 잇고, 그 위에서 AI가 정확하게 동작하도록 설계합니다.": "AI is only as good as its data. We first connect scattered data from CRM, ERP, LMS and web logs, then design AI to work accurately on top of it.", "AX는 네 단계로 진행합니다": "AX in four steps", "이런 업무에 적용합니다": "Where we apply AI", "고객 상담·문의 응대": "Customer inquiries", "반복되는 제품·서비스 문의를 챗봇이 먼저 응대하고, 필요한 건만 담당자에게 넘깁니다.": "A chatbot answers repeat product and service questions first and hands only what is needed to staff.", "영업·마케팅": "Sales & marketing", "고객 관심사와 이력을 분석해 맞춤 콘텐츠를 추천합니다.": "We analyze customer interests and history to recommend tailored content.", "사내 지식 관리": "Internal knowledge", "흩어진 사내 문서를 의미로 검색하고, 보고서와 요약문을 자동으로 만듭니다.": "Search internal documents by meaning and auto-generate reports and summaries.", "교육·학습": "Training & learning", "교육 과정 운영과 학습 자료 관리에 AI 추천과 자동화를 더합니다.": "Add AI recommendations and automation to course operations and learning materials.", "기술 기반": "Our technology base", "필요한 시스템을 처음부터 끝까지 만듭니다": "We build the systems you need, end to end", "데이터부터 웹·앱·화상·메시징까지, 기획·설계·개발·운영을 한 팀이 맡습니다.": "From data to web, apps, video and messaging, one team plans, designs, builds and runs it.", "구축 분야": "What we build", "빅데이터 수집·처리·통합, Data Lake·Data Warehouse 구축": "Big data collection, processing and integration; Data Lake and Data Warehouse", "기업 홈페이지부터 대규모 포털까지 웹 기반 솔루션": "Web solutions from corporate sites to large portals", "iOS·Android 모바일 앱 기획·개발·운영": "iOS and Android app planning, development and operation", "설치 없이 브라우저에서 쓰는 화상회의·웨비나": "Browser-based video meetings and webinars, no install", "문자·이메일·카카오톡 채널 통합 발송": "SMS, email and KakaoTalk channel messaging in one place", "교육 과정 운영·평가·이수 관리": "Course operation, assessment and completion tracking", "업무 프로세스 자동화·사내 관리 시스템": "Workflow automation and internal management systems", "클라우드 환경 구축·운영·이전": "Cloud setup, operation and migration", "대표 구축 사례": "Featured project", "국내 대형 제약사 통합 디지털 커뮤니케이션 솔루션": "Integrated digital communication solution for a major Korean pharma company", "HCP 포털, 웨비나, 메시징을 하나로 묶어 의료진과 만나는 디지털 채널을 통합하고, 지금도 운영하고 있습니다.": "We unified the HCP portal, webinars and messaging into one digital channel for healthcare professionals, and we still operate it today.", "이렇게 만듭니다": "How we build", "한 팀이 처음부터 끝까지": "One team, start to finish", "기획·설계·디자인·개발·QA를 한 팀이 맡아, 전달 과정에서 생기는 누락을 줄입니다.": "Planning, architecture, design, development and QA stay in one team, so nothing gets lost in handoffs.", "검증된 기술로": "Proven technology", "새로운 기술은 먼저 시험하고, 고객 서비스에는 검증된 방식만 올립니다.": "We test new technology first and only ship proven methods to client services.", "운영까지 책임": "We stay for operation", "오픈 이후에도 클라우드 운영과 기능 고도화를 이어갑니다.": "After launch we continue cloud operations and feature improvements.", "끝까지 보게 되는 영상을 만듭니다": "We make videos people watch to the end", "기획·촬영·편집·모션그래픽이 한 팀 안에서 이어져, 처음 잡은 방향이 마지막 컷까지 흐트러지지 않습니다.": "Planning, shooting, editing and motion graphics stay in one team, so the original direction holds to the last cut.", "제작 과정": "Production process", "메시지 정의부터 구성안·스토리보드까지": "From defining the message to outline and storyboard", "현장·스튜디오·행사 기록": "On-site, studio and event filming", "컷 편집·색보정·사운드": "Cutting, color grading and sound", "타이틀·인포그래픽·3D 연출": "Titles, infographics and 3D", "제작 분야": "What we produce", "의학 정보·학술 영상": "Medical & academic video", "제품 기전, 학술 정보를 정확하고 이해하기 쉽게 전달합니다.": "Mechanisms of action and academic content, accurate and easy to follow.", "기업·브랜드 홍보 영상": "Corporate & brand films", "회사와 브랜드의 이야기를 짧고 분명하게 보여줍니다.": "Your company and brand story, short and clear.", "제품·서비스 소개 영상": "Product & service videos", "기능과 장점을 화면으로 보여주는 소개 영상을 만듭니다.": "Videos that show features and benefits on screen.", "행사·현장 기록": "Event coverage", "학회, 세미나, 사내 행사를 현장감 있게 기록합니다.": "Congresses, seminars and company events, captured as they happen.", "교육·온라인 강의": "Training & e-learning", "LMS와 연계해 쓰기 좋은 교육용 영상을 제작합니다.": "Training videos ready to use with your LMS.", "모션그래픽·인포그래픽": "Motion & infographics", "복잡한 데이터와 개념을 움직이는 그래픽으로 풀어냅니다.": "Complex data and concepts explained in motion.", "첫 3초를 가장 오래 고민합니다": "We spend the most time on the first three seconds", "화려한 기술보다 첫 3초에 무엇을 보여줄지를 더 오래 고민합니다. 보는 사람이 끝까지 머무르는 영상이 결국 메시지를 전합니다.": "We think longer about what to show in the first three seconds than about flashy technique. A video people stay with is the one that delivers the message.", "브랜드가 어디에 놓이든 같은 얼굴로": "One face for your brand, wherever it appears", "기획부터 디자인, 인쇄 감리까지 디자인팀이 직접 맡습니다.": "Our design team handles everything from planning and design to print supervision.", "제작 품목": "What we make", "회사소개서·브로슈어": "Company profiles & brochures", "기획부터 디자인·인쇄까지": "From planning to design and print", "홍보물·리플렛": "Promotional materials & leaflets", "팜플렛·전단·카드형 홍보물": "Pamphlets, flyers and card-type promotions", "이용 안내·사용 설명서·교육 자료": "User guides, manuals and training materials", "카탈로그·제품소개서": "Catalogs & product sheets", "다품목 정리형 인쇄물": "Multi-product printed catalogs", "포스터·배너·현수막": "Posters, banners & signage", "실내외 게시물·대형 출력물": "Indoor and outdoor displays, large-format prints", "부스 그래픽·사인물": "Booth graphics and signage", "화면 안과 밖을 한 팀이": "One team, on screen and off", "앱과 웹의 인터페이스를 설계하다가, 같은 날 브로슈어의 종이 질감을 고르기도 합니다. 디지털과 인쇄를 한 팀에서 다루기 때문에, 브랜드가 어디에 놓이든 같은 얼굴을 유지할 수 있습니다.": "We may design an app interface and pick brochure paper on the same day. Because one team handles both digital and print, your brand keeps the same face wherever it appears.", "진행 방식": "How it works", "기획·자료 정리": "Brief & materials", "목적과 대상, 들어갈 내용을 함께 정리합니다.": "We define the goal, audience and content together.", "디자인 시안": "Design draft", "방향이 다른 시안으로 선택지를 드립니다.": "We offer drafts in different directions.", "수정·확정": "Refine", "피드백을 반영해 최종안을 확정합니다.": "We apply feedback and finalize the design.", "인쇄 감리": "Print supervision", "종이와 색을 현장에서 직접 확인합니다.": "We check paper and color on site.", "납품": "Delivery", "인쇄물과 원본 파일을 함께 전달합니다.": "We deliver the prints together with source files.", "여섯 단계로, 끝까지 함께합니다": "Six steps, with you to the end", "기획부터 오픈 이후 운영까지, 단계마다 확인하고 다음으로 넘어갑니다.": "From planning to operation after launch, we confirm each step before moving on.", "목표와 요구사항을 함께 정리하고, 범위와 일정을 제안합니다.": "We define goals and requirements together and propose scope and schedule.", "요구사항 정리 · 일정·범위 제안": "Requirements · schedule & scope", "화면 설계서 · 데이터 구조": "Screen specs · data structure", "사용자가 헤매지 않는 화면을 만듭니다.": "We design screens no one gets lost in.", "UI 시안 · 디자인 가이드": "UI drafts · design guide", "개발 서버 · 중간 시연": "Dev server · interim demo", "만든 팀이 직접 품질을 확인합니다.": "The team that built it checks the quality.", "테스트 결과 · 수정 반영": "Test results · fixes applied", "오픈 후에도 운영과 개선을 이어갑니다.": "We keep operating and improving after launch.", "운영 안내 · 유지보수": "Operation guide · maintenance", "결과물": "Deliverables", "단계별로 이렇게 진행합니다": "Step by step", "함께 일하는 방식": "Working together", "처음부터 끝까지 한 팀": "One team throughout", "다섯 개 조직이 하나의 프로젝트를 함께 맡습니다.": "Five units take on each project together.", "단계마다 확인": "Confirm every step", "각 단계의 결과물을 함께 확인한 뒤 다음 단계로 넘어갑니다.": "We review each step's deliverables with you before moving on.", "오픈 이후까지": "Beyond launch", "운영과 유지보수, 기능 고도화까지 이어갑니다.": "We continue with operation, maintenance and improvements.", "‹ 이전": "‹ Previous", "다음 ›": "Next ›", "흩어진 데이터를 통합하여 업무 효율을 극대화하고,": "We integrate scattered data to maximize efficiency,", "맞춤형 AI 도입으로 소요 시간을 획기적으로 단축시켜 드립니다.": "and cut the time your work takes with AI tailored to you.", "이름에 담은 세 가지 의미": "Three meanings in our name", "나그마의 3가지 슬로건": "NAGMA's three slogans", "연혁 및 고객사": "History & Clients", "문의 내용 전송": "Send inquiry", "작성 후 전송을 누르시면 rock@nagma.co.kr로 보낼 메일이 바로 열립니다. 영업일 기준 1~2일 안에 답변드립니다.": "Press send and an email to rock@nagma.co.kr opens, ready to go. We reply within 1–2 business days.", "나그마는 AI를 활용한 IT 솔루션 개발과 기업 데이터 통합을 전문으로 합니다.": "NAGMA specializes in AI-powered IT solution development and enterprise data integration.", "데이터 통합부터 AI 서비스 운영까지 직접 구현합니다.": "We build everything in-house, from data integration to running AI services."};
  const HG=/[가-힣]/, ATTRS=['placeholder','aria-label','alt','data-copy'];
  function trText(n){
    if(n.__ko===undefined){if(!HG.test(n.nodeValue))return;n.__ko=n.nodeValue}
    const o=n.__ko,k=o.trim();
    n.nodeValue=(lang==='en'&&(k in DICT))?o.replace(k,()=>DICT[k]):o;
  }
  function trEl(el){
    ATTRS.forEach(a=>{if(!el.hasAttribute(a))return;el.__ka=el.__ka||{};
      if(!(a in el.__ka)){const v=el.getAttribute(a);if(!HG.test(v))return;el.__ka[a]=v}
      const o=el.__ka[a];el.setAttribute(a,(lang==='en'&&(o in DICT))?DICT[o]:o)});
  }
  function applyLang(root){
    root=root||document.body;
    if(root.nodeType===3){trText(root);return}
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>/^(SCRIPT|STYLE)$/.test(n.parentNode&&n.parentNode.nodeName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
    let n;while((n=w.nextNode()))trText(n);
    if(root.nodeType===1){trEl(root);root.querySelectorAll('[placeholder],[aria-label],[alt],[data-copy]').forEach(trEl)}
  }
  new MutationObserver(ms=>{ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===3||n.nodeType===1)applyLang(n)}))}).observe(document.body,{childList:true,subtree:true});
  function setLang(l){
    lang=l==='en'?'en':'ko';
    try{localStorage.setItem('nagma-lang',lang)}catch(_){}
    document.documentElement.lang=lang;
    document.title=lang==='en'?(document.body.dataset.titleEn||'NAGMA | AI IT Solutions & Data Integration'):TITLE_KO;
    applyLang(document.body);
    document.querySelectorAll('[data-lang]').forEach(b=>{b.classList.toggle('on',b.dataset.lang===lang);b.setAttribute('aria-pressed',b.dataset.lang===lang)});
  }
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
  setLang(lang);
  show();
  if(reduce){frame(0);magmas.forEach(m=>drawMagma(m,0))}else requestAnimationFrame(loop);
})();
