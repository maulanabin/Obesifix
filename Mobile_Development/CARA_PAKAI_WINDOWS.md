# Cara Pakai di Windows / VS Code

## 1. Ekstrak ZIP

Ekstrak file ZIP ini. Di dalamnya ada:

```text
AGENTS.md
.codex/
PROMPT_AWAL_PASTE_KE_CODEX.txt
PROMPT_FITUR_PASTE_KE_CODEX.txt
CARA_PAKAI_WINDOWS.md
```

## 2. Copy ke Root Project

Copy `AGENTS.md` dan folder `.codex` ke folder root project Obesifix Anda.

Root project adalah folder yang berisi:

```text
README.md
build.gradle
settings.gradle
app/
```

## 3. Buka di VS Code

Klik kanan folder project Obesifix, lalu buka dengan VS Code.

## 4. Pastikan Branch

Di terminal VS Code:

```powershell
git checkout version2
git status
```

## 5. Jalankan Codex CLI

```powershell
codex
```

## 6. Paste Prompt Awal

Buka file:

```text
PROMPT_AWAL_PASTE_KE_CODEX.txt
```

Copy semua isinya, lalu paste ke Codex CLI.

## 7. Untuk Fitur Spesifik

Kalau ingin menambahkan fitur, buka:

```text
PROMPT_FITUR_PASTE_KE_CODEX.txt
```

Ganti bagian:

```text
[TULIS FITUR YANG INGIN DIKERJAKAN DI SINI]
```

dengan fitur yang Anda mau, misalnya:

```text
Tambahkan fitur edit tinggi badan dan berat badan di halaman profile, simpan ke API edit user, lalu tampilkan data terbaru setelah berhasil update.
```

## 8. Perintah Build yang Bisa Diminta ke Codex

```powershell
.\gradlew clean
.\gradlew assembleDebug
.\gradlew testDebugUnitTest
```

## 9. Jangan Share File Rahasia

Jangan paste file berikut ke Codex/chat publik:

```text
local.properties
google-services.json jika berisi konfigurasi sensitif
keystore
.env
token GitHub
password
API key pribadi
```
