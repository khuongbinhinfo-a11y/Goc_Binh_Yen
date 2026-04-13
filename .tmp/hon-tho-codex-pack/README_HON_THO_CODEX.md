# HỒN THƠ — GÓI BÀN GIAO CHO CODEX

## 1) Mục tiêu của lượt làm này
Codex cần tiếp tục đúng kế hoạch đã chốt cho website **Hồn Thơ**:

1. Chốt đổi brand theo hướng nghiêng mạnh hơn về **thơ**.
2. Hoàn thiện trang **/doc-tho** trước.
3. Dùng **10 bài thơ đầu** làm bộ dữ liệu khởi đầu.
4. Mỗi bài thơ phải có:
   - tên bài
   - nội dung bài thơ
   - tên tác giả đặt **dưới bài**
   - địa danh / ngày sáng tác nếu có
   - ảnh đại diện phù hợp
   - mục **Phân tích bài thơ**
5. Sau khi /doc-tho ổn mới nhân tiếp sang **/ke-chuyen**.

---

## 2) Tinh thần thương hiệu
- Brand hiển thị: **Hồn Thơ**
- Tone: nâu đất, kem đất, nâu gỗ, ánh chiều tà, sông nước, quê hương, ký ức
- Cảm giác: nhẹ, sâu, chậm, giàu hoài niệm
- Tránh tuyệt đối: vibe tech startup, lạnh, quá sắc cạnh, quá hiện đại kiểu SaaS

### Hero brand đề xuất
**Hồn Thơ**

*Nơi câu chữ và giọng đọc cất lên giữa sắc chiều quê hương.*

### Description rộng hơn để dùng ở các block khác
*Hồn Thơ là nơi những bài thơ, câu chuyện và xúc cảm nhẹ được kể lại bằng câu chữ, giọng đọc và hình ảnh mang hơi thở quê nhà.*

---

## 3) Điều hướng chính cần giữ thống nhất
Menu desktop / mobile cần đồng bộ theo tên mới:
- Trang chủ
- Đọc thơ
- Kể chuyện
- Tâm linh
- Liên hệ

Lưu ý:
- Đã bỏ label cũ “Góc chữa lành”
- Typography menu phải gọn, thoáng, giảm cảm giác lộn xộn
- Vẫn dùng **Be Vietnam Pro**, không đổi font toàn site lung tung

---

## 4) Phạm vi triển khai của trang /doc-tho
Tạo và hoàn thiện route **/doc-tho** theo hướng listing page.

### Cấu trúc /doc-tho
1. Hero nhỏ đầu trang
2. Intro ngắn
3. 1 bài nổi bật
4. Grid card bài thơ
5. Mỗi card dẫn vào trang chi tiết bài thơ

### Tone copy
- ưu tiên thơ
- giọng mềm, sâu, chậm
- không hô khẩu hiệu
- không viết kiểu quảng cáo

---

## 5) Cấu trúc chuẩn cho trang chi tiết một bài thơ
Mỗi bài chi tiết nên theo khung này:

1. Hero đầu bài
   - tên bài
   - mô tả ngắn 1–2 câu
   - ảnh đại diện

2. Nội dung bài thơ
   - trình bày thoáng
   - xuống dòng đúng nguyên bản
   - khoảng cách dòng dễ đọc

3. Metadata cuối bài
   - **Tác giả: Lê Dũng**
   - địa danh
   - ngày sáng tác

4. Phân tích bài thơ
   - Mạch cảm xúc
   - Hình ảnh nổi bật
   - Ý nghĩa / dư vị
   - Câu thơ đáng nhớ

5. Khối nghe / xem
   - có thể để placeholder nếu chưa có audio/video thật

6. Bài liên quan
   - 3 bài liên quan

---

## 6) Quy tắc bắt buộc cho block tác giả
Tên tác giả phải đặt **dưới bài**, không chen vào đầu bài.

Format gợi ý:

**Tác giả: Lê Dũng**  
*Cai Lậy, 01/01/2018*

hoặc:

**Tác giả: Lê Dũng**  
*Tân Phong, ngày 15/12/2018*

