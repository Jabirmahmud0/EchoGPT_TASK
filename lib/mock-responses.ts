import { ModelId } from "./types";

export function generateMockAIResponse(prompt: string, _modelId: ModelId): string {
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
   EchoGPT's orchestration architecture decouples presentation from model inference. Our default engine (**EchoGPT**) routes queries dynamically across world-class models (**DeepSeek V4 Pro**, **Qwen 3.8 Plus**, **Kimi 3**, **Gemini 3.8 Flash**, **GPT-5.6**, **Opus 5.5**), each acting as a specialized reasoning node:
   * **EchoGPT (Default):** Dynamic multi-model router selecting the optimal engine for zero latency and cost.
   * **DeepSeek V4 Pro:** Extreme mathematical logic, theorem proving, and algorithmic synthesis.
   * **Qwen 3.8 Plus:** Advanced multilingual reasoning and agentic workflow orchestration.
   * **Kimi 3:** Unmatched 5M token context retrieval for massive full-codebase comprehension.
   * **Gemini 3.8 Flash:** Sub-30ms real-time multimodal processing and live web grounding.
   * **GPT-5.6:** Autonomous frontier reasoning, system architecture, and world simulation.
   * **Opus 5.5:** Anthropic's pinnacle deep thinking engine with exhaustive code verification.

3. **Recommendation:**
   Let **EchoGPT** auto-route your prompt, or switch to **Opus 5.5** / **GPT-5.6** for complex system architecture, while cross-checking against **DeepSeek V4 Pro** for mathematical precision.`;
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
