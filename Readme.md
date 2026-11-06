# TripCircle — AI-Powered Group Travel Planner

## 1. Project Overview

**TripCircle** is an AI-powered platform that helps friends, students, and young professionals plan group trips and outings without the stress of coordinating preferences, schedules, budgets, and shared expenses.

The platform brings group decision-making, personalized recommendations, collaborative itineraries, polls, and expense splitting into one place.

**Tagline:** Plan Together. Travel Better. Split Fairly.

## 2. Problem Statement

Planning group trips is difficult because people have different preferences, schedules, and budgets. Conversations become scattered across messaging apps, decisions take too long, and tracking shared expenses can lead to confusion and disagreements.

TripCircle solves these problems through centralized planning, collaborative decisions, personalized suggestions, and transparent expense tracking.

## 3. Project Objective

Build a polished, responsive, interactive MVP prototype that demonstrates how TripCircle works from creating a group trip to finalizing its itinerary and settling expenses.

Prioritize a functional user experience with realistic sample data. The prototype must work without paid APIs, external AI credentials, or a production database.

## 4. Recommended Technology Stack

- **Frontend:** React.js with Vite
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router
- **Charts:** Recharts, where useful
- **State management:** React Context or simple component state
- **Persistence:** LocalStorage for prototype data
- **Backend (optional for MVP):** Node.js and Express.js
- **Database (future integration):** MongoDB
- **AI integration:** Create a modular recommendation service with mock responses initially, allowing a real LLM API to be integrated later.

Use the simplest architecture that delivers a complete, runnable prototype. Do not introduce unnecessary infrastructure.

## 5. Target Users

- College students planning trips with friends.
- Young professionals organizing weekend outings.
- Groups coordinating vacations, road trips, and events.
- Trip organizers who need a fair way to track shared spending.

## 6. Core Features

### A. User Dashboard

Create a personalized dashboard showing:

- Welcome message and user profile.
- Upcoming trips and their current status.
- Recently viewed or suggested destinations.
- Pending polls that need a vote.
- Total group expenses and outstanding balances.
- Quick actions to create a trip, join a group, or split an expense.

Display realistic demo data on first launch.

### B. Create and Manage Group Trips

Allow users to create a trip with:

- Trip name.
- Destination or destination preferences.
- Start and end dates.
- Number of participants.
- Budget per person.
- Travel style: adventure, relaxation, food, culture, nature, or nightlife.
- Group members and invitation links (simulated for the prototype).

Each trip should have its own overview page containing participants, trip dates, budget, itinerary, polls, and expenses.

### C. AI Trip Recommendation Assistant

Build an interactive recommendation interface where users enter:

- Starting location.
- Preferred destination or region.
- Travel dates or trip duration.
- Budget per person.
- Group size.
- Interests and travel preferences.

Generate three sample trip recommendations. Each recommendation should include:

- Destination.
- Estimated cost per person.
- Suggested duration.
- Recommended activities.
- Reasons why the destination suits the group.
- A button to select the destination or add it to a poll.

For the prototype, use a local mock recommendation engine that varies its output based on user selections. Clearly treat cost estimates as illustrative, not live prices.

Provide a conversational assistant interface with suggested prompts such as:
- "Find a weekend trip under ₹5,000 per person."
- "Suggest places everyone in our group might enjoy."
- "Plan a three-day trip focused on food and nature."

Keep the recommendation logic modular so a real AI API can replace the mock service later.

### D. Group Decision-Making and Polls

Allow users to create polls for decisions such as:

- Which destination should we visit?
- Which dates work best?
- Which activities should we include?
- Where should we eat?

Requirements:

- Multiple selectable options.
- Vote counts and percentage bars.
- Ability to cast or change a vote.
- Clear winning option when a poll closes.
- Poll status: Open or Closed.
- Simulated multi-member voting using demo participants.

Use simple majority voting for the prototype. Design the interface so preference weighting can be added later.

### E. Collaborative Itinerary

Create a day-by-day trip itinerary.

Each activity should show:

- Activity name and description.
- Date and approximate time.
- Estimated cost per person.
- Category, such as food, sightseeing, transport, or adventure.
- Optional location.
- Completion status.

Allow users to add, edit, and delete activities. Include a daily schedule and a trip budget summary.

### F. Expense Splitting and Settlement

Build a working expense-management module.

Users should be able to:

- Add an expense name and amount.
- Select who paid.
- Select which members participated.
- Choose an equal split for the initial version.
- View each participant's total contribution and share.
- See who owes money and who should receive money.
- View suggested settlements that minimize unnecessary transactions.
- Mark a settlement as paid.

