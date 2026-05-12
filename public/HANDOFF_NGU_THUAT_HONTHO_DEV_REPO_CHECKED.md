# HANDOFF DEV — BỔ SUNG NỘI DUNG NGŨ THUẬT / CỔ HỌC CHO HỒN THƠ — ĐÃ ĐỐI CHIẾU REPO

Repo đã đối chiếu:

```text
https://github.com/khuongbinhinfo-a11y/Goc_Binh_Yen.git
```

## 0. Kết luận sau khi xem repo

Repo hiện tại **đã có khung Cổ học**, không phải làm mới từ đầu.

Đang có route chính:

```text
src/app/huyen-mon-tham-khao
```

Trong đó đã có các nhánh:

```text
/huyen-mon-tham-khao
/huyen-mon-tham-khao/nhap-mon
/huyen-mon-tham-khao/ngu-thuat
/huyen-mon-tham-khao/tam-thuc
/huyen-mon-tham-khao/ung-dung-va-gioi-han
/huyen-mon-tham-khao/bai-viet
```

Riêng Ngũ thuật đã có đủ 5 trang:

```text
/huyen-mon-tham-khao/ngu-thuat/son
/huyen-mon-tham-khao/ngu-thuat/y
/huyen-mon-tham-khao/ngu-thuat/boc
/huyen-mon-tham-khao/ngu-thuat/menh
/huyen-mon-tham-khao/ngu-thuat/tuong
```

Vì vậy:

```text
KHÔNG tạo lại khung mới.
KHÔNG đổi route chính sang /cohoc trong lượt này.
KHÔNG phá route đang live.
KHÔNG làm app Tứ Trụ.
KHÔNG làm app Phong Thủy.
```

Nếu sau này cần `/cohoc/...`, chỉ làm alias/redirect sau khi có yêu cầu riêng.

---

## 1. File repo hiện có cần kiểm tra trước khi sửa

Dev phải kiểm tra các file này trước:

```text
src/app/huyen-mon-tham-khao/page.tsx
src/app/huyen-mon-tham-khao/layout.tsx

src/app/huyen-mon-tham-khao/ngu-thuat/page.tsx
src/app/huyen-mon-tham-khao/ngu-thuat/son/page.tsx
src/app/huyen-mon-tham-khao/ngu-thuat/y/page.tsx
src/app/huyen-mon-tham-khao/ngu-thuat/boc/page.tsx
src/app/huyen-mon-tham-khao/ngu-thuat/menh/page.tsx
src/app/huyen-mon-tham-khao/ngu-thuat/tuong/page.tsx

src/app/huyen-mon-tham-khao/bai-viet/page.tsx
src/app/huyen-mon-tham-khao/bai-viet/phase-1/page.tsx
src/app/huyen-mon-tham-khao/bai-viet/phase-2/page.tsx
src/app/huyen-mon-tham-khao/bai-viet/phase-3/page.tsx
src/app/huyen-mon-tham-khao/bai-viet/phase-4/page.tsx

src/data/coHocIntroArticles.ts
src/data/co-hoc-tracking.md
src/data/co-hoc-template.md
src/data/cloudImageManifest.ts
src/data/cloudAudioManifest.ts
```

Hiện trạng đã thấy:

```text
- /huyen-mon-tham-khao/page.tsx đã là hub Cổ học.
- /huyen-mon-tham-khao/ngu-thuat/page.tsx đã có 5 card Sơn/Y/Bốc/Mệnh/Tướng.
- 5 trang nhóm Ngũ thuật hiện là nội dung khung ngắn.
- /huyen-mon-tham-khao/bai-viet đã có phase tracking.
- src/data/coHocIntroArticles.ts hiện mới có 4 bài intro ngắn dạng title/slug/coverImage.
- src/data/co-hoc-tracking.md có kế hoạch phase, nhưng nhiều mục vẫn là draft/tracking.
```

---

## 2. Phạm vi làm lượt này

Mục tiêu lượt này:

```text
Bổ sung nội dung thật cho nhánh Cổ học / Ngũ thuật trên khung route hiện có.
```

Không làm:

```text
Không đổi route sang /cohoc.
Không tạo project app riêng.
Không làm app Tứ Trụ.
Không làm app Phong Thủy.
Không làm database.
Không làm AI realtime.
Không thêm toàn bộ 150 bài ngay.
Không push ảnh/audio binary vào git.
Không sửa nhánh /doc-tho, /ke-chuyen, /tam-linh nếu không cần.
```

---

## 3. Cách dùng 2 file trong folder gốc

Trong folder gốc đang có:

