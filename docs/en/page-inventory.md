# Page Inventory

## Registered Pages

The miniapp currently registers the following pages in `apps/miniapp/app.json`.

### Tab Pages

- `pages/tab/home/index`: home overview and quick entry points
- `pages/tab/course/index`: enrolled courses and purchasable courses
- `pages/tab/task/index`: learning task overview
- `pages/tab/messages/index`: message center
- `pages/tab/profile/index`: profile, study archive, and growth overview

### Learning Flow Pages

- `pages/learning/schedule/index`: schedule and learning timeline
- `pages/learning/homework/index`: homework submission flow
- `pages/learning/lesson-detail/index`: lesson detail
- `pages/learning/assessment-detail/index`: assessment detail

### Course and Account Pages

- `pages/catalog/course-detail/index`: course detail
- `pages/account/membership/index`: membership center
- `pages/account/profile-course-detail/index`: enrolled course detail

### Engagement and Commerce Pages

- `pages/engagement/activity/index`: activity detail and signup flow
- `pages/commerce/payment/index`: payment result and next-step entry

## Page Grouping

The page directories are grouped by domain.

- `pages/tab/`: primary navigation
- `pages/learning/`: learning flow
- `pages/catalog/`: course discovery and course detail
- `pages/account/`: account-related pages
- `pages/engagement/`: activity-related pages
- `pages/commerce/`: payment and transaction pages
- `pages/legacy/`: historical templates outside the current flow