---

## 7) Danh sách bài thơ đã xác nhận từ ảnh người dùng
Hiện đã đọc rõ 9 bài:

1. Nhớ
2. Tiếng kêu chim lẻ bạn
3. Ngang bến sông xưa
4. Thèm
5. Khoảng cách vô hình
6. Hoa lục bình
7. Em - mùa xuân về
8. Em trong anh
9. Anh yêu em

### Trạng thái dữ liệu
- Đã chắc 9 bài trên
- Bài thứ 10: **chờ bổ sung thêm ảnh / nội dung**
- Codex cần thiết kế data structure theo kiểu có thể thêm bài thứ 10 ngay khi có dữ liệu mới

---

## 8) Hướng ảnh cho từng bài thơ
Mỗi bài cần 1 ảnh cover phù hợp tinh thần bài. Có thể nghiên cứu mood từ web và mạng xã hội công khai, nhưng không bê bừa ảnh không rõ quyền sử dụng vào site production.

### Quy tắc nguồn ảnh
- Pinterest / mạng xã hội công khai: dùng để **khảo sát mood / concept / bố cục / màu sắc**
- Ảnh đưa vào website thật nên ưu tiên:
  - ảnh tự chụp
  - ảnh được cấp phép rõ
  - stock hợp lệ
  - ảnh tự tạo sau khi đã chốt concept

### Từ khóa mood theo bài
#### 1. Nhớ
- bến sông chiều
- đường quê mờ nắng
- hoàng hôn miền Tây
- người chờ trong ký ức

#### 2. Tiếng kêu chim lẻ bạn
- trăng trên sông
- đêm cô tịch
- chim lẻ bóng
- nước trôi và ánh trăng

#### 3. Ngang bến sông xưa
- bến đò cũ
- sông quê
- lục bình trôi
- buổi chiều cũ miền sông nước

#### 4. Thèm
- con nước vỗ bờ
- đom đóm
- đêm trăng
- nỗi nhớ người thương

#### 5. Khoảng cách vô hình
- mưa đêm
- xa cách
- cửa sổ mờ nước
- cánh hoa rơi

#### 6. Hoa lục bình
- lục bình tím
- sông nước miền Tây
- chiều buông
- thuyền nhỏ trên sông

#### 7. Em - mùa xuân về
- mùa xuân quê nhà
- hoa nở
- nắng mới
- không khí Tết nhẹ

#### 8. Em trong anh
- hương hoa
- mềm dịu
- gần gũi
- mơ đêm

#### 9. Anh yêu em
- tình yêu chân chất
- thơ tình mộc
- ấm áp
- nhẹ nhàng

---

## 9) Phân tích bài thơ — guideline cho Codex
Mỗi bài phải có block **Phân tích bài thơ** theo kiểu ngắn, sâu, dễ đọc, không nặng giảng văn.

### Khung cố định
1. **Mạch cảm xúc**
2. **Hình ảnh nổi bật**
3. **Ý nghĩa / dư vị**
4. **Câu thơ đáng nhớ**

### Giọng viết
- không lên lớp
- không quá học thuật
- không dùng thuật ngữ văn học quá dày
- phải gần người đọc phổ thông
- ưu tiên chiều sâu cảm xúc hơn phô diễn phân tích

---

## 10) Nghiên cứu web và mạng xã hội cho phần ảnh / mood
Codex cần có cơ chế nghiên cứu web để tìm mood ảnh, bối cảnh và nguồn tham chiếu.

### Điều cần hiểu đúng
- `web_search` của Codex là công cụ web search tích hợp của OpenAI
- Không có bằng chứng chính thức rằng có thể đặt một cấu hình toàn cục kiểu “ép Codex dùng Google làm backend tìm kiếm”
- Vì vậy, nhu cầu “tìm trên Google và mạng xã hội” nên được triển khai bằng **2 lớp**:
  1. **Cấu hình kỹ thuật được hỗ trợ**: bật web search / internet access
  2. **Luật làm việc trong prompt và AGENTS.md**: yêu cầu Codex ưu tiên tìm tham chiếu từ Google-indexed pages và các nền tảng xã hội công khai

