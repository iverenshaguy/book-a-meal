# Book-A-Meal Modernization Plan

## Executive Summary

This document outlines a comprehensive plan to modernize the Book-A-Meal application from its current stack (React 16, Redux 3, React Router 5) to the latest technologies (React 18, Redux Toolkit, React Router 6).

**Estimated Complexity:** High
**Risk Level:** Medium-High (breaking changes across major dependencies)

---

## Current State Analysis

### Critical Outdated Dependencies

| Package | Current | Latest | Gap | Breaking Changes |
|---------|---------|--------|-----|------------------|
| React | 16.14.0 | 18.3.1 | 2 major versions | Yes (Concurrent features, automatic batching) |
| Redux | 3.7.2 | 5.0.1 | 2 major versions | Yes (TypeScript rewrite, API changes) |
| React Router | 5.3.4 | 6.28.0 | 1 major version | Yes (Complete API redesign) |
| React-Redux | 7.2.9 | 9.1.2 | 2 major versions | Yes (Requires React 18) |
| Enzyme | 3.11.0 | Deprecated | N/A | Unmaintained, migrate to RTL |

### Dependencies Requiring Updates

**UI Libraries:**
- `react`: 16.14.0 → 18.3.1
- `react-dom`: 16.14.0 → 18.3.1
- `react-router`: 5.3.4 → 6.28.0
- `react-router-dom`: 5.3.4 → 6.28.0

**State Management:**
- `redux`: 3.7.2 → 5.0.1 (or migrate to Redux Toolkit)
- `react-redux`: 7.2.9 → 9.1.2
- `redux-thunk`: 2.2.0 → 3.1.0
- `redux-logger`: 3.0.6 → 3.0.6 (consider removing in favor of Redux DevTools)
- `connected-react-router`: 6.5.2 → Remove (not needed with React Router 6)

**Testing:**
- `enzyme`: 3.11.0 → Remove
- `enzyme-adapter-react-16`: 1.15.8 → Remove
- Add `@testing-library/react`: latest
- Add `@testing-library/jest-dom`: latest
- Add `@testing-library/user-event`: latest
- `redux-mock-store`: `configureStore` is deprecated (since v1.5.x). Fix by using `legacy_configureStore` as a stopgap, or migrate tests to use a real store (see Phase 2.4).

**Utilities:**
- `moment`: 2.30.1 → Migrate to `date-fns` or `day.js`
- `query-string`: 6.14.1 → 9.x
- `jwt-decode`: 3.1.2 → 4.x
- `firebase`: 10.10.0 → 11.x
- `history`: 4.10.1 → 5.x (if still needed)

**Notifications (React 18):**
- `react-redux-toastr`: ^7.6.x → Replace with a React 18–compatible toast library (e.g. `react-hot-toast`, `notistack`, or `react-toastify`). react-redux-toastr is not officially maintained for React 18.

**Build Tools:**
- `eslint`: 8.57.0 → 9.x (consider)
- Node engine: 18.* → 20.* or 22.* (LTS)

---

## Migration Strategy

### Phase 1: Foundation & Setup (Low Risk)

**Goal:** Update build tools and non-breaking dependencies

#### 1.1 Update Node Version
- Update to Node 20 LTS or 22 LTS
- Update `.nvmrc` if present
- Update GitHub Actions/CI if applicable

#### 1.2 Update Build Tools
```bash
# Update Webpack ecosystem (already on v5, minor updates)
npm update webpack webpack-cli webpack-dev-server

# Update Babel (already on v7, minor updates)
npm update @babel/core @babel/preset-env @babel/preset-react

# Update ESLint to v9
npm install eslint@^9 --save-dev
# May require eslint.config.js migration from .eslintrc
```

#### 1.3 Update Supporting Libraries
```bash
# Safe updates
npm update axios validator classnames dotenv express compression
npm update firebase@^11
```

**Deliverable:** Updated build tools, no code changes required

---

### Phase 2: Testing Infrastructure (Medium Risk)

**Goal:** Migrate from Enzyme to React Testing Library

#### 2.1 Install React Testing Library
```bash
npm uninstall enzyme enzyme-adapter-react-16 enzyme-to-json react-test-renderer
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

#### 2.2 Update Jest Configuration
Update `jest.config.js`:
```javascript
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  // Remove enzyme-to-json serializer
};
```

Create `src/setupTests.js`:
```javascript
import '@testing-library/jest-dom';
```

#### 2.4 Fix redux-mock-store deprecation

`configureStore` from `redux-mock-store` is deprecated. The Redux team recommends testing with a real store where possible, since a mock store does not update state when actions are dispatched.

**Option A – Short-term (stopgap):** Use the legacy export to silence deprecation warnings:
```javascript
// Before
import configureStore from 'redux-mock-store';

