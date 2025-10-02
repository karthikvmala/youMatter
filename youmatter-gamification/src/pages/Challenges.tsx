import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { joinChallenge, updateChallengeProgress } from '../store/slices/challengeSlice';
import { addExperience } from '../store/slices/userSlice';
import { Target, Users, Clock, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Challenges: React.FC = () => {
  const dispatch = useDispatch();
  const { challenges, activeChallenges } = useSelector((state: RootState) => state.challenges);

  const handleJoinChallenge = (challengeId: string) => {
    dispatch(joinChallenge(challengeId));
    dispatch(addExperience(25)); // Bonus points for joining
  };

  const handleCompleteRequirement = (challengeId: string, requirementId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      const requirement = challenge.requirements.find(r => r.id === requirementId);
      if (requirement && requirement.current < requirement.target) {
        // Update requirement progress
        const updatedRequirements = challenge.requirements.map(r => 
          r.id === requirementId 
            ? { ...r, current: Math.min(r.current + 1, r.target) }
            : r
        );
        
        // Calculate overall progress
        const totalProgress = updatedRequirements.reduce((sum, r) => sum + r.current, 0);
        const maxProgress = updatedRequirements.reduce((sum, r) => sum + r.target, 0);
        
        dispatch(updateChallengeProgress({ 
          id: challengeId, 
          progress: Math.floor((totalProgress / maxProgress) * challenge.maxProgress)
        }));
        
        dispatch(addExperience(10)); // Points for completing requirement
      }
    }
  };

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Clock className="w-4 h-4 text-green-500" />;
      case 'weekly': return <Target className="w-4 h-4 text-blue-500" />;
      case 'monthly': return <Award className="w-4 h-4 text-purple-500" />;
      default: return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Challenges</h1>
        <p className="text-gray-600">Join challenges and earn rewards</p>
        <div className="mt-4 flex justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{activeChallenges.length}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{challenges.length}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
        </div>
      </motion.div>

      {/* Challenge Cards */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  {getChallengeTypeIcon(challenge.type)}
                  <span className="text-sm font-medium text-gray-500 uppercase">
                    {challenge.type} Challenge
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">+{challenge.points}</div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Overall Progress</span>
                <span>{challenge.progress}/{challenge.maxProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-3">Requirements:</h4>
              <div className="space-y-2">
                {challenge.requirements.map((requirement) => (
                  <div key={requirement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {requirement.current >= requirement.target ? (
                        <CheckCircle className="w-5 h-5 text-success-500" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      )}
                      <span className="text-sm text-gray-700">{requirement.description}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {requirement.current}/{requirement.target} {requirement.unit}
                      </span>
                      {requirement.current < requirement.target && (
                        <button
                          onClick={() => handleCompleteRequirement(challenge.id, requirement.id)}
                          className="btn-primary text-xs py-1 px-2"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants} participants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              {!activeChallenges.includes(challenge.id) ? (
                <button
                  onClick={() => handleJoinChallenge(challenge.id)}
                  className="btn-primary"
                >
                  Join Challenge
                </button>
              ) : (
                <div className="flex items-center space-x-2 text-success-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Joined</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Challenges;
