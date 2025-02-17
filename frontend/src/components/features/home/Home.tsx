import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../ui/Button';
import { AppLayout } from '../../layout/AppLayout';

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 gradient-text">
              Find Your Perfect Creative Match
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Connect with artists and beatmakers, share your vision, and create amazing music together.
              Our platform makes it easy to find the perfect collaborator for your next project.
            </p>

            {user ? (
              <div className="space-y-4">
                <Link to="/discover">
                  <Button variant="primary" size="lg">
                    Start Discovering
                  </Button>
                </Link>
                <p className="text-white/60">
                  Browse through profiles and find your next collaboration
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Link to="/login">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <p className="text-white/60">
                  Sign up now to join our community of creators
                </p>
              </div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Share Your Music</h3>
              <p className="text-white/60">Upload your tracks and let others discover your talent</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Connect & Chat</h3>
              <p className="text-white/60">Match with like-minded artists and start collaborating</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Create Together</h3>
              <p className="text-white/60">Collaborate on projects and bring your ideas to life</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}; 