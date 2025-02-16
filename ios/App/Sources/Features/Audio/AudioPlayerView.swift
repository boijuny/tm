import SwiftUI
import AVFoundation

struct AudioPlayerView: View {
    let audioURL: String
    @StateObject private var viewModel = AudioPlayerViewModel()
    
    var body: some View {
        HStack {
            Button(action: {
                viewModel.isPlaying ? viewModel.pause() : viewModel.play()
            }) {
                Image(systemName: viewModel.isPlaying ? "pause.circle.fill" : "play.circle.fill")
                    .font(.title)
            }
            
            // Basic progress bar
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    Rectangle()
                        .fill(Color.gray.opacity(0.3))
                        .frame(height: 4)
                    
                    Rectangle()
                        .fill(Color.blue)
                        .frame(width: geometry.size.width * viewModel.progress, height: 4)
                }
            }
            .frame(height: 4)
            
            Text(viewModel.timeString)
                .font(.caption)
                .monospacedDigit()
        }
        .onAppear {
            viewModel.setupPlayer(with: audioURL)
        }
        .onDisappear {
            viewModel.cleanup()
        }
    }
}

class AudioPlayerViewModel: ObservableObject {
    @Published var isPlaying = false
    @Published var progress: Double = 0
    @Published var timeString: String = "0:00"
    
    private var player: AVPlayer?
    private var timeObserver: Any?
    
    func setupPlayer(with urlString: String) {
        guard let url = URL(string: urlString) else { return }
        player = AVPlayer(url: url)
        
        timeObserver = player?.addPeriodicTimeObserver(forInterval: CMTime(seconds: 0.1, preferredTimescale: 600), queue: .main) { [weak self] time in
            guard let self = self,
                  let duration = self.player?.currentItem?.duration.seconds,
                  !duration.isNaN else { return }
            
            self.progress = time.seconds / duration
            self.timeString = String(format: "%d:%02d", Int(time.seconds) / 60, Int(time.seconds) % 60)
        }
    }
    
    func play() {
        player?.play()
        isPlaying = true
    }
    
    func pause() {
        player?.pause()
        isPlaying = false
    }
    
    func cleanup() {
        if let observer = timeObserver {
            player?.removeTimeObserver(observer)
        }
        player = nil
        timeObserver = nil
    }
} 