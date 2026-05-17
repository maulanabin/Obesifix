# Obesifix Default Codex Prompt

You are working inside the Obesifix Android project on branch `version2`.

Before changing anything, read:

- `AGENTS.md`
- `README.md`
- `settings.gradle`
- `build.gradle`
- `app/build.gradle`
- `app/src/main/AndroidManifest.xml`

Understand that this is a native Android Kotlin XML project using MVVM, Retrofit, Firebase Auth, DataStore, Room, Paging 3, Hilt, ViewBinding, and Material Components.

Your job is to help continue unfinished features and fix existing features safely.

Always follow this workflow:

1. Inspect the relevant files first.
2. Explain what currently exists.
3. Identify the likely cause or missing part.
4. Make the smallest safe code change.
5. Avoid architecture rewrites.
6. Preserve existing package name `org.obesifix.obesifix`.
7. Preserve XML + ViewBinding style.
8. Run or recommend:

```bash
./gradlew assembleDebug
./gradlew testDebugUnitTest
```

On Windows:

```powershell
.\gradlew assembleDebug
.\gradlew testDebugUnitTest
```

Do not expose secrets, tokens, local.properties, Firebase private keys, or passwords.

When implementing a feature, check all related layers:

- XML layout
- Activity or Fragment
- ViewModel
- Repository
- ApiService
- payload model
- response model
- Room DAO/entity/database if local data is involved
- DataStore preference if session/user state is involved
- AndroidManifest or navigation graph if a new screen is added

Respond in Indonesian and explain changed files clearly.
