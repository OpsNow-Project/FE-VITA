import React, { useEffect, useRef, useState } from "react";
import { ChatLayout } from "../components/chat/ChatLayout";
import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatMessages } from "../components/chat/ChatMessages";
import { ChatInput } from "../components/chat/ChatInput";
import { useChatLogic } from "../hooks/useChatLogic";
import { execCli } from "../api/chatPopup";
import axios from "axios";

function analysisToMainMessage(data: any): React.ReactNode {
  return (
    <div>
      {data.situation && (
        <>
          <b>상황</b>
          <br />
          {data.situation}
          <br />
          <br />
        </>
      )}
      {data.analysis && (
        <>
          <b>분석</b>
          <br />
          {data.analysis}
          <br />
          <br />
        </>
      )}
      {data.rootCause && (
        <>
          <b>원인</b>
          <br />
          {data.rootCause}
          <br />
          <br />
        </>
      )}
      {Array.isArray(data.recommendations) &&
        data.recommendations.length > 0 &&
        data.recommendations.map((rec: any, idx: number) => (
          <div key={idx}>
            <b>권장 조치</b>
            <br />
            {rec.description}
            <br />
            <br />
          </div>
        ))}
    </div>
  );
}

function analysisToCommandMessages(data: any): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const commandSet = new Set<string>();
  if (Array.isArray(data.recommendations)) {
    data.recommendations.forEach((rec: any) => {
      if (Array.isArray(rec.commands)) {
        rec.commands.forEach((cmd: string) => {
          if (!commandSet.has(cmd)) {
            commandSet.add(cmd);
            result.push(
              <pre
                key={cmd}
                style={{
                  background: "#f3f4f6",
                  borderRadius: 6,
                  padding: 8,
                  fontSize: 13,
                  margin: "8px 0",
                  whiteSpace: "pre-wrap",
                }}
              >
                {cmd}
              </pre>
            );
          }
        });
      }
    });
  }
  return result;
}

export const ChatPopup: React.FC<{ analysis?: any; onClose?: () => void }> = ({
  analysis,
  onClose,
}) => {
  const [input, setInput] = useState("");
  const { messages, addMessage, handleBotAction, initializeChat, setMessages } =
    useChatLogic() as any;
  const [hasAdded, setHasAdded] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  // 채팅창이 열릴 때마다 messages, hasAdded 초기화
  useEffect(() => {
    setMessages([]);
    setHasAdded(false);
  }, [analysis, setMessages]);

  // 분석 데이터가 없을 때만 기본 메시지 추가
  useEffect(() => {
    if (!analysis && !hasAdded) {
      initializeChat();
      setHasAdded(true);
    }
  }, [analysis, hasAdded, initializeChat]);

  // 분석 데이터가 있으면 메시지 1번만 추가 (중복 방지)
  useEffect(() => {
    // 예약된 타이머 해제
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (analysis && !hasAdded) {
      setHasAdded(true);
      addMessage("bot", analysisToMainMessage(analysis), true);
      const commandMsgs = analysisToCommandMessages(analysis);
      commandMsgs.forEach((msg, idx) => {
        const t = setTimeout(() => {
          addMessage("bot", msg, true);
        }, (idx + 1) * 350);
        timeoutsRef.current.push(t as any);
      });
      const t = setTimeout(() => {
        addMessage("bot", "실행할 명령어를 입력해주세요", true);
      }, (commandMsgs.length + 1) * 350);
      timeoutsRef.current.push(t as any);
    }
  }, [analysis, hasAdded, addMessage]);

  const handleSend = async () => {
    console.log("[handleSend] 버튼 클릭, input:", input);
    if (!input.trim()) return;
    addMessage("user", input);
    try {
      const res: any = await execCli(input);
      // 서버가 success 필드로 성공/실패를 명확히 구분
      if (res.success) {
        addMessage("bot", "실행이 완료되었습니다.");
        handleBotAction?.("메인 메뉴");
      } else {
        // success=false지만 status는 200
        addMessage("bot", `오류: ${res.error}`);
      }
    } catch (e: any) {
      // axios 에러인지 확인
      if (axios.isAxiosError(e) && e.response) {
        const { status, data } = e.response;

        switch (status) {
          case 400:
            // Bad Request
            addMessage(
              "bot",
              `${
                data.error || "요청 형식이 올바르지 않습니다."
              } 다시 시도해주세요.`
            );
            break;
          case 404:
            // Not Found
            addMessage(
              "bot",
              `요청한 리소스를 찾을 수 없습니다. 다시 시도해주세요.`
            );
            break;
          case 500:
            // Internal Server Error
            addMessage("bot", `지원되지 않는 명령어 입니다.`);
            break;
          default:
            addMessage(
              "bot",
              `HTTP ${status} 오류: ${data.error || e.message}`
            );
        }
      } else {
        // 네트워크 에러 등
        addMessage("bot", `네트워크 오류: ${e.message || e}`);
      }
    }
    setInput("");
  };

  return (
    <ChatLayout>
      <ChatHeader onClose={onClose} />
      <ChatMessages
        messages={messages}
        loading={false}
        onBotAction={handleBotAction}
      />
      <ChatInput value={input} onChange={setInput} onSend={handleSend} />
    </ChatLayout>
  );
};
