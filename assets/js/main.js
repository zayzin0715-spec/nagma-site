/* NAGMA — 공통 스크립트 */
(() => {
  'use strict';

  /* ---------- 헤더 축소 ---------- */
  const hdr = document.querySelector('.hdr');
  const onScroll = () => hdr && hdr.classList.toggle('small', window.scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- 현재 페이지 표시 ---------- */
  const here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.gnb a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('on');
  });

  /* ---------- 메뉴 오버레이 (모바일) ---------- */
  const nav = document.querySelector('.nav');
  document.querySelector('.menu-btn')?.addEventListener('click', () => {
    nav.classList.add('open'); document.body.style.overflow = 'hidden';
  });
  const close = () => { nav.classList.remove('open'); document.body.style.overflow = ''; };
  document.querySelector('.nav__close')?.addEventListener('click', close);
  addEventListener('keydown', e => e.key === 'Escape' && close());

  /* ---------- 스크롤 리빌 ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const d = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
      setTimeout(() => el.classList.add('in'), d * 1000);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.rv, .fu, .proc__i').forEach((el, i) => {
    if (!el.dataset.delay) {
      const sibs = el.parentElement?.querySelectorAll(':scope > .rv, :scope > .fu');
      if (sibs && sibs.length > 1) el.dataset.delay = ([...sibs].indexOf(el) * 0.08).toFixed(2);
    }
    io.observe(el);
  });

  /* ---------- 마퀴 내용 복제 ---------- */
  document.querySelectorAll('.marquee__in').forEach(m => m.innerHTML += m.innerHTML);

  /* ---------- 부드러운 앵커 ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault(); close();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ============================================
     CODE-01 · 마그마 그라데이션
     화면 하단에서 붉은 기운이 느리게 번짐
     ============================================ */
  const magma = (cv) => {
    const ctx = cv.getContext('2d');
    let w, h, t = 0, raf;
    const N = 6, blobs = [];
    for (let i = 0; i < N; i++) blobs.push({
      x: (i + .5) / N, sp: .00006 + Math.random() * .0001,
      amp: .06 + Math.random() * .1, r: .18 + Math.random() * .16, ph: Math.random() * 6.28
    });
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      blobs.forEach((b, i) => {
        const x = (b.x + Math.sin(t * b.sp * 60 + b.ph) * .09) * w;
        const y = h * (1.12 - Math.abs(Math.sin(t * b.sp * 34 + b.ph)) * b.amp);
        const r = b.r * Math.max(w, h) * 1.1;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const c = i % 2 ? '232,52,28' : '255,106,0';
        g.addColorStop(0, `rgba(${c},.20)`);
        g.addColorStop(.4, `rgba(${c},.07)`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    size(); addEventListener('resize', size); draw();
    return () => cancelAnimationFrame(raf);
  };
  document.querySelectorAll('[data-cg="magma"]').forEach(magma);

  /* 공통 유틸 */
  const setup = (cv) => {
    const ctx = cv.getContext('2d');
    const st = { w: 0, h: 0, S: 0 };
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      st.w = cv.clientWidth; st.h = cv.clientHeight; st.S = Math.min(st.w, st.h);
      cv.width = st.w * dpr; cv.height = st.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size(); addEventListener('resize', size);
    return [ctx, st];
  };
  const magmaFill = (ctx, x0, y0, x1, y1) => {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, '#E8341C'); g.addColorStop(1, '#FF6A00');
    return g;
  };
  const INK = '#2E2E2E';    // 선 · 테두리 · 작은 디테일
  const FILL = '#585858';   // 넓은 면 (순검정은 흰 배경에서 너무 무거움)


  /* ============================================
     CODE-02 · 동심 등고선 (원형)
     ============================================ */
  document.querySelectorAll('[data-cg="core"]').forEach(cv => {
    const [ctx, st] = setup(cv);
    let t = 0;
    const L = 18;
    const draw = () => {
      t += .0016;
      const { w, h, S } = st;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, R = S * .455;
      for (let i = 0; i < L; i++) {
        const f = (i + 1) / L;
        const base = R * f;
        const amp = R * .070 * (1 - f * .35);
        ctx.beginPath();
        for (let a = 0; a <= 6.2832 + .06; a += .06) {
          const d = base
            + amp * Math.sin(3 * a + t * 1.6 + i * .26)
            + amp * .62 * Math.sin(5 * a - t * 1.1 + i * .17)
            + amp * .34 * Math.sin(8 * a + t * .8 - i * .11);
          const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        const near = 1 - Math.abs(f - .55) / .55;
        ctx.strokeStyle = `rgba(166,58,44,${.16 + near * .42})`;
        ctx.lineWidth = i % 5 === 0 ? 2.1 : 1.3;
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    };
    draw();
  });

  /* ============================================
     CODE-07 · 지형 등고선 (와이드)
     ============================================ */
  document.querySelectorAll('[data-cg="crust"]').forEach(cv => {
    const [ctx, st] = setup(cv);
    let t = 0;
    const L = 20;
    const draw = () => {
      t += .0018;
      const { w, h } = st;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < L; i++) {
        const f = i / (L - 1);
        const baseY = h * (.06 + f * .88);
        const amp = h * .115 * Math.sin(Math.PI * f);
        ctx.beginPath();
        for (let x = 0; x <= w + 8; x += 8) {
          const u = x / w;
          const y = baseY
            + amp * Math.sin(u * 6.1 + t * 1.5 + i * .34)
            + amp * .58 * Math.sin(u * 11.3 - t * 1.0 + i * .21)
            + amp * .30 * Math.sin(u * 19.7 + t * .7 - i * .13);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const near = 1 - Math.abs(f - .5) / .5;
        ctx.strokeStyle = `rgba(166,58,44,${.15 + near * .40})`;
        ctx.lineWidth = i % 5 === 0 ? 2.1 : 1.3;
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    };
    draw();
  });

  /* ============================================
     CODE-03 · IT SOLUTION — 회로 기판
     중앙 칩에서 직각 트레이스가 뻗고 신호가 흐름
     ============================================ */
  const TRACES = [
    [[.37, .41], [.24, .41], [.24, .17], [.12, .17]],
    [[.37, .50], [.15, .50]],
    [[.37, .59], [.26, .59], [.26, .83], [.14, .83]],
    [[.63, .41], [.76, .41], [.76, .19], [.88, .19]],
    [[.63, .50], [.85, .50]],
    [[.63, .59], [.74, .59], [.74, .81], [.87, .81]],
    [[.41, .37], [.41, .21], [.27, .21]],
    [[.50, .37], [.50, .12]],
    [[.59, .37], [.59, .24], [.73, .24]],
    [[.41, .63], [.41, .79], [.29, .79]],
    [[.50, .63], [.50, .89]],
    [[.59, .63], [.59, .76], [.71, .76]]
  ];
  const polyPoint = (pts, p) => {
    let tot = 0; const seg = [];
    for (let i = 1; i < pts.length; i++) {
      const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      seg.push(d); tot += d;
    }
    let target = p * tot;
    for (let i = 0; i < seg.length; i++) {
      if (target <= seg[i]) {
        const f = seg[i] ? target / seg[i] : 0;
        return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f,
                pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f];
      }
      target -= seg[i];
    }
    return pts[pts.length - 1];
  };
  document.querySelectorAll('[data-cg="flow"]').forEach(cv => {
    const [ctx, st] = setup(cv);
    const pulses = TRACES.map((_, i) => ({ i, p: (i * 0.137) % 1, sp: .0026 + (i % 4) * .0007 }));
    const draw = () => {
      const { w, h, S } = st;
      const X = v => v * w, Y = v => v * h;
      ctx.clearRect(0, 0, w, h);

      // 배경 도트 그리드
      const gap = S * .042;
      ctx.fillStyle = 'rgba(46,46,46,.09)';
      for (let x = gap; x < w; x += gap)
        for (let y = gap; y < h; y += gap) { ctx.beginPath(); ctx.arc(x, y, .9, 0, 6.2832); ctx.fill(); }

      // 트레이스
      ctx.lineCap = 'square'; ctx.lineJoin = 'miter';
      ctx.strokeStyle = 'rgba(46,46,46,.30)';
      ctx.lineWidth = Math.max(1.4, S * .0055);
      TRACES.forEach(tr => {
        ctx.beginPath(); ctx.moveTo(X(tr[0][0]), Y(tr[0][1]));
        for (let i = 1; i < tr.length; i++) ctx.lineTo(X(tr[i][0]), Y(tr[i][1]));
        ctx.stroke();
      });

      // 패드 (트레이스 끝)
      const pad = Math.max(4, S * .017);
      TRACES.forEach(tr => {
        const e = tr[tr.length - 1];
        ctx.fillStyle = '#fff'; ctx.fillRect(X(e[0]) - pad, Y(e[1]) - pad, pad * 2, pad * 2);
        ctx.strokeStyle = INK; ctx.lineWidth = Math.max(1.4, S * .006);
        ctx.strokeRect(X(e[0]) - pad, Y(e[1]) - pad, pad * 2, pad * 2);
      });

      // 흐르는 신호
      pulses.forEach(pu => {
        pu.p += pu.sp; if (pu.p > 1.18) pu.p = -.06;
        const q = Math.max(0, Math.min(1, pu.p));
        const [px, py] = polyPoint(TRACES[pu.i], q);
        const r = Math.max(2.4, S * .0105);
        ctx.fillStyle = INK;
        ctx.beginPath(); ctx.arc(X(px), Y(py), r, 0, 6.2832); ctx.fill();
        const [tx, ty] = polyPoint(TRACES[pu.i], Math.max(0, q - .07));
        ctx.strokeStyle = 'rgba(46,46,46,.32)'; ctx.lineWidth = r * 1.1; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(X(tx), Y(ty)); ctx.lineTo(X(px), Y(py)); ctx.stroke();
        ctx.lineCap = 'square';
      });

      // 중앙 칩
      const c = S * .135, cx = w / 2, cy = h / 2;
      ctx.fillStyle = '#fff'; ctx.fillRect(cx - c, cy - c, c * 2, c * 2);
      ctx.strokeStyle = INK; ctx.lineWidth = Math.max(2.2, S * .009);
      ctx.strokeRect(cx - c, cy - c, c * 2, c * 2);
      ctx.strokeStyle = 'rgba(10,10,10,.16)'; ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(cx - c + (c * 2 / 4) * i, cy - c); ctx.lineTo(cx - c + (c * 2 / 4) * i, cy + c); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx - c, cy - c + (c * 2 / 4) * i); ctx.lineTo(cx + c, cy - c + (c * 2 / 4) * i); ctx.stroke();
      }
      ctx.fillStyle = FILL;
      ctx.fillRect(cx - c * .30, cy - c * .30, c * .60, c * .60);
      requestAnimationFrame(draw);
    };
    draw();
  });

  /* ============================================
     CODE-04 · VIDEO — 프레임 스택 + 타임라인
     ============================================ */
  document.querySelectorAll('[data-cg="frame"]').forEach(cv => {
    const [ctx, st] = setup(cv);
    let t = 0;
    const draw = () => {
      t += .0055;
      const { w, h, S } = st;
      ctx.clearRect(0, 0, w, h);
      const bw = S * .60, bh = bw * 9 / 16;
      const cx = w / 2, cy = h / 2 - S * .04, step = S * .050;
      for (let i = 4; i >= 0; i--) {
        const k = (Math.sin(t + i * .5) + 1) / 2;
        const off = (i - 1) * step + k * S * .010;
        const x = cx - off * .78, y = cy - off * .62, front = i === 0;
        ctx.save(); ctx.translate(x, y);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = 'rgba(10,10,10,.12)'; ctx.shadowBlur = 15; ctx.shadowOffsetY = 4;
        ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = front ? Math.max(2.2, S * .009) : 1.2;
        ctx.strokeStyle = front ? INK : 'rgba(10,10,10,.22)';
        ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
        if (front) {
          ctx.strokeStyle = 'rgba(10,10,10,.07)'; ctx.lineWidth = 1;
          for (let s = 1; s < 9; s++) {
            const yy = -bh / 2 + (bh / 9) * s;
            ctx.beginPath(); ctx.moveTo(-bw / 2, yy); ctx.lineTo(bw / 2, yy); ctx.stroke();
          }
          const s = S * .055;
          ctx.fillStyle = FILL;
          ctx.beginPath();
          ctx.moveTo(-s * .34, -s * .56); ctx.lineTo(s * .62, 0); ctx.lineTo(-s * .34, s * .56);
          ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      }
      // 타임라인
      const barW = bw * .98, bx = cx - barW / 2 - step * .78, by = cy + bh / 2 + S * .12;
      ctx.strokeStyle = 'rgba(10,10,10,.20)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + barW, by); ctx.stroke();
      for (let i = 0; i <= 16; i++) {
        const x = bx + (barW / 16) * i, big = i % 4 === 0;
        ctx.strokeStyle = `rgba(10,10,10,${big ? .42 : .18})`;
        ctx.beginPath(); ctx.moveTo(x, by); ctx.lineTo(x, by + (big ? S * .034 : S * .018)); ctx.stroke();
      }
      const prog = (t * .36) % 1;
      ctx.strokeStyle = INK; ctx.lineWidth = Math.max(2, S * .008);
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + barW * prog, by); ctx.stroke();
      ctx.fillStyle = INK;
      ctx.fillRect(bx + barW * prog - 1, by - S * .028, 2, S * .056);
      requestAnimationFrame(draw);
    };
    draw();
  });

  /* ============================================
     CODE-05 · BRAND DESIGN — 지면 펼침 + 그리드
     ============================================ */
  document.querySelectorAll('[data-cg="paper"]').forEach(cv => {
    const [ctx, st] = setup(cv);
    let t = 0;
    const draw = () => {
      t += .0045;
      const { w, h, S } = st;
      ctx.clearRect(0, 0, w, h);
      const pw = S * .40, ph = pw * 1.36;
      const cx = w / 2, cy = h / 2 + S * .02;
      const spread = .13 + Math.sin(t) * .04;
      for (let i = 3; i >= 0; i--) {
        const rot = (i - 1.1) * spread;
        const dx = Math.sin(rot) * S * .12, dy = -Math.cos(rot) * S * .02;
        ctx.save(); ctx.translate(cx + dx, cy + dy); ctx.rotate(rot);
        ctx.shadowColor = 'rgba(10,10,10,.14)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
        ctx.fillStyle = '#fff'; ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = 1.2; ctx.strokeStyle = 'rgba(10,10,10,.18)';
        ctx.strokeRect(-pw / 2, -ph / 2, pw, ph);
        const m = pw * .13, iw = pw - m * 2, L = -pw / 2 + m, T = -ph / 2 + m;
        if (i === 0) {
          ctx.fillStyle = FILL; ctx.fillRect(L, T, iw, ph * .20);
          ctx.fillStyle = 'rgba(46,46,46,.62)'; ctx.fillRect(L, T + ph * .265, iw * .68, ph * .032);
          ctx.fillStyle = 'rgba(46,46,46,.20)';
          const colW = (iw - pw * .05) / 2;
          for (let c = 0; c < 2; c++)
            for (let r = 0; r < 5; r++)
              ctx.fillRect(L + c * (colW + pw * .05), T + ph * .375 + r * ph * .052,
                           colW * (r === 4 ? .6 : 1), ph * .022);
        } else {
          ctx.fillStyle = 'rgba(10,10,10,.12)'; ctx.fillRect(L, T, iw, ph * .19);
          ctx.fillStyle = 'rgba(10,10,10,.10)';
          for (let r = 0; r < 4; r++) ctx.fillRect(L, T + ph * .26 + r * ph * .06, iw * (r === 3 ? .6 : .95), ph * .024);
        }
        ctx.restore();
      }
      requestAnimationFrame(draw);
    };
    draw();
  });

  /* ============================================
     CODE-06 · 도트 매트릭스
     격자 위 점의 크기가 느린 파동으로 변함 — 추상, 무의미
     ============================================ */
  document.querySelectorAll('[data-cg="strata"]').forEach(cv => {
    const [ctx, st] = setup(cv);
    let t = 0;
    const draw = () => {
      t += .0072;
      const { w, h } = st;
      ctx.clearRect(0, 0, w, h);
      const gap = Math.max(13, Math.min(w, h) * .052);
      const cols = Math.floor(w / gap), rows = Math.floor(h / gap);
      const ox = (w - (cols - 1) * gap) / 2, oy = (h - (rows - 1) * gap) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ox + c * gap, y = oy + r * gap;
          const u = c / Math.max(1, cols - 1), v = r / Math.max(1, rows - 1);
          const wv =
            Math.sin(u * 4.2 + v * 2.1 + t) * .5 +
            Math.sin(u * 7.7 - v * 5.3 - t * .74) * .3 +
            Math.sin((u + v) * 9.1 + t * .52) * .2;
          const k = (wv + 1) / 2;                       // 0~1
          const rad = gap * (.08 + k * .30);
          ctx.fillStyle = `rgba(166,58,44,${.10 + k * .54})`;
          ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.2832); ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  });

})();
