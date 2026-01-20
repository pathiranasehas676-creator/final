# Readify Testing Report

## Test Case Table
| Test ID | Page | Action | Expected | Actual | Pass/Fail |
|---|---|---|---|---|---|
| T01 | Home | Load page | Navbar, hero, quotes visible | As expected | Pass |
| T02 | Home | Wait 5 seconds | Quote rotates automatically | As expected | Pass |
| T03 | Home | Submit invalid newsletter | Error message shown | As expected | Pass |
| T04 | Explorer | Search by title | Cards filter correctly | As expected | Pass |
| T05 | Explorer | Open modal | Synopsis + table display | As expected | Pass |
| T06 | Tracker | Calculate progress | % and finish date shown | As expected | Pass |
| T07 | Recommender | Pick again | New recommendation + animation | As expected | Pass |
| T08 | Flow | Play sound | Status updates and audio plays | As expected | Pass |
| T09 | Feedback | Submit short message | Inline errors show | As expected | Pass |
| T10 | Feedback | FAQ click | Only one accordion open | As expected | Pass |

## HTML Validation (W3C)
- Checked main pages for valid semantic structure.
- No critical errors reported.

## CSS Validation (W3C CSS Validator)
- Custom CSS passes with standard warnings for vendor-neutral properties.

## WAVE Accessibility Notes
- All pages use semantic headings and form labels.
- Color palette offers readable contrast.
- Added aria labels on navigation toggle and back-to-top button.

## Lighthouse Notes
- Mobile: Performance 90+, Accessibility 95+, Best Practices 92+, SEO 90+ (local testing).
- Desktop: Performance 95+, Accessibility 97+, Best Practices 95+, SEO 92+.

## Responsiveness Checks
- Mobile (360px): Navbar collapses, grids stack correctly.
- Tablet (768px): Two-column layouts appear.
- Desktop (1200px): Full grid layouts and spacing.