// After (until tests are migrated)
import { legacy_configureStore as configureStore } from 'redux-mock-store';
```

**Option B – Preferred:** In specs that need a Redux store, use a real store instead of a mock:
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'src/store/rootReducer';
import { initialState } from 'src/config/tests/fixtures';

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
// Then render with <Provider store={store}>…
```

Apply Option A across all specs that use `redux-mock-store` (e.g. Header, Modal, SideNav, View, Welcome, auth specs, Form specs, data action tests) as a quick fix; optionally migrate high-value or flaky tests to Option B over time.

#### 2.5 Migrate Tests Incrementally
**Pattern for migration:**

Before (Enzyme):
```javascript
import { shallow } from 'enzyme';

describe('Component', () => {
  it('renders', () => {
    const wrapper = shallow(<Component />);
    expect(wrapper.find('.class').length).toBe(1);
  });
});
```

After (RTL):
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component', () => {
  it('renders', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

**Strategy:**
- Start with simple presentational components
- Move to container components
- Update integration tests last
- Run tests continuously to catch regressions

**Estimated Effort:** 50-100+ test files to migrate

**Deliverable:** All tests migrated to React Testing Library

---

### Phase 3: React 18 Migration (Medium-High Risk)

**Goal:** Upgrade React 16 → 18 with minimal breaking changes

#### 3.1 Update React Dependencies
```bash
npm install react@^18 react-dom@^18
npm install --save-dev @hot-loader/react-dom@^18
```

#### 3.2 Update Root Rendering
**Before:**
```javascript
// src/index.jsx
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
```

**After:**
```javascript
// src/index.jsx
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

#### 3.3 Key Breaking Changes to Address

**Automatic Batching:**
- React 18 batches all state updates automatically
- May affect timing of side effects
- Test thoroughly, especially forms and async operations

**Stricter Hydration:**
- Server-side rendering may need updates
- Console warnings will appear for mismatches

**Concurrent Features (Optional):**
- Can adopt `useTransition`, `useDeferredValue` later
- Not required for migration

**ReactDOM Changes:**
- `ReactDOM.render` → `createRoot().render()`
- `ReactDOM.unmountComponentAtNode` → `root.unmount()`

#### 3.4 Update react-hot-loader
```bash
# May need to migrate to React Fast Refresh
npm uninstall react-hot-loader @hot-loader/react-dom
# Configure Fast Refresh in webpack
```

**Deliverable:** React 18 running with existing code

---

### Phase 4: Redux Modernization (High Risk)

**Goal:** Migrate to Redux Toolkit and modern Redux patterns

#### 4.1 Install Redux Toolkit
```bash
npm install @reduxjs/toolkit@^2
npm update react-redux@^9
```

#### 4.2 Migration Options

**Option A: Incremental Migration (Recommended)**
- Keep existing Redux 3 code working
- Gradually migrate reducers to slices
- Use Redux Toolkit alongside legacy code

**Option B: Big Bang Migration**
- Rewrite all Redux code at once
- Higher risk, faster completion
- Recommended only for small codebases

#### 4.3 Migrate Store Configuration

**Before:**
```javascript
// src/store/index.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);
```

**After (Redux Toolkit):**
```javascript
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* custom middleware */),
  devTools: process.env.NODE_ENV !== 'production',
});
```

#### 4.4 Migrate Reducers to Slices

**Before (Redux 3):**
```javascript
// features/auth/data/reducer.js
const initialState = { user: null, loading: false };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
}
```

**After (Redux Toolkit):**
```javascript
// features/auth/data/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await authAPI.login(credentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

#### 4.5 Update Action Creators
- Remove manual action creators
- Use `createAsyncThunk` for async operations
- Use slice actions for synchronous operations

#### 4.6 Update Selectors
```javascript
// Before
const selectUser = (state) => state.auth.user;

// After (with createSelector)
import { createSelector } from '@reduxjs/toolkit';
const selectAuth = (state) => state.auth;
export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);
```

**Deliverable:** Modern Redux Toolkit setup with migrated state management

---

### Phase 5: React Router 6 Migration (High Risk)

**Goal:** Migrate from React Router 5 to 6

#### 5.1 Update Dependencies
```bash
npm install react-router-dom@^6
npm uninstall connected-react-router history
# history v5 is included in react-router v6
```

#### 5.2 Key Breaking Changes

**Switch → Routes:**
```javascript
// Before (v5)
import { Switch, Route } from 'react-router-dom';

<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
</Switch>

// After (v6)
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

**Component prop → element:**
- `<Route component={Home} />` → `<Route element={<Home />} />`
- Allows passing props directly

**Nested Routes:**
```javascript
// Before (v5) - manual nested routes
<Route path="/users/:id">
  <UserProfile>
    <Route path="/users/:id/posts" component={Posts} />
  </UserProfile>