```text
HANDOFF_NGU_THUAT_HONTHO_DEV.md
deep-research-report.md
```

Sau khi có file này, dùng file mới này làm chỉ đạo chính:

```text
HANDOFF_NGU_THUAT_HONTHO_DEV_REPO_CHECKED.md
```

Cách dùng:

```text
1. File REPO_CHECKED này = chỉ đạo kỹ thuật chính, đã đối chiếu repo.
2. deep-research-report.md = nguồn nội dung đầy đủ.
3. HANDOFF_NGU_THUAT_HONTHO_DEV.md bản cũ chỉ dùng tham khảo, vì route /cohoc trong đó chưa đúng với repo hiện tại.
```

---

## 4. Hướng làm đúng theo repo hiện tại

### Bước 1 — Không tạo route mới

Giữ nguyên route hiện tại:

```text
/huyen-mon-tham-khao
/huyen-mon-tham-khao/ngu-thuat
/huyen-mon-tham-khao/ngu-thuat/son
/huyen-mon-tham-khao/ngu-thuat/y
/huyen-mon-tham-khao/ngu-thuat/boc
/huyen-mon-tham-khao/ngu-thuat/menh
/huyen-mon-tham-khao/ngu-thuat/tuong
/huyen-mon-tham-khao/bai-viet
```

### Bước 2 — Biến 5 trang nhóm thành listing có bài

Hiện 5 trang nhóm đang là bài khung ngắn.

Cần nâng thành:

```text
hero nhóm
mô tả nhóm
disclaimer nhóm
grid bài viết thuộc nhóm
link vào bài chi tiết
```

Không bỏ nội dung khung cũ; có thể giữ làm phần giới thiệu đầu trang.

### Bước 3 — Tạo data tập trung cho bài Cổ học

Nên tạo file mới:

```text
src/data/coHocArticles.ts
```

Hoặc nếu repo đã có chuẩn khác phù hợp hơn thì dùng chuẩn hiện tại.

Schema gợi ý:

```ts
export type CoHocGroup = "nen" | "son" | "y" | "menh" | "tuong" | "boc";

export type CoHocArticle = {
  title: string;
  slug: string;
  group: CoHocGroup;
  shortDescription: string;
  seoDescription?: string;
  disclaimer: string;
  coverImage?: string;
  audioUrl?: string;
  audioStyle?: string;
  content: string;
  reflectionQuestions?: string[];
  relatedSlugs?: string[];
  priority?: "Cao" | "Vừa" | "Ổn định";
};
```

### Bước 4 — Tạo route bài chi tiết

Tạo route chi tiết theo nhóm:

```text
src/app/huyen-mon-tham-khao/ngu-thuat/[group]/[slug]/page.tsx
```

URL sinh ra:

```text
/huyen-mon-tham-khao/ngu-thuat/son/hoc-tho-cham-giua-ngay-dai
/huyen-mon-tham-khao/ngu-thuat/y/giu-gio-ngu-deu-nhu-giu-mot-ben-neo
/huyen-mon-tham-khao/ngu-thuat/menh/menh-khong-phai-ban-an
/huyen-mon-tham-khao/ngu-thuat/tuong/than-thai-di-truoc-guong-mat
/huyen-mon-tham-khao/ngu-thuat/boc/que-khong-thay-ban-song-ho
```

Lưu ý:
- Hiện đã có route tĩnh `/huyen-mon-tham-khao/ngu-thuat/menh/page.tsx`.
- Route `[group]/[slug]` không được phá route nhóm hiện tại.
- Nếu Next conflict, dev phải chọn cấu trúc an toàn hơn:
  - giữ `ngu-thuat/menh/page.tsx`
  - tạo `ngu-thuat/menh/[slug]/page.tsx`, tương tự từng nhóm
  - hoặc tạo nested route riêng sau khi kiểm tra build.

### Bước 5 — Bổ sung bài nền

Vì nhóm `nen` không thuộc 5 nhánh Ngũ thuật, có 2 cách:

Cách an toàn nhất:

```text
Đưa bài nền vào /huyen-mon-tham-khao/bai-viet/phase-1 hoặc tạo route:
/huyen-mon-tham-khao/bai-viet/[slug]
```

Không nhét bài nền vào `/ngu-thuat/<group>` nếu không đúng nhóm.

---

## 5. Bộ nội dung ưu tiên làm trước

Không làm 150 bài.

Làm trước bộ 30 bài mở nhánh từ `deep-research-report.md`.

### Nhóm Nền

