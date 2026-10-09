# gamevui

Website game vui: tổng hợp game online miễn phí, chơi ngay trên trình duyệt. Không cần cài đặt, không cần build, chỉ gồm HTML, CSS và JavaScript thuần.

## Game đã có

| Game | Thể loại | Điểm nổi bật |
|---|---|---|
| 🏎️ **Đua Xe Tốc Độ** | Đua xe | Đường đua 3D giả lập (kiểu OutRun) có khúc cua, đồi dốc, xe cộ, nitro, 3 vòng tính giờ |
| ⚽ **Sút Penalty** | Thể thao | Loạt sút luân lưu 5 lượt với máy, vừa sút vừa bắt gôn |
| 🐍 **Rắn Săn Mồi** | Cổ điển | 3 độ khó, chế độ có tường hoặc xuyên tường, sao thưởng |
| ⭕ **Cờ Caro** | Trí tuệ, 2 người | Đấu với máy 4 độ khó (đến 👑 Huyền thoại) hoặc 2 người chung máy, luật chặn 2 đầu |
| 🔢 **2048** | Trí tuệ | 4 cỡ bàn 3×3 đến 6×6, đi lại 3 lần, tự lưu ván đang chơi |
| ✈️ **Bắn Máy Bay** | Bắn súng, Hành động | 5 cấp vũ khí, 5 loại máy bay địch, trùm cuối sau mỗi 4 đợt, bom, khiên, combo |

Các game khác trong danh sách đang được phát triển. Bấm vào sẽ hiện thông báo "Đang phát triển".

## Chạy thử

Mở file `index.html` bằng trình duyệt là chơi được ngay.

Hoặc chạy một web server tĩnh bất kỳ:

```bash
npx serve .
# hoặc
python3 -m http.server 8000
```

Có thể đăng lên **GitHub Pages**: vào Settings → Pages → chọn nhánh `main`, thư mục `/ (root)`.

## Cấu trúc thư mục

```
index.html              Trang chủ: danh sách game, tìm kiếm, thể loại
game.html               Trang chơi game (game.html?id=<mã game>)
assets/
  games.js              Danh sách game, thể loại, tên trang
  app.js                Giao diện trang chủ và trang chơi game
  style.css             Giao diện chung
  thumbs/               Ảnh đại diện của game
games/
  dua-xe/index.html     Mỗi game là một file HTML độc lập
  sut-penalty/index.html
  ran-san-moi/index.html
  co-caro/index.html
  2048/index.html
  ban-may-bay/index.html
```

## Thêm game mới

1. Tạo thư mục `games/<mã-game>/` chứa file `index.html` của game.
2. Thêm ảnh đại diện vào `assets/thumbs/`.
3. Trong `assets/games.js`, thêm (hoặc sửa) mục của game: đặt `status: 'live'`, khai báo `url`, `thumb`, mô tả và bảng phím điều khiển.

Mỗi game nên có nút ⌂ về trang chủ, tự ẩn khi game được nhúng trong trang `game.html`.
