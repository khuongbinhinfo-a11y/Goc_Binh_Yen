# Local Preview Checklist (Before Push)

Muc tieu: kiem tra nhanh cac route moi va luong dieu huong truoc khi push.

## 1) Chay local

```bash
npm install
npm run dev
```

Mo trinh duyet: http://localhost:3000

Link nhanh tren VSCode:
- [Trang chu](http://localhost:3000)
- [Co hoc](http://localhost:3000/huyen-mon-tham-khao)
- [Bang xem truoc local](http://localhost:3000/xem-truoc-local)

## 2) Kiem tra menu chinh

- Vao trang chu, kiem tra menu co muc **Co hoc**.
- Bam vao menu va xac nhan active state hoat dong dung.

## 3) Kiem tra route cap 0

- [http://localhost:3000/huyen-mon-tham-khao](http://localhost:3000/huyen-mon-tham-khao)

Ky vong:
- Hien 4 card nhanh cap 1: Nhap mon, Ngu thuat, Tam thuc, Ung dung va gioi han.

## 4) Kiem tra route cap 1

- [http://localhost:3000/huyen-mon-tham-khao/nhap-mon](http://localhost:3000/huyen-mon-tham-khao/nhap-mon)
- [http://localhost:3000/huyen-mon-tham-khao/ngu-thuat](http://localhost:3000/huyen-mon-tham-khao/ngu-thuat)
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc](http://localhost:3000/huyen-mon-tham-khao/tam-thuc)
- [http://localhost:3000/huyen-mon-tham-khao/ung-dung-va-gioi-han](http://localhost:3000/huyen-mon-tham-khao/ung-dung-va-gioi-han)

Ky vong:
- Trang load khong loi.
- Co breadcrumb link quay lai nhanh cha.

## 5) Kiem tra Ngu thuat (5 nhanh con)

- [http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/son](http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/son)
- [http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/y](http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/y)
- [http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/boc](http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/boc)
- [http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/menh](http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/menh)
- [http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/tuong](http://localhost:3000/huyen-mon-tham-khao/ngu-thuat/tuong)

Ky vong:
- Moi trang la placeholder ngan, khong co noi dung dai.

## 6) Kiem tra Tam thuc (8 cum)

### Trang chinh Tam thuc
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc](http://localhost:3000/huyen-mon-tham-khao/tam-thuc)

Ky vong:
- Hien 3 nhom card: Tay nen (3 cum), Ba he (3 nhanh), Ung dung (2 cum).

### Tam thuc / Nhap mon
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/nhap-mon-tam-thuc](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/nhap-mon-tam-thuc)

### Tam thuc / Cach tiep can
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/cach-tiep-can](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/cach-tiep-can)

### Tam thuc / So sanh va dinh vi
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/so-sanh-va-dinh-vi](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/so-sanh-va-dinh-vi)

### Tam thuc / Ba he quy chieu
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/thai-at-than-kinh](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/thai-at-than-kinh)
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/ky-mon-don-giap](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/ky-mon-don-giap)
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/luc-nham-than-khoa](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/luc-nham-than-khoa)

### Tam thuc / Ung dung va gioi han
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/ung-dung-va-gioi-han-tam-thuc](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/ung-dung-va-gioi-han-tam-thuc)

### Tam thuc / Chuyen sau dinh huong
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/chuyen-sau-dinh-huong](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/chuyen-sau-dinh-huong)

Ky vong:
- Tat ca cac trang co tieu de va mo ta phu hop.
- Link dieu huong, breadcrumb va style thong nhat.
- Anh tham chieu co ten basename dung quy uc (khong dau, lowercase, dau gach ngang).

## 7) Kiem tra nhanh truoc push

```bash
npm run lint
npm run build
```

Neu tat ca deu OK, co the push.