```text
1. Huyền học phương Đông là gì? — huyen-hoc-phuong-dong-la-gi
2. Vì sao huyền học nghiêm túc khác với mê tín giật gân? — vi-sao-huyen-hoc-nghiem-tuc-khac-voi-me-tin-giat-gan
3. Ngũ thuật là gì trong truyền thống phương Đông? — ngu-thuat-la-gi-trong-truyen-thong-phuong-dong
4. Ranh giới giữa biểu tượng, kinh nghiệm và niềm tin tuyệt đối — ranh-gioi-giua-bieu-tuong-kinh-nghiem-va-niem-tin-tuyet-doi
```

### Sơn

```text
5. Học thở chậm giữa ngày dài — hoc-tho-cham-giua-ngay-dai
6. Ngồi yên trước hiên nhà — ngoi-yen-truoc-hien-nha
7. Sống chậm không phải sống lùi — song-cham-khong-phai-song-lui
8. Đi chậm qua một cơn giận — di-cham-qua-mot-con-gian
```

### Y

```text
9. Giữ giờ ngủ đều như giữ một bến neo — giu-gio-ngu-deu-nhu-giu-mot-ben-neo
10. Ăn chậm để nghe cơ thể — an-cham-de-nghe-co-the
11. Đi bộ sau một ngày nhiều tiếng động — di-bo-sau-mot-ngay-nhieu-tieng-dong
12. Dưỡng sinh không bắt đầu từ thuốc — duong-sinh-khong-bat-dau-tu-thuoc
```

### Mệnh

```text
13. Mệnh không phải bản án — menh-khong-phai-ban-an
14. Can chi như chiếc lịch của thời gian — can-chi-nhu-chiec-lich-cua-thoi-gian
15. Ngũ hành để soi thiên hướng, không để đóng khung — ngu-hanh-de-soi-thien-huong-khong-de-dong-khung
16. Đừng dùng mệnh để buông xuôi — dung-dung-menh-de-buong-xuoi
```

### Tướng

```text
17. Thần thái đi trước gương mặt — than-thai-di-truoc-guong-mat
18. Đừng vội đọc người qua khuôn mặt — dung-voi-doc-nguoi-qua-khuon-mat
19. Phong thái hiền lành không phô trương — phong-thai-hien-lanh-khong-pho-truong
20. Một nụ cười có học từ năm tháng — mot-nu-cuoi-co-hoc-tu-nam-thang
```

### Bốc

```text
21. Khi lòng rối quẻ chỉ nên là câu hỏi mở — khi-long-roi-que-chi-nen-la-cau-hoi-mo
22. Đọc một quẻ như soi lại chính mình — doc-mot-que-nhu-soi-lai-chinh-minh
23. Quẻ không thay bạn sống hộ — que-khong-thay-ban-song-ho
24. Một câu hỏi đúng đã là nửa câu trả lời — mot-cau-hoi-dung-da-la-nua-cau-tra-loi
```

### Nhóm Nền khóa ranh giới

```text
25. Có nên ứng dụng cổ học vào chọn ngày giờ không? — co-nen-ung-dung-co-hoc-vao-chon-ngay-gio-khong
26. Cổ học có thể hỗ trợ tự quan sát bản thân đến đâu? — co-hoc-co-the-ho-tro-tu-quan-sat-ban-than-den-dau
27. Vì sao không nên dùng cổ học để hù dọa người khác? — vi-sao-khong-nen-dung-co-hoc-de-hu-doa-nguoi-khac
28. Giữa lời khuyên thực tế và lời phán đoán cổ học, nên đặt trọng tâm ở đâu? — giua-loi-khuyen-thuc-te-va-loi-phan-doan-co-hoc-nen-dat-trong-tam-o-dau
29. Vai trò của đạo đức người học cổ học — vai-tro-cua-dao-duc-nguoi-hoc-co-hoc
30. Học cổ học để sáng hơn hay để lệ thuộc hơn? — hoc-co-hoc-de-sang-hon-hay-de-le-thuoc-hon
```

---

## 6. Disclaimer chuẩn

### Chung

```text
Bài viết trong nhánh này xem cổ học và huyền học phương Đông như chất liệu văn hóa và chiêm nghiệm để tự quan sát, không phải kết luận tuyệt đối cho số phận hay lựa chọn sống của một con người.
```

### Sơn

```text
Nội dung nhóm Sơn đi theo hướng tu dưỡng và nếp sống chậm, không thần bí hóa trải nghiệm thân tâm và không thay thế hỗ trợ trị liệu/chuyên môn khi cần.
```

### Y

```text
Nội dung nhóm Y chỉ gợi ý dưỡng sinh nhẹ và nếp sống điều độ, không chẩn đoán, không kê toa và không thay thế tư vấn y khoa.
```

### Mệnh

