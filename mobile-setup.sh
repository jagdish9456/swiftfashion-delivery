#!/bin/bash

# Build the web app
npm run build

# Initialize Android project if it doesn't exist
npx cap add android

# Copy web assets
npx cap copy

# Update native dependencies
npx cap sync

# Open Android Studio
npx cap open android