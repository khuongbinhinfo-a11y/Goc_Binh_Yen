# R2 Env Rotation Checklist

## Bắt buộc thay khi rotate access key

- R2_ACCESS_KEY_ID
- R2_SECRET_ACCESS_KEY

## Chỉ thay nếu hạ tầng R2 cũng đổi cùng lúc

- R2_ACCOUNT_ID
- R2_BUCKET
- R2_S3_ENDPOINT
- R2_PUBLIC_DEV_URL

## Thường giữ nguyên

- MEDIA_PROVIDER
- USE_R2_MEDIA
- R2_PREFIX_AUDIO
- R2_PREFIX_IMAGES
- R2_PREFIX_COVERS
- R2_PREFIX_VIDEO
- R2_SMOKE_SAMPLE_SLUG

## Sau khi thay key

1. Cập nhật env ở local và môi trường deploy.
2. Khởi động lại app hoặc redeploy để nạp env mới.
3. Chạy smoke test R2.
4. Kiểm tra HEAD một vài URL audio cloud mẫu.