```text
Nội dung nhóm Mệnh dùng ngôn ngữ mệnh lý như một cách tự hiểu mình trong bối cảnh văn hóa, không phải bản án tuyệt đối về đời người.
```

### Tướng

```text
Nội dung nhóm Tướng bàn về phong thái và sự tự tu dưỡng, không dùng diện mạo để phán nhân phẩm, giá trị hay số phận của bất kỳ ai.
```

### Bốc

```text
Nội dung nhóm Bốc xem quẻ như lời gợi ý chiêm nghiệm và cách chậm lại trước lựa chọn, không thay cho dữ kiện thực tế hay quyết định chuyên môn.
```

---

## 7. Ảnh/audio

Giai đoạn này chưa có asset riêng thì dùng fallback, không tạo file nặng.

Nếu cần ảnh fallback nhóm, dùng URL/manifest hiện có hoặc để placeholder nhẹ.

Quy tắc:

```text
Không push ảnh/audio binary vào git.
Nếu có asset mới thì upload R2 và update cloudImageManifest/cloudAudioManifest.
Nếu chưa có asset thì không động R2.
```

Gợi ý đường dẫn tương lai:

```text
/images/co-hoc/son/<slug>.png
/images/co-hoc/y/<slug>.png
/images/co-hoc/menh/<slug>.png
/images/co-hoc/tuong/<slug>.png
/images/co-hoc/boc/<slug>.png

/audio/co-hoc/son/<slug>.m4a
/audio/co-hoc/y/<slug>.m4a
/audio/co-hoc/menh/<slug>.m4a
/audio/co-hoc/tuong/<slug>.m4a
/audio/co-hoc/boc/<slug>.m4a
```

---

## 8. Smoke test bắt buộc

Sau khi sửa, chạy:

```bash
npm run build
```

Test route:

```text
/huyen-mon-tham-khao
/huyen-mon-tham-khao/ngu-thuat
/huyen-mon-tham-khao/ngu-thuat/son
/huyen-mon-tham-khao/ngu-thuat/y
/huyen-mon-tham-khao/ngu-thuat/boc
/huyen-mon-tham-khao/ngu-thuat/menh
/huyen-mon-tham-khao/ngu-thuat/tuong

/huyen-mon-tham-khao/ngu-thuat/menh/menh-khong-phai-ban-an
/huyen-mon-tham-khao/ngu-thuat/boc/que-khong-thay-ban-song-ho
```

Nếu có làm bài nền:

```text
/huyen-mon-tham-khao/bai-viet
/huyen-mon-tham-khao/bai-viet/huyen-hoc-phuong-dong-la-gi
```

---

## 9. Báo cáo sau khi làm

Dev phải báo:

```text
1. Đã sửa file nào.
2. Đã thêm bao nhiêu bài.
3. Đã thêm route động nào.
4. Đã giữ route cũ hay có redirect/alias không.
5. npm run build pass/fail.
6. Git status có ảnh/audio binary bị track nhầm không.
7. Các route smoke test có mở được không.
```

Commit gợi ý:

```text
feat(co-hoc): expand ngu thuat content on existing huyen mon routes
```

---

## 10. Lệnh ngắn để dán cho dev

```text
Đọc kỹ 3 file trong folder gốc:
1. HANDOFF_NGU_THUAT_HONTHO_DEV_REPO_CHECKED.md
2. deep-research-report.md
3. HANDOFF_NGU_THUAT_HONTHO_DEV.md

Ưu tiên file REPO_CHECKED này làm chỉ đạo chính.

Repo đã có khung Cổ học ở /huyen-mon-tham-khao, không tạo lại từ đầu.
Không đổi route sang /cohoc trong lượt này.
Không làm app Tứ Trụ.
Không làm app Phong Thủy.
Không làm database.
Không làm AI realtime.
Không thêm 150 bài.

Việc cần làm:
1. Rà lại các file route hiện có trong src/app/huyen-mon-tham-khao.
2. Giữ route hiện tại.
3. Bổ sung nội dung thật cho Ngũ thuật.
4. Nâng 5 trang nhóm Sơn/Y/Bốc/Mệnh/Tướng thành listing có bài.
5. Tạo data tập trung cho bài Cổ học nếu cần.
6. Tạo route bài chi tiết an toàn, không phá route nhóm.
7. Thêm trước bộ 30 bài mở nhánh từ deep-research-report.md.
8. Không push ảnh/audio binary vào git.
9. Chạy npm run build.
10. Smoke test các route Cổ học/Ngũ thuật.

Báo lại file đã sửa, số bài đã thêm, route đã thêm, build pass/fail và git status.
```
