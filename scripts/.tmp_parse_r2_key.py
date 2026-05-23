from pathlib import Path
import json

key_path = Path(r'F:\1_A_Disk_D\khuong-binh\cloudflare-database-key.md')
text = key_path.read_text(encoding='utf-8', errors='replace')
section = False
cfg = {}
for line in text.splitlines():
    trimmed = line.strip()
    if trimmed.startswith('2.cloudflare-name:'):
        section = True
        continue
    if section and trimmed.startswith('3.cloudflare-name:'):
        break
    if not section:
        continue
    if trimmed.startswith('-Public Development URL:'):
        cfg['publicDevUrl'] = trimmed.replace('-Public Development URL:', '').strip()
    elif trimmed.startswith('-S3 API:'):
        cfg['s3Api'] = trimmed.replace('-S3 API:', '').strip()
    elif trimmed.startswith('-Access Key ID:'):
        cfg['accessKeyId'] = trimmed.replace('-Access Key ID:', '').strip()
    elif trimmed.startswith('-Secret Access Key:'):
        cfg['secretAccessKey'] = trimmed.replace('-Secret Access Key:', '').strip()
print(json.dumps(cfg))

