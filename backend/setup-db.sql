-- LostLink Database Setup Script
-- Run this in PostgreSQL to create the database

-- Create database
CREATE DATABASE lostlink;

-- Connect to database
\c lostlink;

-- Verify connection
SELECT current_database();

-- Database is ready for Prisma migrations
-- Run: npx prisma migrate dev
