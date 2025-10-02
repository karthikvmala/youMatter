// User and Profile Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  experience: number;
  totalPoints: number;
  streak: number;
  joinDate: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  theme: 'light' | 'dark';
  language: string;
  healthGoals: HealthGoal[];
}

// Gamification Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: 'health' | 'wellness' | 'insurance' | 'social';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt?: string;
  category: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  category: 'health' | 'wellness' | 'insurance' | 'social';
  points: number;
  startDate: string;
  endDate: string;
  participants: number;
  isActive: boolean;
  progress: number;
  maxProgress: number;
  requirements: ChallengeRequirement[];
}

export interface ChallengeRequirement {
  id: string;
  description: string;
  target: number;
  current: number;
  unit: string;
}

// Health and Wellness Types
export interface HealthGoal {
  id: string;
  title: string;
  description: string;
  category: 'fitness' | 'nutrition' | 'mental' | 'sleep' | 'insurance';
  target: number;
  current: number;
  unit: string;
  deadline?: string;
  isActive: boolean;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'exercise' | 'nutrition' | 'mental' | 'insurance' | 'social' | 'wellness';
  points: number;
  duration?: number; // in minutes
  completedAt?: string;
  metadata?: Record<string, any>;
}

// Social Features
export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  isOnline: boolean;
  lastActive: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  points: number;
  level: number;
  badge?: Badge;
}

// Analytics and Metrics
export interface UserStats {
  totalActivities: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  achievementsUnlocked: number;
  challengesCompleted: number;
  weeklyProgress: WeeklyProgress[];
}

export interface WeeklyProgress {
  week: string;
  points: number;
  activities: number;
  streak: number;
}

// Insurance Integration
export interface InsuranceActivity {
  id: string;
  type: 'policy_review' | 'claim_submission' | 'premium_payment' | 'wellness_check';
  title: string;
  description: string;
  points: number;
  completedAt?: string;
  policyId?: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'achievement' | 'challenge' | 'friend' | 'reminder' | 'reward';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// App State Types
export interface AppState {
  user: User | null;
  achievements: Achievement[];
  badges: Badge[];
  challenges: Challenge[];
  activities: Activity[];
  friends: Friend[];
  leaderboard: LeaderboardEntry[];
  notifications: Notification[];
  stats: UserStats | null;
  isLoading: boolean;
  error: string | null;
}

// New: Rewards and Journeys
export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'micro' | 'milestone' | 'streak' | 'insurance' | 'social';
  grantedAt?: string;
  metadata?: Record<string, any>;
}

export interface JourneyStage {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

export interface Journey {
  id: string;
  title: string;
  category: 'health' | 'wellness' | 'insurance' | 'financial';
  description: string;
  stages: JourneyStage[];
  currentStageIndex: number;
}

// New: Personalization
export interface MotivationProfile {
  id: string;
  archetype: 'achiever' | 'socializer' | 'explorer' | 'habit_builder';
  preferredRewardType: Reward['type'];
  activityTimeOfDay: 'morning' | 'afternoon' | 'evening';
  streakSensitivity: 'low' | 'medium' | 'high';
}

export interface PersonalizedRecommendation {
  id: string;
  title: string;
  description: string;
  targetRoute: string;
  score: number; // 0-1
}

// New: Blockchain Rewards
export interface RewardToken {
  id: string;
  title: string;
  description: string;
  points: number;
  mintedAt: string;
  txHash?: string;
}
