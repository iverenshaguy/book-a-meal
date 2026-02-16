# Modernization Compatibility Log

Use this file to record compatibility issues, decisions, and workarounds during the [Book-A-Meal modernization](MODERNIZATION_PLAN.md). When something breaks after an upgrade, add an entry so the team (or future you) doesn’t repeat the same investigation.

**How to use:** For each issue, fill in the columns below (or add a short section). Update the “Current baseline” section when you complete a phase or change the stack.

---

## Current baseline (update as you go)

| Item        | Version / note |
|------------|----------------|
| Node       | 20 LTS (>=20.0.0) |
| React      | 16.14.x (pre-Phase 3) |
| Redux      | 3.7.x (pre-Phase 4) |
| React Router | 5.3.x (pre-Phase 5) |
| Last phase completed | Phase 2 (Testing – RTL migration; 0 specs skipped, see “Skipped tests” below) |

---

## Pinned or overridden packages

List any package that was **pinned** to an older version or **overridden** (e.g. via `resolutions` / `overrides`) because a newer version broke the app, and why.

| Package        | Pinned/override version | Reason |
|----------------|-------------------------|--------|
| firebase      | 10.10.0 (exact)         | Firebase 11 and 10.14.x caused build error: @firebase/util missing exports (isWebWorker, updateEmulatorBanner). Pin to exact 10.10.0 until @firebase/* deps are aligned or app migrates to full modular API. |

---

## Resolved issues (what broke and how it was fixed)

One row per incident: package, version you tried, what failed, and what you did (revert, pin, replace, or fix).

| Package      | Version tried | What failed (build / test / runtime) | Resolution (revert / pin / replace / fix) |
|-------------|----------------|--------------------------------------|------------------------------------------|
| firebase    | ^11.0.0       | Build: @firebase/util missing isWebWorker, updateEmulatorBanner | Pinned to ^10.10.0; documented in Pinned packages. |

---

## Skipped tests (Phase 2 – Enzyme → RTL)

All specs have been migrated to React Testing Library. None are skipped.

**Migrated to RTL:** Routes, Auth, Password, Cart, Form (and Form sub-forms including MenuForm), Dashboard, Meals, Menu, CatererMenu, CustomerMenu, CustomerMenuItems, OrderDetails (and Caterer/Customer), Orders, CustomerOrders.

---

## Known risks / deferred work

Things that might break later or were intentionally left as-is (e.g. “ESLint 9 deferred; we stay on 8” or “react-redux-toastr not officially supporting React 18”).

- Firebase 11 deferred; staying on v10 until dependency alignment or modular API migration.
- ESLint 9 deferred (optional in Phase 1); staying on ESLint 8.
- **redux-mock-store:** `configureStore` is deprecated. Phase 2.4 in the plan covers using `legacy_configureStore` or migrating to a real store in tests.

---

## Quick reference: where to look

- **Phased task list:** See the phased modernization plan (e.g. `.cursor/plans/` or the doc that breaks each phase into tasks).
- **Strategy:** “Compatibility: Do Not Assume Upgrades Will Just Work” and “Cross-Phase Conventions” in that plan.
- **Rollback:** Use the tag or branch created in Phase 1 task 1.0 (e.g. `pre-modernization`).