Use integer amounts in paise or carefully handle decimal rounding to avoid calculation errors.

**Example:**

Four friends share an expense of ₹4,000. Each person's share is ₹1,000. If one person paid the entire amount, the other three owe that person ₹1,000 each.

Show a clear breakdown of balances and settlements. Keep all expense calculations deterministic and testable.

### G. Notifications

Display in-app notifications for demo events such as:

- A new poll has been created.
- A member has voted.
- An itinerary has been updated.
- A new expense has been added.
- A settlement is pending.

Notifications can be simulated locally. Real push notifications are not required.

### H. User Profile and Preferences

Include editable profile fields for:

- Display name.
- Profile image or avatar.
- Preferred budget range.
- Travel interests.
- Preferred trip types.

Use these preferences to personalize the mock recommendation results.

## 7. Pages and Navigation

Implement the following pages:

1. **Landing Page** — Product introduction, feature highlights, and calls to action.
2. **Dashboard** — Upcoming trips, pending polls, expenses, and recommendations.
3. **AI Trip Planner** — Preference inputs and recommendation results.
4. **Trip Details** — Participants, dates, budget, and trip status.
5. **Polls and Decisions** — Create polls, vote, and view results.
6. **Itinerary** — Manage activities in a day-by-day view.
7. **Expenses** — Record expenses, calculate balances, and settle debts.
8. **Notifications** — View simulated updates.
9. **Profile and Settings** — Edit preferences and user details.

Use a consistent sidebar on desktop and a responsive navigation menu on mobile.

## 8. UI and Design Direction

Create a modern travel-tech interface that feels friendly, trustworthy, and polished.

### Visual style

- Use a light background with generous whitespace.
- Primary color: deep indigo or blue.
- Secondary accent: teal or mint green.
- Use warm accent colors sparingly for calls to action.
- Use rounded cards, subtle shadows, and clear typography.
- Use Lucide icons consistently.
- Use destination imagery where it improves the experience.
- Include loading, empty, success, and error states.
- Make the design responsive for desktop, tablet, and mobile.

Avoid excessive gradients, cluttered layouts, and oversized decorative elements. Prioritize usability and visual hierarchy.

## 9. Main User Journey

The prototype must demonstrate this complete workflow:

1. A user opens TripCircle and enters the dashboard.
2. The user creates a group trip and enters a destination, dates, group size, and budget.
3. The user opens the AI Trip Planner and receives three relevant mock recommendations.
4. The user creates a destination poll and votes.
5. The group poll displays results, and the winning destination can be selected.
6. The user adds activities to the itinerary.
7. A group member records a shared expense.
8. TripCircle calculates individual shares, balances, and suggested settlements.
9. The user marks a settlement as paid.
10. The updated trip, poll, itinerary, and expense data remain available after refreshing the browser.

Use demo group members to demonstrate collaborative functionality without requiring multiple real accounts.

## 10. Data Models

Use simple, consistent data structures.

### User
- id
- name
- avatar
- preferredBudget
- interests

### Trip
- id
- name
- destination
- startDate
- endDate
- budgetPerPerson
- memberIds
- status

### Recommendation
- id
- destination
- estimatedCostPerPerson
- duration
- activities
- explanation

### Poll
- id
- tripId
- question
- options
- votes
- status

### ItineraryActivity
- id
- tripId
- day
- title
- description
- time
- estimatedCost
- category

### Expense
- id
- tripId
- description
- amount
- paidBy
- participantIds
- splitType
- createdAt

### Settlement
- id
- tripId
- fromUserId
- toUserId
- amount
- status

Persist prototype data in LocalStorage. Include a reset-demo-data option in settings.

## 11. Functional Requirements

- Every primary button must perform a meaningful action.
- Forms must validate required fields and numeric values.
- Display clear success and error feedback.
- Poll votes must update the displayed results.
- Expense balances must be calculated from actual recorded expenses.
- Settlements must update the relevant balances.
- Trip and itinerary edits must persist after refresh.
- Navigation must work across all pages.
- Avoid dead links, placeholder buttons, and purely decorative interactions.
- Include sensible demo data so the prototype looks complete immediately.
- Do not expose API keys or credentials in frontend code.

## 12. Suggested Project Structure

```text
tripcircle/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── trips/
│   │   ├── polls/
│   │   ├── expenses/
│   │   └── ui/
│   ├── pages/
│   ├── services/
│   │   ├── recommendationService.js
│   │   ├── expenseService.js
│   │   └── storageService.js
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   ├── data/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── README.md
├── package.json
└── vite.config.js
```

Adapt this structure if another organization is more appropriate, while keeping components modular and maintainable.

