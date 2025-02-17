declare namespace SC {
  interface Widget {
    play(): void;
    pause(): void;
    toggle(): void;
    seekTo(milliseconds: number): void;
    setVolume(volume: number): void;
    bind(eventName: string, listener: Function): void;
    unbind(eventName: string): void;
    load(url: string, options?: any): void;
  }

  function Widget(element: HTMLIFrameElement): Widget;
} 