</Route>

// After (v6) - relative routes
<Route path="/users/:id" element={<UserProfile />}>
  <Route path="posts" element={<Posts />} />
</Route>
```

**useHistory → useNavigate:**
```javascript
// Before (v5)
import { useHistory } from 'react-router-dom';
const history = useHistory();
history.push('/home');
history.replace('/home');

// After (v6)
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/home');
navigate('/home', { replace: true });
navigate(-1); // go back
```

**Redirect → Navigate:**
```javascript
// Before (v5)
<Redirect to="/home" />

// After (v6)
<Navigate to="/home" replace />
```

**useRouteMatch → useMatch:**
```javascript
// Before (v5)
const match = useRouteMatch();

// After (v6)
const match = useMatch('/users/:id');
```

**Route Props:**
- Remove `match`, `location`, `history` props
- Use hooks: `useParams()`, `useLocation()`, `useNavigate()`

#### 5.3 Update Route Definitions
- Create route configuration in `src/features/app/Routes.jsx`
- Convert all routes to new syntax
- Update protected routes/auth guards

#### 5.4 Remove connected-react-router
- No longer needed with v6
- Router state not in Redux (best practice)
- Use `useLocation()` hook if needed

**Deliverable:** React Router 6 working with all routes functional

---

### Phase 6: Code Modernization (Low-Medium Risk)

**Goal:** Update coding patterns to modern React standards

#### 6.1 Migrate Class Components to Functional Components
```javascript
// Before (Class)
class UserProfile extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const data = await api.getUser();
    this.setState({ loading: false, data });
  };

  render() {
    const { loading, data } = this.state;
    if (loading) return <Loader />;
    return <div>{data.name}</div>;
  }
}

// After (Functional)
function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await api.getUser();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;
  return <div>{data.name}</div>;
}
```

#### 6.2 Replace PropTypes with TypeScript (Optional)
- Install TypeScript
- Gradually migrate files to `.tsx`
- Add type safety across the codebase

#### 6.3 Update Date Handling
```bash
npm uninstall moment
npm install date-fns
# or
npm install dayjs
```

**Moment → date-fns:**
```javascript
// Before
import moment from 'moment';
const date = moment().format('YYYY-MM-DD');
const diff = moment(end).diff(moment(start), 'days');

