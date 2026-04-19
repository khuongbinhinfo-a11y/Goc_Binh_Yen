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
- [Huyen mon tham khao](http://localhost:3000/huyen-mon-tham-khao)

## 2) Kiem tra menu chinh

- Vao trang chu, kiem tra menu co muc **Huyen mon tham khao**.
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

## 6) Kiem tra Tam thuc (3 nhanh con)

- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/thai-at-than-kinh](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/thai-at-than-kinh)
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/ky-mon-don-giap](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/ky-mon-don-giap)
- [http://localhost:3000/huyen-mon-tham-khao/tam-thuc/luc-nham-than-khoa](http://localhost:3000/huyen-mon-tham-khao/tam-thuc/luc-nham-than-khoa)

Ky vong:
- Trang hien dung tieu de nhanh.
- Link dieu huong va style thong nhat voi cac trang cap khac.

## 7) Kiem tra nhanh truoc push

```bash
npm run lint
npm run build
```

Neu tat ca deu OK, co the push.
