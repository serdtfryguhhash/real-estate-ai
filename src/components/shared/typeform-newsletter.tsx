"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";

const STEPS = [
  { id: 1, label: "Name", question: "What's your name?" },
  { id: 2, label: "Email", question: "Your email?" },
  { id: 3, label: "Goals", question: "Investment goals?" },
];

const GOAL_OPTIONS = [
  { value: "first-time", label: "First-time investor" },
  { value: "growing", label: "Growing portfolio" },
  { value: "full-time", label: "Full-time investor" },
];

export function TypeformNewsletter() {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const canAdvance = () => {
    if (currentStep === 1) return name.trim().length > 0;
    if (currentStep === 2) return email.trim().length > 0 && email.includes("@");
    if (currentStep === 3) return goal.length > 0;
    return false;
  };

  const handleNext = () => {
    if (!canAdvance()) return;
    if (currentStep < 3) {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection("back");
      setCurrentStep((s) => s - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  if (submitted) {
    return (
      <div className="relative bg-gradient-to-br from-primary-800 via-primary to-secondary rounded-2xl p-10 text-center overflow-hidden">
        {/* Confetti pieces */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece absolute w-2 h-2 rounded-full"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${Math.random() * 40}%`,
                backgroundColor: ["#10B981", "#F59E0B", "#3B82F6", "#EC4899", "#8B5CF6"][i % 5],
                animationDelay: `${Math.random() * 1}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-white font-display mb-2">
            Welcome aboard, {name}!
          </h3>
          <p className="text-white/70 max-w-md mx-auto">
            You have joined 500+ investors getting exclusive deal insights. Check
            your inbox for a welcome email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-800 via-primary to-secondary rounded-2xl p-8 md:p-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {STEPS.map((step) => (
            <div key={step.id} className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  step.id === currentStep
                    ? "bg-accent scale-125 ring-4 ring-accent/30"
                    : step.id < currentStep
                    ? "bg-accent/80"
                    : "bg-white/20"
                }`}
              />
              {step.id < STEPS.length && (
                <div
                  className={`w-12 h-0.5 transition-all duration-300 ${
                    step.id < currentStep ? "bg-accent/60" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-[180px] flex flex-col items-center justify-center">
          <div
            key={currentStep}
            className="w-full max-w-md mx-auto text-center"
            style={{
              animation:
                direction === "forward"
                  ? "slideInRight 0.35s ease-out"
                  : "slideInLeft 0.35s ease-out",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-accent text-sm font-medium">
                Step {currentStep} of {STEPS.length}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-6">
              {STEPS[currentStep - 1].question}
            </h3>

            {currentStep === 1 && (
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 text-lg text-center rounded-xl focus-visible:ring-accent/40 focus-visible:border-accent/50"
                autoFocus
              />
            )}

            {currentStep === 2 && (
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 text-lg text-center rounded-xl focus-visible:ring-accent/40 focus-visible:border-accent/50"
                autoFocus
              />
            )}

            {currentStep === 3 && (
              <div className="grid gap-3">
                {GOAL_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setGoal(option.value)}
                    className={`px-6 py-4 rounded-xl border text-left transition-all duration-200 ${
                      goal === option.value
                        ? "bg-accent/20 border-accent text-white"
                        : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10 hover:border-white/30"
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {currentStep > 1 && (
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!canAdvance()}
            variant="accent"
            size="lg"
            className="min-w-[200px] h-12 text-base rounded-xl disabled:opacity-40"
          >
            {currentStep === 3 ? (
              <>
                Join 500+ Investors
                <Check className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
