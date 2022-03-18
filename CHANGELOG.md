# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.4](https://github.com/Clm-Roig/bujo-tracker/compare/v0.1.3...v0.1.4) (2022-03-18)


### Features

* **completions:** display completions ([b439cc0](https://github.com/Clm-Roig/bujo-tracker/commit/b439cc0db6f0414980eb983699093dd6eeff1af2))
* **createTracker:** add createTracker feature ([a8c0116](https://github.com/Clm-Roig/bujo-tracker/commit/a8c01162ce0071d9d27b889636e024051a62c0c3))
* **createTracker:** add objectives creation ([be174f3](https://github.com/Clm-Roig/bujo-tracker/commit/be174f39e5cdb8f596bd9db99525e150d82618b7))
* **emoji:** create Emoji component ([70090a6](https://github.com/Clm-Roig/bujo-tracker/commit/70090a6d4b0a28bc2969eebc238c6fa4673fa5df))
* **mockupIntegration:** integrate first mockup ([5cd796a](https://github.com/Clm-Roig/bujo-tracker/commit/5cd796a9c96fccf06a097f453e4fbcdcd979aff3))
* **models:** add Completion model and update Tracker with it ([5848602](https://github.com/Clm-Roig/bujo-tracker/commit/58486020fe3e0519c46c365b148455b2edf0da52))
* **persistInStorage:** add redux-persist and retrieve from localStorage ([c2a2c2e](https://github.com/Clm-Roig/bujo-tracker/commit/c2a2c2e43e4c3ba5d93f72f47703ca377f3f797f))
* **uuid:** add uuid to Tracker and TrackerEntry ([fdc9435](https://github.com/Clm-Roig/bujo-tracker/commit/fdc9435e72d87b1d810b40d3f1184c3c69a911be))


### Bug Fixes

* **drawer:** let drawer go on app + refactor constant ([25fd25a](https://github.com/Clm-Roig/bujo-tracker/commit/25fd25ae3578a6fb131455d6b16b155d8bd9af8b))
* **trackerCard:** choose appropriate verb according to date and status ([7891771](https://github.com/Clm-Roig/bujo-tracker/commit/7891771591029d9018ff46dc12392e68295e96ed))
* **trackerCardHeade:** remove typo ([6ec10a6](https://github.com/Clm-Roig/bujo-tracker/commit/6ec10a6665777b36dcec4a8529f6281472ac42f7))
* **trackerList:** fix no trackers detection ([ae23094](https://github.com/Clm-Roig/bujo-tracker/commit/ae2309469783333be274e0891dfc6c05a9b08423))
* **trackerSelector:** fix computation of remainingDays ([5a54f9c](https://github.com/Clm-Roig/bujo-tracker/commit/5a54f9cdd3ad4c3bdef1c01bd8d40d0b7f55eefc))
* **trackersPage:** fix typo in import ([27354a9](https://github.com/Clm-Roig/bujo-tracker/commit/27354a97680b04ee001185bc6911b62996505846))

### [0.1.3](https://github.com/Clm-Roig/bujo-tracker/compare/v0.1.2...v0.1.3) (2022-03-16)


### Features

* **formatDate:** custom wrapper to format all date to FR ([b1264ae](https://github.com/Clm-Roig/bujo-tracker/commit/b1264ae16d48a59ce10921850119dbdfa499ac0c))
* **trackerCard:** add TrackerCard and use it on TrackerList ([50de224](https://github.com/Clm-Roig/bujo-tracker/commit/50de224b30504168306546d28d4f105035f26b65))
* **trackerModel:** add dateHidden attribute ([283d02f](https://github.com/Clm-Roig/bujo-tracker/commit/283d02f94799a0c7b179fcfdf2ce931311f1c823))
* **trackerSelector:** add computed remainingDays ([d7c0c3a](https://github.com/Clm-Roig/bujo-tracker/commit/d7c0c3a840fcb91060b81ca02bec2835a1bbeea3))


### Bug Fixes

* **baseUrl:** fix base url for dev and add home redirection to trackers ([d51e8ce](https://github.com/Clm-Roig/bujo-tracker/commit/d51e8ce9c54f8e077429d904365ec88d6b166989))
* **mainContainer:** use Container instead of Paper ([f2994a4](https://github.com/Clm-Roig/bujo-tracker/commit/f2994a4cf9b57881a7dc8e55bd3252c4ca080d01))
* **trackerEntryModel:** switch from class to interface ([f3d0d01](https://github.com/Clm-Roig/bujo-tracker/commit/f3d0d0114a0dfbd08c02347ac0c65507408de050))
* **trackerStore:** remove selector in slice ([09a0bf4](https://github.com/Clm-Roig/bujo-tracker/commit/09a0bf46527f97aaedd9d1b964738c21e2c05574))
* **typographySize:** decrease h1 typo size ([b778f32](https://github.com/Clm-Roig/bujo-tracker/commit/b778f32c29f686b2dea51bf2cf824f9f13506c74))

### [0.1.2](https://github.com/Clm-Roig/bujo-tracker/compare/v0.1.1...v0.1.2) (2022-03-15)


### Features

* **drawer:** drawer push main content ([c7422b7](https://github.com/Clm-Roig/bujo-tracker/commit/c7422b777dceb8fddf086b396054e250f85b2f81))
* **globalTheme:** make font sizes responsive ([5feb916](https://github.com/Clm-Roig/bujo-tracker/commit/5feb916c7c4e324342681b7bc15771a5e1aa8f0e))
* **menu:** add lateral drawer menu ([dc25574](https://github.com/Clm-Roig/bujo-tracker/commit/dc2557428628f0ec4c7d60db1a2b13d36fe2e116))
* **models:** create Tracker, TrackerStatus & TrackerEntry models ([390b43d](https://github.com/Clm-Roig/bujo-tracker/commit/390b43d4f7bcc0fd6658ffa51e5118a5322f65e0))
* **router:** add react router dom ([2a1a371](https://github.com/Clm-Roig/bujo-tracker/commit/2a1a3712467c1dd061448480857e0fbb76d8c5ef))
* **router:** add router ([c565ba7](https://github.com/Clm-Roig/bujo-tracker/commit/c565ba77c7de8609270aad27711f4e6ed470f755))
* **slices:** create SliceStatus and use it in counterslice ([310327d](https://github.com/Clm-Roig/bujo-tracker/commit/310327d90688c34316187041e3ee6d4727175f9f))
* **themeAndLayout:** add theme and layout ([e5b4186](https://github.com/Clm-Roig/bujo-tracker/commit/e5b4186b74ee7eded2fecd3eee95f0fce6b68707))
* **trackers:** add trackers to the app ([a0c3b98](https://github.com/Clm-Roig/bujo-tracker/commit/a0c3b98acbd044464ef96a87e890e923bde4dfb9))


### Bug Fixes

* **appBranding:** change app lang and name ([e9fc0fc](https://github.com/Clm-Roig/bujo-tracker/commit/e9fc0fce8150d7c3289a2aaa99f8487e25afb3f7))
* **appTest:** remove app test ([c82e2ec](https://github.com/Clm-Roig/bujo-tracker/commit/c82e2ec863c7ec5af617507228bbfd7775685519))
* **counterImport:** fix Counter default import ([aeac83d](https://github.com/Clm-Roig/bujo-tracker/commit/aeac83d792b46efc222321de30de4bdfd3f24abe))
* **eslint:** fix serviceWorker eslint errors ([d414db2](https://github.com/Clm-Roig/bujo-tracker/commit/d414db27ea43fd108a43784f04df60daa882e367))
* **mainContent:** calc width depending on drawer open or not ([beb32f6](https://github.com/Clm-Roig/bujo-tracker/commit/beb32f6f2143b557249f6af6300ed7f7c1e48ea2))
* **model:** fix tracker model constructor ([5a377e6](https://github.com/Clm-Roig/bujo-tracker/commit/5a377e6cf4cdcba95c84b8dbf2e4eda738924979))
* **s:** qsu ([f254ab8](https://github.com/Clm-Roig/bujo-tracker/commit/f254ab8b6158256ed65a5e325c6af02de710c647))

### [0.1.1](https://github.com/Clm-Roig/bujo-tracker/compare/v0.1.0...v0.1.1) (2022-03-14)

## 0.1.0 (2022-03-14)
