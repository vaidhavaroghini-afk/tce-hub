import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import {
  ShieldCheck,
  ShieldAlert,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Server,
  RefreshCw,
  Info,
  Code
} from 'lucide-react';

interface SecurityTestRunnerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityTestRunner: React.FC<SecurityTestRunnerProps> = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runTests = async () => {
    try {
      setIsRunning(true);
      setError(null);
      const res = await api.runSecurityTests();
      setResults(res);
    } catch (err: any) {
      setError(err.message || 'Failed to execute security test suite');
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isOpen && !results) {
      runTests();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                TCE SIGConnect Multi-Tenant Security & Isolation Inspector
              </h3>
              <p className="text-xs text-slate-300">
                Live backend test runner verifying strict tenant scoping and zero data leakage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Summary Bento Grid */}
          {results?.summary && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Test Cases
                </span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  {results.summary.totalTests}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                  Passed Tests
                </span>
                <span className="text-2xl font-black text-emerald-800 flex items-center space-x-1 font-mono">
                  <span>{results.summary.passed}</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-xs">
                <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block">
                  Failed Tests
                </span>
                <span className="text-2xl font-black text-rose-800 font-mono">
                  {results.summary.failed}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
                <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                  Tenant Rating
                </span>
                <span className="text-sm font-bold text-amber-900 mt-1 block">
                  {results.summary.securityRating}
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Test Cases List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                <span>Backend Enforcement Checklist</span>
              </h4>
              <button
                onClick={runTests}
                disabled={isRunning}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Executing Tests...' : 'Re-run Tests'}</span>
              </button>
            </div>

            {isRunning ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <RefreshCw className="w-8 h-8 mx-auto text-indigo-600 animate-spin" />
                <p className="text-xs font-medium">Testing live tenant isolation barriers on Express server...</p>
              </div>
            ) : (
              results?.tests?.map((test: any) => {
                const isPassed = test.status === 'PASSED';
                return (
                  <div
                    key={test.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isPassed
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : 'border-rose-200 bg-rose-50/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          {isPassed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                              {test.id}
                            </span>
                            <h5 className="text-xs font-bold text-slate-900">{test.name}</h5>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.2 rounded-full font-bold ${
                                test.httpCode === 403 || test.httpCode === 400
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              }`}
                            >
                              HTTP {test.httpCode}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 font-medium">
                            <strong className="text-slate-800">Scenario:</strong> {test.scenario}
                          </p>
                          <div className="mt-2 text-[11px] rounded-xl bg-slate-900 text-slate-200 p-2.5 font-mono">
                            <span className="text-emerald-400"># Server Response:</span> {test.responseDetail}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1.5 flex items-center space-x-1">
                            <Info className="w-3 h-3 text-slate-400" />
                            <span>{test.details}</span>
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[11px] font-black px-2.5 py-1 rounded-lg tracking-wider shrink-0 ${
                          isPassed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        }`}
                      >
                        {test.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Architecture Isolation Note */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
            <h5 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <Server className="w-4 h-4 text-indigo-600" />
              <span>Multi-Tenant Architecture Guarantees</span>
            </h5>
            <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
              <li>All database operations are indexed and queried with strict <code className="text-indigo-700 font-mono bg-slate-200 px-1 rounded">WHERE sig_id = active_sig_id</code> filtering.</li>
              <li>Requests to <code className="text-indigo-700 font-mono bg-slate-200 px-1 rounded">/api/sigs/:sigId/*</code> verify that <code className="text-indigo-700 font-mono bg-slate-200 px-1 rounded">sigId ∈ user.memberships</code>.</li>
              <li>Notifications are dispatched and retrieved only for authenticated members of each respective SIG tenant.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
