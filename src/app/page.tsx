'use client';

import { useEffect, useState } from 'react';
import SpotlightLayout from '@/components/Navigation';

export default function Home() {
  return (
    <SpotlightLayout>
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-green-950">
          {' '}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-200 dark:bg-emerald-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-lime-200 dark:bg-lime-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      <footer className="bg-gray-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Rachem. Built with Next.js, TypeScript & Firebase
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </SpotlightLayout>
  );
}
