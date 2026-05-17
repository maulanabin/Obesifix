# AGENTS.md

## Project Identity

This repository is the Mobile Development project for the Obesifix Android application.

Obesifix is a native Android application built with Kotlin and XML layouts. The app is part of the Bangkit 2023 Capstone project and focuses on user authentication, user profile data, food prediction, food recommendation, local data handling, and nutrition/obesity-related user flows.

The current working branch is `version2`.

## Tech Stack

Use the existing Android native stack:

- Kotlin
- XML layouts
- Android Jetpack
- MVVM architecture
- ViewBinding
- Retrofit and OkHttp for API integration
- Firebase Auth / Google Services
- DataStore Preferences for session/user preference storage
- Room for local persistence
- Paging 3 for paginated list data
- Glide for image loading
- Lottie for animation
- Hilt for dependency injection
- Coroutines / LiveData / ViewModel
- Material Components

Do not convert this project to Flutter, React Native, Jetpack Compose, or another architecture unless the user explicitly asks.

## Important Project Files

Important files and areas to inspect before making changes:

- `README.md`
- `settings.gradle`
- `build.gradle`
- `app/build.gradle`
- `app/src/main/AndroidManifest.xml`
- `app/src/main/java/org/obesifix/obesifix/`
- `app/src/main/res/layout/`
- `app/src/main/res/navigation/`
- `app/src/main/res/values/`

Main package:

```text
org.obesifix.obesifix
```

Application ID:

```text
org.obesifix.obesifix
```

## Existing App Structure

Follow the structure already described in the repository:

```text
adapter/          RecyclerView adapters
data/             Data handling
data/dao/         Local DAO for Room
data/database/    Local database/entity storage
data/repository/  Repository layer / single source of truth
data/paging/      Paging 3 sources
network/          Remote data handlers
network/payload/  API request bodies
network/response/ API response models
ui/               Activity, Fragment, ViewModel, and UI layer
utils/            Utility functions and Kotlin extensions
preference/       DataStore user/session handling
factory/          ViewModel factories if used by existing code
```

If the exact folder name differs, follow the actual folder structure in the repo.

## Architecture Rules

Keep the app consistent with MVVM.

Use this pattern for new features:

```text
Activity/Fragment
    -> ViewModel
        -> Repository
            -> ApiService / Room DAO / DataStore
```

Rules:

- Do not put API calls directly inside Activity or Fragment unless the existing code already requires it and refactoring would be too risky.
- Keep UI logic in Activity/Fragment.
- Keep business/data logic in Repository.
- Keep observable state in ViewModel.
- Use existing patterns before introducing new abstractions.
- Prefer small, safe changes over large rewrites.
- Avoid changing package names unless required.
- Avoid breaking existing navigation and activity declarations.

## API Integration Rules

The project uses Retrofit through `ApiConfig` and `ApiService`.

Before adding or changing API features:

1. Inspect `network/ApiConfig.kt`.
2. Inspect `network/ApiService.kt`.
3. Inspect existing payload and response models.
4. Reuse the existing base URL unless the user explicitly asks to change it.
5. Reuse the existing token header pattern:

```kotlin
@Header("X-API-TOKEN") token: String
```

6. Keep response models compatible with the backend JSON.
7. Do not hardcode user-specific credentials, API keys, or tokens.

When adding a new endpoint:

- Add the method to `ApiService`.
- Add request body model in `network/payload/` if needed.
- Add response model in `network/response/` if needed.
- Add repository function.
- Expose state through ViewModel.
- Update UI safely.

## Authentication and Session Rules

The app uses user preferences/session data through DataStore.

Before modifying login, logout, splash screen, onboarding, or profile flow:

- Inspect `preference/`
- Inspect `MainActivity.kt`
- Inspect `SplashFragment.kt`
- Inspect login-related Activity/ViewModel/Repository files
- Preserve existing login state behavior unless the user asks to redesign it

