/*
 * Danh sách game của trang.
 * Muốn thêm game mới: thêm một mục vào GAMES.
 *   status: 'live' = chơi được (cần có url), 'dev' = đang phát triển
 *   thumb:  ảnh đại diện (nếu không có sẽ dùng emoji + màu nền colors)
 *   badge:  'hot' | 'new' | ''
 */
window.SITE = {
  name: 'Chơi Vui',
  tagline: 'Game online miễn phí, chơi ngay trên trình duyệt',
};

window.CATEGORIES = [
  { id: 'dua-xe', name: 'Đua xe', icon: '🏎️' },
  { id: 'hanh-dong', name: 'Hành động', icon: '⚡' },
  { id: 'tri-tue', name: 'Trí tuệ', icon: '🧠' },
  { id: '2-nguoi', name: '2 người', icon: '👥' },
  { id: 'ban-sung', name: 'Bắn súng', icon: '🎯' },
  { id: 'the-thao', name: 'Thể thao', icon: '⚽' },
  { id: 'phieu-luu', name: 'Phiêu lưu', icon: '🗺️' },
  { id: 'co-dien', name: 'Cổ điển', icon: '🕹️' },
];

window.GAMES = [
  {
    id: 'dua-xe', title: 'Đua Xe Tốc Độ', cats: ['dua-xe', 'hanh-dong'],
    status: 'live', badge: 'hot', featured: true, added: '2026-10-09',
    url: 'games/dua-xe/index.html', landscape: true,
    thumb: 'assets/thumbs/dua-xe.jpg', hero: 'assets/thumbs/dua-xe-hero.jpg',
    desc: 'Cầm lái siêu xe trên đường đua 3D đầy khúc cua và đồi dốc. Vượt qua dòng xe cộ, giữ xe trên đường và bật nitro đúng lúc để hoàn thành 3 vòng đua nhanh nhất!',
    longDesc: 'Đường đua đi qua rừng dừa nhiệt đới, rừng cây xanh và vùng núi thông. Vào cua quá nhanh xe sẽ bị văng ra ngoài, đâm vào xe khác hay cây cối sẽ bị giảm tốc. Thời gian tốt nhất của bạn được lưu lại làm kỷ lục.',
    controls: [
      ['↑ / W', 'Tăng ga'], ['↓ / S', 'Phanh'], ['← / →', 'Đánh lái'],
      ['Space', 'Bật nitro'], ['P', 'Tạm dừng'], ['M', 'Tắt/bật âm thanh'],
    ],
  },
  { id: 'dua-moto', title: 'Đua Moto Địa Hình', cats: ['dua-xe', 'the-thao'], status: 'dev', badge: 'new', added: '2026-10-08',
    emoji: '🏍️', colors: ['#ff7a18', '#af002d'], desc: 'Phóng moto qua đồi cát, dốc đá và những cú nhảy nghẹt thở mà không bị lật xe.' },
  { id: 'drift-pho', title: 'Drift Đường Phố', cats: ['dua-xe'], status: 'dev', badge: '', added: '2026-09-20',
    emoji: '🚗', colors: ['#3a6186', '#89253e'], desc: 'Ôm cua drift thật ngọt qua các con phố đêm để ghi điểm thật cao.' },
  {
    id: 'ran-san-moi', title: 'Rắn Săn Mồi', cats: ['co-dien'], status: 'live', badge: 'hot', added: '2026-10-09',
    url: 'games/ran-san-moi/index.html', thumb: 'assets/thumbs/ran-san-moi.jpg',
    emoji: '🐍', colors: ['#1fa64a', '#0b4d2a'],
    desc: 'Điều khiển chú rắn ăn táo để dài ra, nhưng đừng cắn vào chính đuôi mình! Trò chơi cổ điển, đơn giản mà cực kỳ gây nghiện.',
    longDesc: 'Có 3 độ khó (Dễ, Thường, Khó) và 2 chế độ: Có tường (đâm tường là thua) hoặc Xuyên tường (đi ra mép này sẽ hiện ở mép kia). Cứ 5 quả táo, một ngôi sao vàng sẽ xuất hiện trong thời gian ngắn, ăn được sẽ được +50 điểm. Rắn càng dài càng chạy nhanh hơn.',
    controls: [['↑ / ↓ / ← / →', 'Đổi hướng'], ['W / A / S / D', 'Đổi hướng'], ['Vuốt', 'Đổi hướng (điện thoại)'], ['P', 'Tạm dừng'], ['M', 'Tắt/bật âm thanh']],
  },
  { id: 'xep-gach', title: 'Xếp Gạch', cats: ['co-dien', 'tri-tue'], status: 'dev', badge: 'hot', added: '2026-09-12',
    emoji: '🧱', colors: ['#7b2ff7', '#2b1a7a'], desc: 'Xoay và xếp các khối gạch rơi xuống để lấp đầy hàng ngang và ghi điểm.' },
  {
    id: '2048', title: '2048', cats: ['tri-tue'], status: 'live', badge: 'new', added: '2026-10-09',
    url: 'games/2048/index.html', thumb: 'assets/thumbs/2048.jpg',
    emoji: '🔢', colors: ['#f7b733', '#fc4a1a'],
    desc: 'Trượt các ô số, ghép hai ô giống nhau thành một để tạo ra ô 2048 huyền thoại. Đơn giản, dễ chơi nhưng cực kỳ gây nghiện!',
    longDesc: 'Có 4 cỡ bàn: 3×3 (rất khó), 4×4 (chuẩn), 5×5 và 6×6 (chơi được lâu). Mỗi ván được đi lại 3 lần. Ván đang chơi được tự lưu, tắt trình duyệt mở lại vẫn chơi tiếp được. Đạt 2048 rồi vẫn có thể chơi tiếp để chinh phục 4096, 8192...',
    controls: [['↑ / ↓ / ← / →', 'Dồn các ô'], ['W / A / S / D', 'Dồn các ô'], ['Vuốt', 'Dồn các ô (điện thoại)'], ['U', 'Đi lại'], ['N', 'Ván mới'], ['M', 'Tắt/bật âm thanh']],
  },
  {
    id: 'co-caro', title: 'Cờ Caro', cats: ['2-nguoi', 'tri-tue'], status: 'live', badge: 'hot', added: '2026-10-09',
    url: 'games/co-caro/index.html', thumb: 'assets/thumbs/co-caro.jpg',
    emoji: '⭕', colors: ['#00b4db', '#0052a3'],
    desc: 'Xếp đủ 5 quân liên tiếp theo hàng ngang, dọc hoặc chéo trước đối thủ. Đấu trí với máy ở 4 độ khó, từ Dễ đến 👑 Huyền thoại, hoặc chơi 2 người cùng bạn bè.',
    longDesc: 'Bàn cờ 15×15 kiểu giấy kẻ ô quen thuộc. Máy ở mức Khó biết tạo thế đôi ba, bốn ba và tìm chuỗi thế 4 liên tục để dồn bạn vào thế thua. Mức Huyền thoại tính trước cả chuỗi đe dọa bằng thế 3, phát hiện và phá đòn của bạn từ rất sớm, lại biết đi nước gài bẫy. Có thể chọn luật Tự do hoặc Chặn 2 đầu (dãy 5 bị chặn cả hai đầu không tính thắng), chọn ai đi trước, đi lại nước cờ và xin gợi ý khi bí.',
    controls: [['Chuột / Chạm', 'Đánh quân (chạm 2 lần trên điện thoại)'], ['U', 'Đi lại'], ['H', 'Gợi ý nước đi'], ['N', 'Ván mới'], ['M', 'Tắt/bật âm thanh']],
  },
  { id: 'co-tuong', title: 'Cờ Tướng', cats: ['2-nguoi', 'tri-tue'], status: 'dev', badge: '', added: '2026-08-20',
    emoji: '♟️', colors: ['#c0392b', '#6d1a12'], desc: 'Môn cờ trí tuệ kinh điển: dàn quân, chiếu tướng và giành chiến thắng.' },
  { id: 'chim-bay', title: 'Chim Bay Vượt Ống', cats: ['hanh-dong'], status: 'dev', badge: 'new', added: '2026-10-05',
    emoji: '🐤', colors: ['#4fc3f7', '#1976d2'], desc: 'Chạm để chú chim vỗ cánh bay qua các khe ống. Đơn giản mà cực kỳ gây nghiện!' },
  {
    id: 'ban-may-bay', title: 'Bắn Máy Bay', cats: ['ban-sung', 'hanh-dong'], status: 'live', badge: 'hot', added: '2026-10-09',
    url: 'games/ban-may-bay/index.html', thumb: 'assets/thumbs/ban-may-bay.jpg',
    emoji: '✈️', colors: ['#141e30', '#3f5a8a'],
    desc: 'Lái chiến đấu cơ, né làn đạn dày đặc, tiêu diệt cả phi đội địch và hạ gục những tên trùm khổng lồ trên bầu trời!',
    longDesc: 'Máy bay tự động bắn, bạn chỉ cần di chuyển và né đạn. Nhặt vật phẩm để nâng súng lên 5 cấp (đến cấp 4 có thêm tên lửa tự tìm mục tiêu), bật khiên, thêm bom và thêm mạng. Cứ sau 4 đợt sẽ có một tên trùm, máu càng thấp nó bắn càng dữ. Hạ liên tiếp nhiều máy bay để nhân điểm combo.',
    controls: [['Chuột', 'Di chuyển máy bay'], ['↑ / ↓ / ← / →', 'Di chuyển'], ['W / A / S / D', 'Di chuyển'], ['Kéo ngón tay', 'Di chuyển (điện thoại)'], ['Space / B', 'Thả bom'], ['P', 'Tạm dừng'], ['M', 'Tắt/bật âm thanh']],
  },
  { id: 'do-min', title: 'Dò Mìn', cats: ['tri-tue', 'co-dien'], status: 'dev', badge: '', added: '2026-08-10',
    emoji: '💣', colors: ['#5f6c7b', '#232b36'], desc: 'Dựa vào các con số để suy luận và mở hết các ô không có mìn.' },
  { id: 'sudoku', title: 'Sudoku', cats: ['tri-tue'], status: 'dev', badge: '', added: '2026-08-05',
    emoji: '✏️', colors: ['#43cea2', '#185a9d'], desc: 'Điền số từ 1 đến 9 sao cho mỗi hàng, cột và ô vuông đều không trùng lặp.' },
  {
    id: 'sut-penalty', title: 'Sút Penalty', cats: ['the-thao'], status: 'live', badge: 'new', added: '2026-10-09',
    url: 'games/sut-penalty/index.html', landscape: true, thumb: 'assets/thumbs/sut-penalty.jpg',
    emoji: '⚽', colors: ['#56ab2f', '#1e5e1a'],
    desc: 'Đấu loạt sút luân lưu 5 lượt với máy: căn góc, lấy lực sút tung lưới thủ môn, rồi đổi vai bay người cản phá cú sút của đối thủ!',
    longDesc: 'Khi sút: chọn điểm trong khung thành rồi dừng thanh lực đúng lúc. Sút càng mạnh bóng càng nhanh nhưng dễ lệch hướng hoặc vọt xà. Khi bắt gôn: đoán hướng và bay người thật nhanh. Hòa sau 5 lượt sẽ đá luân lưu cân não đến khi phân thắng bại. Có 3 độ khó và lưu thành tích thắng/thua.',
    controls: [['Chuột / Chạm', 'Ngắm và sút'], ['↑ / ↓ / ← / →', 'Ngắm hoặc bay người'], ['Space', 'Chọn điểm / Dừng lực'], ['P', 'Tạm dừng'], ['M', 'Tắt/bật âm thanh']],
  },
  { id: 'nem-bong-ro', title: 'Ném Bóng Rổ', cats: ['the-thao'], status: 'dev', badge: '', added: '2026-07-30',
    emoji: '🏀', colors: ['#f12711', '#8a2b06'], desc: 'Canh lực ném thật chuẩn để bóng vào rổ liên tục và lập kỷ lục.' },
  { id: 'ban-bong-mau', title: 'Bắn Bóng Màu', cats: ['co-dien', 'tri-tue'], status: 'dev', badge: '', added: '2026-07-22',
    emoji: '🔮', colors: ['#da22ff', '#5a0fa8'], desc: 'Bắn bóng để ghép 3 quả cùng màu và dọn sạch bảng trước khi bóng tràn xuống.' },
  { id: 'noi-thu', title: 'Nối Thú', cats: ['tri-tue', 'co-dien'], status: 'dev', badge: 'hot', added: '2026-07-15',
    emoji: '🐼', colors: ['#ff9a9e', '#c2185b'], desc: 'Tìm và nối các cặp thú giống nhau bằng đường nối không quá 3 đoạn thẳng.' },
  { id: 'ninja', title: 'Ninja Vượt Ải', cats: ['phieu-luu', 'hanh-dong'], status: 'dev', badge: 'new', added: '2026-10-01',
    emoji: '🥷', colors: ['#232526', '#5b3b8c'], desc: 'Nhảy tường, né bẫy và vượt qua hàng loạt màn chơi đầy thử thách.' },
  { id: 'dap-chuot', title: 'Đập Chuột', cats: ['hanh-dong'], status: 'dev', badge: '', added: '2026-07-01',
    emoji: '🐭', colors: ['#c79081', '#7a4a3a'], desc: 'Nhanh tay đập những chú chuột tinh nghịch vừa thò đầu lên khỏi hang.' },
  { id: 'dau-cung', title: 'Đấu Cung 2 Người', cats: ['ban-sung', '2-nguoi'], status: 'dev', badge: '', added: '2026-06-20',
    emoji: '🏹', colors: ['#8e9eab', '#3b4a5a'], desc: 'Canh góc và lực bắn tên hạ gục đối thủ. Chơi chung một máy cùng bạn bè.' },
  {
    id: 'truy-tim-kho-bau', title: 'Truy Tìm Kho Báu', cats: ['phieu-luu', 'tri-tue'], status: 'live', badge: 'new', added: '2026-10-09',
    url: 'games/truy-tim-kho-bau/index.html', thumb: 'assets/thumbs/truy-tim-kho-bau.jpg',
    emoji: '💎', colors: ['#11998e', '#0a4f4a'],
    desc: 'Khám phá hòn đảo bí ẩn qua 10 màn giải đố: mở cửa bằng chìa khóa, đẩy đá làm cầu, bật công tắc mở cổng và né lũ cua để chạm tới rương kho báu!',
    longDesc: 'Mỗi bước bạn đi, lũ cua cũng bò một bước, nên phải tính toán thời điểm thật khéo. Đẩy tảng đá xuống nước để làm cầu, đẩy lên công tắc để mở cổng sắt. Mỗi màn có 3 sao: tìm thấy kho báu, nhặt đủ vàng và về đích trong số bước cho phép. Được đi lại thoải mái nếu lỡ bước sai, tiến độ được tự lưu.',
    controls: [['↑ / ↓ / ← / →', 'Di chuyển, đẩy đá'], ['W / A / S / D', 'Di chuyển'], ['Vuốt', 'Di chuyển (điện thoại)'], ['U / Z', 'Đi lại'], ['R', 'Chơi lại màn'], ['M', 'Tắt/bật âm thanh']],
  },
];
