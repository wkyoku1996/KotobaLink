# Current Demo Features

## Document Purpose

This document describes which features are already implemented in the current miniapp demo and the current completion scope of those features.

It focuses on the parts that are currently implemented and can be demonstrated.

## Current Feature Modules

### 1. Home Overview

Implemented:
- student basic information display
- current course and level display
- recent lesson summary
- growth radar chart
- quick entries to schedule, activity, and task
- demo state reset

### 2. Course Module

Implemented:
- enrolled course list
- purchasable course list
- enrolled course detail
- purchasable course detail
- state change after purchase
- navigation to payment result page

### 3. Schedule Module

Implemented:
- weekly schedule view
- weekly course summary
- lesson detail entry from a schedule item
- activity entry added after signup

### 4. Task and Homework Module

Implemented:
- daily vocabulary task
- vocabulary card modal
- learned-vocabulary marking
- task check-in after vocabulary completion
- homework page entry
- homework submission state change

### 5. Messages Module

Implemented:
- category filters
- unread and read state display
- message detail display
- auto-mark as read on open
- unread count update

### 6. Profile and Growth Module

Implemented:
- study archive summary
- growth metric cards
- score trend chart
- skill radar
- teacher summary and milestones
- membership center entry

### 7. Activity Module

Implemented:
- activity detail display
- signup and cancel
- notification content changes by signup state
- schedule content changes by signup state

### 8. Payment Result Module

Implemented:
- payment result display after purchase
- latest purchased course shown on the payment page
- schedule entry after payment completion

### 9. Lesson and Assessment Detail

Implemented:
- lesson detail display
- course material, vocabulary, and grammar display
- practice content for enrolled courses
- assessment detail display

## Core Local States Driving the Demo

- `purchasedCourseIds`
- `lastPurchasedCourseId`
- `homeworkSubmitted`
- `dailyTaskCompleted`
- `learnedVocabIds`
- `readNotificationIds`
- `activitySignedUp`
