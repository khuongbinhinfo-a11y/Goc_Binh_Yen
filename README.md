# Hồn Thơ

Hồn Thơ là website chia sẻ thơ, kể chuyện và những nội dung chiêm nghiệm nhẹ, mang tinh thần chiều quê, sông nước và nhịp sống chậm.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Chạy local

1. Cài dependencies:
   - `npm install`
2. Chạy môi trường dev:
   - `npm run dev`
3. Mở trình duyệt:
   - `http://localhost:3000`

## Các route chính

- Trang chủ: `/`
- Đọc thơ: `/doc-tho`
- Kể chuyện: `/ke-chuyen`
- Tâm linh: `/tam-linh`
- Tủ sách: `/tu-sach`
- Ủng hộ: `/ung-ho`

## Ghi chú nội dung

- Nhánh **Đọc thơ** có thể hiển thị tác giả khi dữ liệu có trường `author`.
- Nhánh **Kể chuyện** và **Tâm linh** không hiển thị tác giả.
- Link biểu mẫu liên hệ được quản lý tại `src/data/homepageData.ts` qua hằng số `CONTACT_FORM_URL`.