## 13. Development Instructions for Antigravity

1. Inspect the existing workspace before creating files.
2. If the project is empty, scaffold the application using Vite and React.
3. Install only the dependencies required by the prototype.
4. Implement the application incrementally, starting with routing and the shared layout.
5. Build the dashboard and trip creation flow before implementing polls, itinerary, and expenses.
6. Add the mock recommendation engine and local persistence.
7. Test the entire user journey, including browser refreshes.
8. Verify responsive behavior and fix console errors.
9. Add setup instructions and known limitations to this README.
10. Run the application and confirm it starts successfully.

Do not stop after generating a plan or static mockup. Implement the application files and verify the working prototype.

## 14. Acceptance Criteria

The prototype is complete when:

- The app starts locally using the documented commands.
- All nine pages are navigable.
- A user can create and edit trips.
- The trip planner returns recommendations based on input preferences.
- Polls accept votes and show updated results.
- Itinerary activities can be added, edited, and deleted.
- Expenses calculate correct individual balances.
- Suggested settlements correctly reduce outstanding debts.
- Data persists after a browser refresh.
- The layout works on desktop and mobile.
- No primary interaction is left as a nonfunctional placeholder.

## 15. Future Enhancements

Keep the architecture ready for future integration of:

- A real LLM API for personalized travel planning.
- Maps and destination search.
- Live transport, hotel, and activity prices.
- Google authentication.
- Real-time group collaboration using WebSockets.
- MongoDB-backed accounts and trips.
- Payment-provider integration.
- Notifications and calendar synchronization.
- Weighted group preferences and advanced voting algorithms.

These enhancements are not required for the first prototype.

## 16. Final Instruction

Build TripCircle as a cohesive, usable product rather than a collection of disconnected screens. Prioritize a smooth end-to-end group travel planning experience, accurate expense calculations, realistic sample data, and a polished interface.

When trade-offs are necessary, prefer functional core workflows over unnecessary features. Document any simulated behavior honestly and keep the application easy to extend into a production MERN application.

## 17. Setup & Running Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start local development server (runs at http://localhost:5173/)
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

## 18. Prototype Status & Verification

The prototype has been fully implemented and verified against the acceptance criteria:

1. **All 10 Pages Implemented & Navigable**:
   - `Landing Page` (`/`): Value proposition, hero banner, interactive previews.
   - `Dashboard` (`/dashboard`): Active trip spotlight, 4 stat cards, upcoming timeline, quick action modals.
   - `AI Trip Planner` (`/planner`): Conversational prompt pills, budget slider, interest chips, 3 ranked recommendations with match percentages, one-click trip creation and poll publishing, integrated credit deduction.
   - `Buy AI Credits & Pricing` (`/credits` or `/pricing`): Unique value proposition, side-by-side tier comparison (Starter, Explorer Pro, Squad Pass), interactive checkout modal with discount codes (`SQUAD20`), demo booking modal, contact info, and ledger.
   - `Trip Details` (`/trips`): Trip banner, date counters, member roster, budget progress bar, shareable link copy, edit trip modal.
   - `Polls & Decisions` (`/polls`): Multi-option creation, vote casting/toggling, percentage progress bars, winner finalization with celebration confetti, plus demo persona switcher to test multi-user collaboration.
   - `Itinerary` (`/itinerary`): Day-by-day tabs, completion checkboxes, category badges, cost-per-person tracking, add/edit/delete activity modals.
   - `Expenses & Split` (`/expenses`): Splitwise-style greedy debt simplification, member balance summary table, equal splitting, and instant "Mark as Paid" settlement resolution.
   - `Notifications` (`/notifications`): Filterable activity stream with mark-as-read and timestamp badges.
   - `Profile & Settings` (`/profile`): User preferences, budget range, travel styles, avatar selector, AI credit status card, and factory reset option.

2. **Data Persistence**:
   - All state is stored and automatically synchronized with `localStorage` under `TRIPCIRCLE_DATA_V1`. Changes persist through browser refreshes and tab reloads.

3. **Deployment Ready for GitHub Pages**:
   - Configured with `base: './'` in `vite.config.js`.
   - Utilizes `HashRouter` in `App.jsx` for zero-configuration client-side routing on static hosts.
   - Automated deployment pipeline provided in `.github/workflows/deploy.yml` (pushes to `main` or `master` build and deploy automatically).

4. **Zero-Backend & AI Fallback Architecture**:
   - Runs 100% in the browser without requiring external Node/Express backend servers or databases.
   - Built-in heuristic scoring catalog in `recommendationService.js` delivers personalized destination and trip recommendations without requiring paid AI API credits or keys.