-- Enable Row Level Security (RLS) for all tables
-- Run this in your Supabase SQL Editor

-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LostItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FoundItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MatchRequest" ENABLE ROW LEVEL SECURITY;

-- User table policies
-- Users can read their own data (excluding password)
CREATE POLICY "Users can view own profile" ON "User"
  FOR SELECT USING (auth.uid()::text = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile" ON "User"
  FOR UPDATE USING (auth.uid()::text = id);

-- Allow user registration
CREATE POLICY "Allow user registration" ON "User"
  FOR INSERT WITH CHECK (true);

-- LostItem policies
-- Anyone can view lost items
CREATE POLICY "Anyone can view lost items" ON "LostItem"
  FOR SELECT USING (true);

-- Users can create their own lost items
CREATE POLICY "Users can create lost items" ON "LostItem"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Users can update their own lost items
CREATE POLICY "Users can update own lost items" ON "LostItem"
  FOR UPDATE USING (auth.uid()::text = "userId");

-- Users can delete their own lost items
CREATE POLICY "Users can delete own lost items" ON "LostItem"
  FOR DELETE USING (auth.uid()::text = "userId");

-- FoundItem policies
-- Anyone can view found items
CREATE POLICY "Anyone can view found items" ON "FoundItem"
  FOR SELECT USING (true);

-- Users can create their own found items
CREATE POLICY "Users can create found items" ON "FoundItem"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Users can update their own found items
CREATE POLICY "Users can update own found items" ON "FoundItem"
  FOR UPDATE USING (auth.uid()::text = "userId");

-- Users can delete their own found items
CREATE POLICY "Users can delete own found items" ON "FoundItem"
  FOR DELETE USING (auth.uid()::text = "userId");

-- MatchRequest policies
-- Users can view match requests they created or that involve their items
CREATE POLICY "Users can view relevant match requests" ON "MatchRequest"
  FOR SELECT USING (
    auth.uid()::text = "requesterId" OR
    auth.uid()::text IN (
      SELECT "userId" FROM "LostItem" WHERE id = "lostItemId"
      UNION
      SELECT "userId" FROM "FoundItem" WHERE id = "foundItemId"
    )
  );

-- Users can create match requests
CREATE POLICY "Users can create match requests" ON "MatchRequest"
  FOR INSERT WITH CHECK (auth.uid()::text = "requesterId");

-- Users can update match requests for their items
CREATE POLICY "Users can update match requests for their items" ON "MatchRequest"
  FOR UPDATE USING (
    auth.uid()::text IN (
      SELECT "userId" FROM "LostItem" WHERE id = "lostItemId"
      UNION
      SELECT "userId" FROM "FoundItem" WHERE id = "foundItemId"
    )
  );

-- Users can delete their own match requests
CREATE POLICY "Users can delete own match requests" ON "MatchRequest"
  FOR DELETE USING (auth.uid()::text = "requesterId");
