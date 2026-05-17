# Obesifix Codex Ready Pack

Paket ini dibuat agar Codex CLI lebih cepat memahami project Android Obesifix branch `version2`.

## Isi File

```text
AGENTS.md
.codex/
└── prompts/
    └── obesifix-default-task.md
PROMPT_AWAL_PASTE_KE_CODEX.txt
PROMPT_FITUR_PASTE_KE_CODEX.txt
CARA_PAKAI_WINDOWS.md
```

## Cara Pakai Cepat

1. Download dan ekstrak file ZIP ini.
2. Copy `AGENTS.md` ke root project Obesifix, sejajar dengan:
   - `README.md`
   - `build.gradle`
   - `settings.gradle`
   - folder `app/`
3. Copy folder `.codex` ke root project Obesifix.
4. Buka project Obesifix di VS Code.
5. Buka terminal di root project.
6. Pastikan branch sudah `version2`:

```powershell
git checkout version2
```

7. Jalankan Codex CLI:

```powershell
codex
```

8. Paste isi `PROMPT_AWAL_PASTE_KE_CODEX.txt`.

## Catatan

File utama yang paling penting adalah `AGENTS.md`.

Folder `.codex/prompts/` hanya tambahan agar Anda punya prompt template yang rapi dan mudah dipakai ulang.

Jangan masukkan token, password, API key, atau isi `local.properties` ke chat Codex.
