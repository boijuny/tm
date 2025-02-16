import SwiftUI

struct DiscoverView: View {
    @StateObject private var viewModel = DiscoverViewModel()
    @State private var offset: CGSize = .zero
    @State private var currentIndex = 0
    
    var body: some View {
        NavigationView {
            ZStack {
                ForEach(viewModel.profiles.indices.reversed(), id: \.self) { index in
                    if index >= currentIndex && index <= currentIndex + 2 {
                        ProfileCard(profile: viewModel.profiles[index])
                            .offset(index == currentIndex ? offset : .zero)
                            .rotationEffect(index == currentIndex ? .degrees(Double(offset.width / 20)) : .zero)
                            .gesture(
                                DragGesture()
                                    .onChanged { gesture in
                                        if index == currentIndex {
                                            offset = gesture.translation
                                        }
                                    }
                                    .onEnded { _ in
                                        withAnimation {
                                            swipeCard(width: offset.width)
                                        }
                                    }
                            )
                    }
                }
            }
            .navigationTitle("Discover")
        }
    }
    
    private func swipeCard(width: CGFloat) {
        let swipeThreshold: CGFloat = 100
        
        if width > swipeThreshold {
            // Swipe right - Like
            offset = CGSize(width: 500, height: 0)
            viewModel.like(profile: viewModel.profiles[currentIndex])
            nextCard()
        } else if width < -swipeThreshold {
            // Swipe left - Pass
            offset = CGSize(width: -500, height: 0)
            nextCard()
        } else {
            // Reset position
            offset = .zero
        }
    }
    
    private func nextCard() {
        currentIndex = min(currentIndex + 1, viewModel.profiles.count - 1)
        offset = .zero
    }
}

struct ProfileCard: View {
    let profile: Profile
    
    var body: some View {
        ZStack(alignment: .bottom) {
            AsyncImage(url: URL(string: profile.imageURL)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray
            }
            
            VStack(alignment: .leading, spacing: 8) {
                Text(profile.name)
                    .font(.title)
                    .fontWeight(.bold)
                
                Text(profile.role)
                    .font(.subheadline)
                
                if let audioPreview = profile.audioPreviewURL {
                    AudioPlayerView(audioURL: audioPreview)
                        .frame(height: 50)
                }
            }
            .padding()
            .background(LinearGradient(colors: [.black.opacity(0), .black.opacity(0.8)], startPoint: .top, endPoint: .bottom))
            .foregroundColor(.white)
        }
        .frame(width: 300, height: 400)
        .cornerRadius(15)
        .shadow(radius: 5)
    }
} 