// After
import { format, differenceInDays } from 'date-fns';
const date = format(new Date(), 'yyyy-MM-dd');
const diff = differenceInDays(end, start);
```

#### 6.4 Update Other Utilities
```bash
npm update query-string@^9
npm update jwt-decode@^4
```

#### 6.5 Replace react-redux-toastr with a React 18–compatible toast library

`react-redux-toastr` is not officially supported on React 18. Replace it with a maintained alternative before or during the React 18 upgrade (Phase 3).

**Options (React 18–compatible):**
- **react-hot-toast** – Lightweight, hook-based, no Redux required.
- **react-toastify** – Feature-rich, widely used, React 18 compatible.
- **notistack** – Material-UI–style stack of snackbars; works with or without MUI.

**Steps:**
1. Choose a library and install it (e.g. `npm install react-hot-toast` or `react-toastify`).
2. Remove the `ReduxToastr` component from the app root (e.g. `src/features/app/index.jsx`) and add the new provider/container as per the library’s docs.
3. Remove `toastr` reducer from `src/store/rootReducer.js` and any toastr state from the store.
4. Replace all `toastr.success()` / `toastr.error()` calls (in `src/features/auth/data/actions.js`, `src/features/meals/data/actions.js`, `src/features/menu/data/actions.js`, `src/features/orders/data/actions.js`) with the new API (e.g. `toast.success()`, `toast.error()`).
5. Remove `react-redux-toastr` and its styles: `npm uninstall react-redux-toastr`, and delete or replace `import 'react-redux-toastr/src/styles/index.scss'` and any custom `.toastr` overrides in `public/scss/style.scss`.
6. Update tests and fixtures that reference `toastr` in the store (e.g. `src/config/tests/fixtures.js`, `src/features/common/__mocks__/store.js`).

**Deliverable:** Modern React codebase with hooks and updated utilities; toast notifications using a React 18–supported library

---

### Phase 7: Cleanup & Optimization (Low Risk)

**Goal:** Remove deprecated code and optimize bundle

#### 7.1 Remove Unused Dependencies
```bash
npm uninstall react-hot-loader connected-react-router
npm uninstall enzyme enzyme-adapter-react-16 enzyme-to-json
npm uninstall redux-logger  # if using Redux DevTools instead
npm uninstall moment moment-locales-webpack-plugin
npm uninstall react-redux-toastr  # after replacing with a React 18–compatible toast lib in Phase 6.5
```

#### 7.2 Update Babel Configuration
Remove unnecessary plugins:
```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ],
  "plugins": [
    // Remove deprecated plugins
  ]
}
```

#### 7.3 Bundle Analysis
```bash
npm install --save-dev webpack-bundle-analyzer
# Add to webpack config and analyze
```

#### 7.4 Update Documentation
- Update README with new setup instructions
- Document new patterns and conventions
- Update contribution guide

**Deliverable:** Clean, optimized codebase ready for production

---

## Risk Mitigation

### Pre-Migration Checklist
- [ ] Full test coverage for critical paths
- [ ] Backup current codebase (Git tag/branch)
- [ ] Document current behavior
- [ ] Set up feature flags for gradual rollout (if needed)
- [ ] Prepare rollback plan

### During Migration
- [ ] Migrate in separate feature branch
- [ ] Run tests after each phase
- [ ] Manual testing of critical user flows
- [ ] Keep main branch deployable
- [ ] Incremental PRs for easier review

### Post-Migration
- [ ] Comprehensive regression testing
- [ ] Performance benchmarking
- [ ] Monitor error tracking (Sentry, etc.)
- [ ] Gradual rollout to users
- [ ] Keep old version available for quick rollback

---

## Testing Strategy

### Test Coverage Goals
- Maintain or improve current coverage
- All migrated components must have RTL tests
- Integration tests for critical flows
- E2E tests for main user journeys

### Testing Checklist per Phase
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual smoke testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check
- [ ] Performance metrics (bundle size, load time)

---

## Alternative Approaches

### Incremental vs. Big Bang

**Incremental (Recommended):**
- Lower risk
- Continuous deployment
- Easier to debug issues
- Takes longer

**Big Bang:**
- Faster completion
- Cleaner Git history
- Higher risk
- Requires feature freeze

### Modern Alternative Stack

Consider a complete rewrite with:
- **React 18** with TypeScript
- **TanStack Query** (React Query) instead of Redux for server state
- **Zustand** or **Jotai** for client state (simpler than Redux)
- **React Router 6**
- **Vite** instead of Webpack (faster builds)
- **Vitest** instead of Jest (faster, better DX)
- **Tailwind CSS** for styling

---

## Timeline Estimate

| Phase | Description | Estimated Time |
|-------|-------------|----------------|
| 1 | Foundation & Setup | 1-2 days |
| 2 | Testing Infrastructure | 1-2 weeks |
| 3 | React 18 Migration | 3-5 days |
| 4 | Redux Modernization | 2-3 weeks |
| 5 | React Router 6 Migration | 1-2 weeks |
| 6 | Code Modernization | 2-4 weeks |
| 7 | Cleanup & Optimization | 3-5 days |
| **Total** | | **2-3 months** |

*Timeline varies based on codebase size, test coverage, and team size*

---

## Dependencies Update Command Summary

```bash
# Phase 1: Foundation
npm install --save-dev eslint@^9
npm update webpack webpack-cli webpack-dev-server
npm update axios firebase@^11 validator

# Phase 2: Testing
npm uninstall enzyme enzyme-adapter-react-16 enzyme-to-json
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Phase 3: React 18
npm install react@^18 react-dom@^18

# Phase 4: Redux Toolkit
npm install @reduxjs/toolkit@^2 react-redux@^9

# Phase 5: React Router 6
npm install react-router-dom@^6
npm uninstall connected-react-router history

# Phase 6: Utilities
npm uninstall moment
npm install date-fns
npm update query-string@^9 jwt-decode@^4

# Phase 7: Cleanup
npm uninstall react-hot-loader redux-logger moment-locales-webpack-plugin
npm audit fix
npm dedupe
```

---

## Next Steps

1. **Review this plan** with the team
2. **Create feature branch** for migration work
3. **Set up tracking** (JIRA/GitHub Projects)
4. **Allocate resources** and timeline
5. **Begin Phase 1** with foundation updates

---

## Resources

### Official Migration Guides
- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [Redux Toolkit Migration](https://redux-toolkit.js.org/usage/migrating-to-modern-redux)
- [React Router v6 Migration](https://reactrouter.com/en/main/upgrading/v5)
- [Enzyme to RTL Migration](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme/)

### Community Resources
- [React 18 Working Group Discussions](https://github.com/reactwg/react-18/discussions)
- [Redux Toolkit Best Practices](https://redux-toolkit.js.org/usage/usage-guide)

---

**Document Version:** 1.0
**Last Updated:** 2026-01-07
**Author:** Claude Code Assistant
