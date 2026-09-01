import { Button, Card, Popover, message as AntMessage } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  BellRing,
  Eye,
  Info,
  Megaphone,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import {
  useGetMessageQuery,
  useSetMessageMutation,
} from "../../../store/service/userlistService";
import TextArea from "antd/es/input/TextArea";
import AppPageHeader from "../../common/AppPageHeader/AppPageHeader";

const RECENT_EMOJIS = [
  "😊",
  "🙏",
  "❤️",
  "🎉",
  "🌸",
  "✨",
  "🔥",
  "👍",
  "💯",
  "✅",
];

const EMOJI_GROUPS = [
  {
    label: "Recent",
    emojis: RECENT_EMOJIS,
  },
  {
    label: "Smileys",
    emojis: ["😀", "😄", "😁", "😇", "😍", "🥳", "😎", "🤝", "👏", "🙌"],
  },
  {
    label: "People",
    emojis: ["🙏", "👍", "👋", "👌", "💪", "🤲", "🫶", "👑", "💐", "🌟"],
  },
  {
    label: "Celebration",
    emojis: ["🎉", "🎊", "✨", "🌸", "🌺", "🔥", "💯", "🏆", "🎁", "✅"],
  },
  {
    label: "Symbols",
    emojis: ["❤️", "💜", "💚", "⭐", "🔔", "📢", "✅", "⚡", "💎", "🚀"],
  },
];

const SetMessage = () => {
  const nav = useNavigate();

  const { data, isLoading, refetch } = useGetMessageQuery();
  const [setMessageApi, { isLoading: isSaving }] = useSetMessageMutation();

  const [msg, setMsg] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState({ start: 0, end: 0 });
  const editorRef = useRef(null);

  useEffect(() => {
    if (data?.data) {
      setMsg(data.data);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await setMessageApi({ message: msg }).unwrap();
      refetch();
      AntMessage.success("Message updated successfully!");
    } catch (err) {
      AntMessage.error("Failed to update message.");
    }
  };

  const getTextarea = () =>
    editorRef.current?.resizableTextArea?.textArea || null;

  const rememberSelection = () => {
    const textarea = getTextarea();
    if (!textarea) return;
    setSelectionRange({
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
    });
  };

  const insertEmoji = (emoji) => {
    const textarea = getTextarea();
    const start =
      textarea?.selectionStart ?? selectionRange.start ?? msg.length;
    const end = textarea?.selectionEnd ?? selectionRange.end ?? start;
    const nextMessage = `${msg.slice(0, start)}${emoji}${msg.slice(end)}`;
    const nextCursor = start + emoji.length;

    setMsg(nextMessage);
    setSelectionRange({ start: nextCursor, end: nextCursor });

    requestAnimationFrame(() => {
      const activeTextarea = getTextarea();
      if (!activeTextarea) return;
      activeTextarea.focus();
      activeTextarea.setSelectionRange(nextCursor, nextCursor);
    });
  };

  const emojiPicker = (
    <div className="set-message-emoji-popover">
      {EMOJI_GROUPS.map((group) => (
        <section key={group.label}>
          <h4>{group.label}</h4>
          <div className="set-message-emoji-grid">
            {group.emojis.map((emoji) => (
              <button
                key={`${group.label}-${emoji}`}
                type="button"
                onClick={() => insertEmoji(emoji)}
                aria-label={`Insert ${emoji}`}>
                {emoji}
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );

  return (
    <div className="main_live_section list_supers admin-details-panel set-message-panel">
      <AppPageHeader
        icon={<Megaphone size={20} strokeWidth={1.8} />}
        title="Set Message"
        subtitle="Update the broadcast message shown to users"
        onBack={() => nav(-1)}
      />
      <div className="sport_detail set-message-card">
        <div className="set-message-layout">
          <section className="set-message-editor-panel">
            <div className="set-message-editor-shell">
              <TextArea
                ref={editorRef}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onSelect={rememberSelection}
                onClick={rememberSelection}
                onKeyUp={rememberSelection}
                placeholder="Enter Message.."
                disabled={isLoading}
                className="set-message-textarea"
              />
              <span className="set-message-counter">{msg.length} / 500</span>
            </div>

            <div
              className="set-message-emoji-toolbar"
              aria-label="Emoji toolbar">
              {RECENT_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  disabled={isLoading}
                  aria-label={`Insert ${emoji}`}>
                  {emoji}
                </button>
              ))}
              <Popover
                open={emojiPickerOpen}
                onOpenChange={setEmojiPickerOpen}
                trigger="click"
                placement="bottomLeft"
                content={emojiPicker}>
                <button
                  type="button"
                  className="set-message-emoji-more"
                  disabled={isLoading}
                  aria-label="Open emoji picker">
                  +
                </button>
              </Popover>
            </div>

            <div className="set-message-helper">
              <Info size={16} strokeWidth={2} />
              <span>
                Your message will be visible to all users immediately. Emojis
                are supported.
              </span>
            </div>

            <Button
              className="approved-primary-button set-message-submit"
              type="primary"
              onClick={handleSave}
              loading={isSaving}
              disabled={isLoading || isSaving}>
              <Send size={17} strokeWidth={2.1} />
              Set Message
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SetMessage;
