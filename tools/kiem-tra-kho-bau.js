#!/usr/bin/env node
// Kiểm tra các màn của game Truy Tìm Kho Báu bằng tìm kiếm theo chiều rộng (BFS).
// Đọc luật chơi và màn chơi trực tiếp từ games/truy-tim-kho-bau/index.html, rồi in ra:
//   - số bước ít nhất để về đích
//   - số bước ít nhất để về đích mà nhặt đủ vàng (dùng làm giá trị `par` cho sao thứ 3)
// Cách dùng:  node tools/kiem-tra-kho-bau.js          (tất cả các màn)
//             node tools/kiem-tra-kho-bau.js 3,10     (chỉ màn 3 và 10)
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../games/truy-tim-kho-bau/index.html'), 'utf8');
const code = html.slice(html.indexOf('// ===== ENGINE START'), html.indexOf('// ===== LEVELS END'));
const { parseLevel, step, LEVELS } = new Function(code + '\nreturn { parseLevel, step, LEVELS };')();

const DIRS = ['up', 'down', 'left', 'right'];
const srt = a => a.slice().sort((x, y) => x - y).join(',');
const key = (s, coins) => [s.p, srt(s.boulders), srt(s.filled), srt(s.opened), s.keys, srt(s.keysOnMap),
  s.enemies.map(e => e.i + ':' + e.d).join(','), coins ? srt(s.coins) : ''].join('|');

function solve(L, needCoins) {
  const seen = new Set([key(L.start, needCoins)]);
  let frontier = [L.start], depth = 0;
  while (frontier.length) {
    const next = [];
    for (const s of frontier) for (const d of DIRS) {
      const n = step(L, s, d);
      if (!n || n.status === 'dead') continue;
      if (n.status === 'won') { if (!needCoins || !n.coins.length) return depth + 1; continue; }
      const k = key(n, needCoins);
      if (!seen.has(k)) { seen.add(k); next.push(n); }
    }
    frontier = next; depth++;
  }
  return -1;
}

const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
let ok = true;
LEVELS.forEach((lv, i) => {
  if (only && !only.includes(i + 1)) return;
  const L = parseLevel(lv);
  const win = solve(L, false), all = solve(L, true);
  const status = win < 0 ? '❌ KHÔNG GIẢI ĐƯỢC' : all < 0 ? '⚠️ không nhặt đủ vàng được' : all !== lv.par ? `⚠️ par nên là ${all}` : '✅';
  if (status !== '✅') ok = false;
  console.log(`${String(i + 1).padStart(2)}. ${lv.name.padEnd(22)} về đích ${String(win).padStart(3)} bước · đủ vàng ${String(all).padStart(3)} bước · par ${lv.par}  ${status}`);
});
process.exit(ok ? 0 : 1);