### Quy trình nghiên cứu đề xuất
Khi cần tìm ảnh / mood cho bài thơ, Codex làm theo thứ tự:

1. Tìm mood tổng quát bằng web search
2. Tìm thêm tham chiếu hình ảnh công khai từ:
   - Pinterest
   - YouTube
   - Facebook page công khai
   - Instagram web công khai
   - TikTok web công khai
3. Tách rõ 2 lớp kết quả:
   - **Mood reference**: ảnh / bài đăng / trang tham khảo
   - **Production candidate**: nguồn có thể dùng hợp lệ cho website
4. Ghi lại cho mỗi bài:
   - keyword đã dùng
   - link tham chiếu
   - lý do chọn mood đó
   - cảnh báo bản quyền nếu chỉ là nguồn tham khảo

### Kết quả đầu ra mong muốn
Với mỗi bài thơ, Codex nên trả về object kiểu:

```ts
{
  slug: "nho",
  title: "Nhớ",
  imageResearch: {
    moodKeywords: ["bến sông chiều", "hoàng hôn miền Tây", "nỗi nhớ quê"],
    referenceLinks: [
      "...",
      "..."
    ],
    recommendedScene: "Bến sông chiều vắng, gam nâu ấm, ánh sáng mềm, có khoảng trống cảm xúc.",
    licenseNote: "Các link Pinterest / MXH chỉ dùng làm mood reference, chưa phải ảnh production."
  }
}
```

---

## 11) Gợi ý allowlist domain cho Codex Cloud
Nếu dùng Codex Web / Cloud và muốn cho agent truy cập internet, nên bật allowlist có kiểm soát.

### Nhóm domain nên cân nhắc cho nhu cầu này
- google.com
- pinterest.com
- pinimg.com
- youtube.com
- facebook.com
- instagram.com
- tiktok.com
- unsplash.com
- pexels.com
- pixabay.com
- wikimedia.org

### HTTP methods nên giữ chặt
- GET
- HEAD
- OPTIONS

Không mở POST / PUT / PATCH / DELETE nếu không thật sự cần.

---

## 12) Định nghĩa hoàn thành (Definition of Done)
Một lượt làm được xem là **ĐẠT** khi:

1. Brand Hồn Thơ hiển thị đúng và nhất quán
2. Menu đã gọn, đẹp, đúng label mới
3. Route /doc-tho chạy ổn
4. Có listing page hoàn chỉnh
5. Có data structure cho 10 bài đầu
6. Ít nhất 1 bài chi tiết hoàn chỉnh end-to-end
7. Dưới bài có tên tác giả và metadata cuối bài
8. Có mục Phân tích bài thơ
9. Có field / cấu trúc nghiên cứu ảnh cho từng bài
10. Có note rõ về việc Pinterest / MXH chỉ là nguồn mood reference

---

## 13) Review format bắt buộc
Sau mỗi lượt, Codex phải tự review ngắn theo format:

- **ĐẠT** / **CHƯA ĐẠT**
- Nếu **CHƯA ĐẠT**: chỉ nêu lỗi chặn chính
- Nếu **ĐẠT**: nêu bước tiếp theo rõ ràng

Không lan man.

---

## 14) Prompt giao việc ngắn gọn cho Codex
```txt
Tiếp tục làm website Hồn Thơ theo đúng brief trong file này.

Ưu tiên lượt này:
1. Hoàn thiện route /doc-tho
2. Dùng 10 bài thơ đầu làm bộ dữ liệu khởi đầu (hiện đã chắc 9 bài, chừa chỗ để bổ sung bài thứ 10)
3. Tên tác giả phải đặt dưới bài
4. Mỗi bài phải có mục Phân tích bài thơ
5. Thiết kế cấu trúc imageResearch để Codex có thể nghiên cứu web / mạng xã hội công khai cho mood ảnh
6. Không dùng bừa ảnh Pinterest / MXH làm production asset
7. Review cuối theo format ĐẠT / CHƯA ĐẠT
```
