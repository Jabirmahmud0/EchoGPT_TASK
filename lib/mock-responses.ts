import { ModelId } from "./types";

interface MockResponseRule {
  keywords: string[];
  generate: (prompt: string, modelId: ModelId) => string;
}

export function generateMockAIResponse(prompt: string, modelId: ModelId): string {
  const lower = prompt.toLowerCase();

  if (lower.includes("code") || lower.includes("react") || lower.includes("typescript") || lower.includes("hook") || lower.includes("function") || lower.includes("fix")) {
    return `Here is a high-performance, strictly-typed implementation based on your prompt:

\`\`\`typescript
import { useState, useEffect, useCallback } from "react";

interface DataStream<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useStreamProcessor<T>(streamUrl: string): DataStream<T> {
  const [state, setState] = useState<DataStream<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const initializeConnection = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      // Establish simulated WebSocket or SSE streaming channel
      const response = await fetch(streamUrl);
      if (!response.ok) throw new Error(\`Network error: \${response.status}\`);
      
      const payload: T = await response.json();
      setState({ data: payload, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: err as Error });
    }
  }, [streamUrl]);

  useEffect(() => {
    initializeConnection();
  }, [initializeConnection]);

  return state;
}
\`\`\`

### Architectural Breakdown:
1. **Zero Layout Shifts:** State updates are atomic, preventing intermediate empty frames.
2. **Strict TypeScript Typing:** Leverages generics (\`<T>\`) to guarantee contract safety between upstream producers and UI consumers.
3. **Resilience:** Built-in error boundary integration with graceful degradation.

Let me know if you would like me to add retry exponential backoff or unit tests!`;
  }

  if (lower.includes("summarize") || lower.includes("summary") || lower.includes("takeaway") || lower.includes("bullet")) {
    return `### Executive Synthesis & Key Takeaways

Based on the provided context, here is the structured executive breakdown:

* **Core Value Proposition:** Unified multi-model accessibility eliminates context-switching friction between competing LLM web interfaces.
* **Browser Synergy:** The in-page extension drawer (\`Ctrl+Shift+E\`) provides zero-latency context extraction directly from active DOM viewports.
* **Cost Efficiency:** Combining shared prompt orchestration with model routing cuts operational token expenses by up to **42%**.

#### Action Items:
1. Prioritize client-side state caching for instant offline history retrieval.
2. Enforce sub-50ms interaction latencies on all keyboard shortcuts.`;
  }

  if (lower.includes("explain") || lower.includes("why") || lower.includes("how")) {
    return `### Comprehensive Explanation

When evaluating this problem through the lens of modern software engineering:

1. **The Fundamental Challenge:**
   Traditional architectures tightly couple consumer interfaces to single upstream providers. When provider rate limits or downtime occurs, the entire user session degrades.

2. **The Multi-Model Advantage:**
   EchoGPT's orchestration architecture decouples presentation from model inference. Each model (**GPT-4o**, **Claude 3.5 Sonnet**, **Gemini 1.5 Pro**) is treated as an interchangeable reasoning node with specialized competencies:
   * **Claude 3.5 Sonnet:** Unrivaled code synthesis and architectural nuance.
   * **GPT-4o:** Rapid multimodal throughput and general problem solving.
   * **Gemini 1.5 Pro:** Extreme 2M token context retrieval for massive documentation.

3. **Recommendation:**
   For critical development workflows, utilize **Claude 3.5 Sonnet** for system design and refactoring, while falling back to **GPT-4o** for rapid syntax checks and quick transformations.`;
  }

  // Default intelligent response
  return `Thank you for the prompt. Here is my analysis regarding:

> *"${prompt}"*

### Key Analysis:
* **Strategic Context:** In a modern engineering workflow, modularity and responsive feedback loops determine productivity.
* **Implementation Note:** Ensure all local storage states are validated with fallbacks to avoid corrupted state across browser sessions.
* **Next Steps:** You can refine this query, switch models using the top dropdown, or execute quick actions using the pills below.

Would you like to explore deeper benchmarks or test an alternative model's perspective?`;
}
