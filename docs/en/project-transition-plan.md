# Demo To Production Transition

## Document Purpose

This document describes the main work required to gradually turn the current demo into a production project.

## Current Nature of the Demo

The current frontend structure is stable, but the business data is still demo-driven.

Current characteristics:
- page structure is already implemented
- flows can already be demonstrated
- data and state mainly come from local mock data and storage
- no real backend service is connected

## Transition Overview

### Phase 1: Stabilize Product Definition

Goals:
- define the real business scope
- define the MVP scope
- define user roles

Deliverables:
- product feature list
- page flow diagrams
- data entity list
- API list

### Phase 2: Build Core Backend Capabilities

Priority capabilities:
- user and identity
- course system
- lesson and assessment
- homework records
- notifications
- activity signup
- order and payment

### Phase 3: Connect Frontend to Real APIs

Required work:
- add real API calls in `services/`
- add error handling
- add loading states
- add empty and exception states
- keep limited mock data for development

### Phase 4: Build the Admin Console

Target modules:
- student management
- course management
- schedule management
- lesson content management
- assessment management
- homework and feedback management
- activity management
- notification management
- order management
- membership management
