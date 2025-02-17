import { useEffect, useCallback } from 'react';

interface ShortcutHandlers {
  onNextProfile?: () => void;
  onPreviousProfile?: () => void;
  onLike?: () => void;
  onPass?: () => void;
  onSuperLike?: () => void;
  onToggleAudio?: () => void;
  onToggleDetails?: () => void;
  onVolumeUp?: () => void;
  onVolumeDown?: () => void;
  onLoopToggle?: () => void;
  onAddToPlaylist?: () => void;
  onUndo?: () => void;
}

export const useKeyboardShortcuts = (handlers: ShortcutHandlers) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Ignore if focus is in an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'j':
          handlers.onNextProfile?.();
          break;
        case 'k':
          handlers.onPreviousProfile?.();
          break;
        case 'l':
          handlers.onLike?.();
          break;
        case 'p':
          handlers.onPass?.();
          break;
        case 's':
          handlers.onSuperLike?.();
          break;
        case ' ':
          event.preventDefault();
          handlers.onToggleAudio?.();
          break;
        case 'd':
          handlers.onToggleDetails?.();
          break;
        case 'arrowup':
          event.preventDefault();
          handlers.onVolumeUp?.();
          break;
        case 'arrowdown':
          event.preventDefault();
          handlers.onVolumeDown?.();
          break;
        case 'r':
          handlers.onLoopToggle?.();
          break;
        case 'a':
          handlers.onAddToPlaylist?.();
          break;
        case 'z':
          if (event.metaKey || event.ctrlKey) {
            handlers.onUndo?.();
          }
          break;
      }
    },
    [handlers]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return null;
}; 