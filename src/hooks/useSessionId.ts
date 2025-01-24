import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useSessionId() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const existingSessionId = localStorage.getItem("temp_session_id");
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem("temp_session_id", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  return sessionId;
}
