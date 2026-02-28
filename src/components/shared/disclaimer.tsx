import React from "react";
import { AlertTriangle } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-yellow-800 leading-relaxed">
        <span className="font-semibold">Disclaimer:</span> For informational purposes only, not financial advice.
        All property data, deal scores, and financial projections are estimates and should not be relied upon for
        investment decisions. Always conduct your own due diligence and consult with qualified real estate and
        financial professionals before making investment decisions. Past performance does not guarantee future results.
      </p>
    </div>
  );
}