Do not remove session checks without replacing them with a correct alternative.

## UI Rules

This project uses XML layouts and ViewBinding.

When changing UI:

- Modify XML layouts under `app/src/main/res/layout/`.
- Use ViewBinding in Kotlin files.
- Keep naming consistent with existing layout IDs.
- Use Material Components where already used.
- Do not introduce Jetpack Compose.
- Preserve existing theme and style files unless requested.
- Check AndroidManifest when adding a new Activity.
- Check navigation graph when adding a new Fragment destination.

## Local Database Rules

The project uses Room.

When changing local persistence:

- Inspect existing DAO, entity, database, and repository classes first.
- Do not rename existing tables/entities casually.
- Do not change schema without considering migration.
- If schema version changes are required, add migration or clearly explain why destructive migration is acceptable.
- Keep database access out of Activity/Fragment.

## Dependency Injection Rules

The project includes Hilt dependencies.

Before adding manual constructors or factories, inspect whether the target class already uses Hilt.

Use Hilt where the surrounding code uses Hilt. Use existing `ViewModelFactory` only where the existing code already uses it.

Do not mix multiple dependency patterns unnecessarily.

## Build and Test Commands

Before finalizing changes, run or suggest these checks from the project root:

```bash
./gradlew clean
./gradlew assembleDebug
./gradlew testDebugUnitTest
```

On Windows PowerShell:

```powershell
.\gradlew clean
.\gradlew assembleDebug
.\gradlew testDebugUnitTest
```

If Android SDK or Gradle wrapper is not configured locally, explain the limitation and still inspect the code for compile-time issues.

## Safety Rules

Never commit or expose:

- API tokens
- Firebase private credentials
- keystore files
- `local.properties`
- user secrets
- `.env` files
- personal access tokens
- real passwords

Do not add secrets to source code. Use `local.properties`, BuildConfig, environment variables, or documented secure alternatives when needed.

## Code Quality Rules

When editing Kotlin code:

- Keep imports clean.
- Remove unused code only when safe.
- Avoid large rewrites.
- Prefer readable Kotlin over clever code.
- Keep null-safety explicit.
- Avoid force unwrap `!!` unless unavoidable and justified.
- Use existing naming style.
- Do not change public behavior without explaining it.
- Add comments only when they clarify non-obvious logic.

## Task Workflow for Codex

When the user asks to add or fix a feature:

1. First inspect the related Activity/Fragment, ViewModel, Repository, API service, model, XML layout, and navigation/manifest files.
2. Summarize the current implementation.
3. Identify the smallest safe change.
4. Make the code changes.
5. Check for compile errors mentally and with Gradle if available.
6. Explain changed files.
7. Mention any remaining manual steps, such as adding API keys or testing on emulator.

## Common Feature Areas

Likely feature areas in this app:

- Login/register/authentication
- Google sign-in / Firebase authentication
- Splash screen and onboarding flow
- User profile and edit profile
- Food prediction using image upload
- Food recommendation
- Food list / detail page
- History feature
- Bookmark or local saved data
- Preference/settings screen
- Bottom navigation
- Retrofit API integration
- Room local storage

## What Not To Do

Do not:

- Rewrite the entire project.
- Convert XML to Compose.
- Convert Kotlin to Java.
- Replace Retrofit with another HTTP client.
- Replace Room/DataStore without instruction.
- Change package name.
- Change backend base URL unless requested.
- Delete existing features to make new code easier.
- Add unnecessary new dependencies.
- Ignore build errors.
- Hide failed tests or failed Gradle commands.

## Response Style

When reporting back to the user, use Indonesian unless the user asks otherwise.

Use this format:

```text
Saya sudah cek bagian terkait.

Masalahnya:
- ...

Perubahan yang saya lakukan:
- ...

File yang diubah:
- ...

Cara test:
- ...

Catatan:
- ...
```

Be clear, practical, and beginner-friendly.
